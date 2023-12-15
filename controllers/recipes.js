import Recipe from '../models/recipe.js'
import User from '../models/user.js'



// Index
// Method: Get
// Path: /recipes
export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find()
  return res.json(recipes)
}

// Create
// Method: Post
// Path: /recipes
export const createRecipe = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    const recipeToCreate = await Recipe.create(req.body)
    return res.status(201).json(recipeToCreate)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error) 
  }
}

// Show
// Method: Get
// Path: /recipes/:recipeId
// Assuming you have a controller function for fetching a single recipe
export const getSingleRecipe = async (req, res) => {
  const { recipeId } = req.params

  try {
    const recipe = await Recipe.findById(recipeId)
      .populate('reviews.owner', 'username') // Ensure reviews.owner is populated with the username

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.status(200).json(recipe)
  } catch (error) {
    console.error('Error fetching recipe:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


// Update
// Method: Put
// Path: /recipes/:recipeId

export const updateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params
    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    console.log('recipe->', recipe.ingredients[0].split(','))
    console.log('User making request ->', req.currentUser._id)
    console.log('User that owns recipe ->', recipe.owner)
    console.log('Does user match owner?', recipe.owner.equals(req.currentUser._id))

    if (!recipe.owner.equals(req.currentUser._id)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Update only the fields present in req.body
    Object.keys(req.body).forEach(key => {
      if (key !== 'poster') {
        recipe[key] = req.body[key]
      }
    })

    // If 'poster' is present and not an empty string, update it
    if (req.body.poster !== undefined && req.body.poster !== '') {
      recipe.poster = req.body.poster
    }

    recipe.ingredients = recipe.ingredients[0].split(',')

    await recipe.save()

    return res.json(recipe)
  } catch (error) {
    console.error(error)
    return res.status(400).json(error)
  }
}


// Delete
// Method: Delete
// recipes/:recipeID

export const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params
    const recipe = await Recipe.findByIdAndDelete({ _id: recipeId, owner: req.currentUser._id })
    if (!recipe) {
      return res.status(400).json({ message: 'Recipe not found' })
    }
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}


// ! Review Controllers

// * Create
// Method: Post
// Path: /recipes/:/recipeId/reviews

export const createReview = async (req, res) => {
  try {
    const { recipeId } = req.params
    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    // Get user details including username
    const userWithUsername = await User.findById(req.currentUser._id).select('username')

    // Include username in the review owner object
    const review = {
      text: req.body.text,
      rating: req.body.rating,
      owner: req.currentUser._id,
    }

    // Ensure the userWithUsername is not null before including the username
    if (userWithUsername) {
      review.owner.username = userWithUsername.username
    }

    recipe.reviews.push(review)

    //Recalculate avgRating
    recipe.avgRating = (
      recipe.reviews.reduce((acc, review) => acc + review.rating, 0) / recipe.reviews.length
    ).toFixed(2)

    await recipe.save()

    // Now, recipe.reviews will contain both _id and username in the owner object

    return res.status(201).json(recipe)
  } catch (error) {
    console.error(error)
    return res.status(400).json(error)
  }
}


// * Delete Review
// Method: Delete
// Path: /recipes/:recipeId/reviews/:reviewId

export const deleteReview = async (req, res) => {
  try {
    const { recipeId, reviewId } = req.params
    const recipe = await Recipe.findById(recipeId)

    if (!recipe) return res.status(400).json({ message: 'Recipe not found' })

    const reviewToDelete = recipe.reviews.id(reviewId)
    
    if (!reviewToDelete) return res.status(404).json({ message: 'Review not found' })

    if (!reviewToDelete.owner.equals(req.currentUser._id)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    reviewToDelete.deleteOne()

    // Recalculate avgRating
    recipe.avgRating = (
      recipe.reviews.reduce((acc, review) => acc + review.rating, 0) / recipe.reviews.length
    ).toFixed(2)

    await recipe.save()

    return res.sendStatus(204)

  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}