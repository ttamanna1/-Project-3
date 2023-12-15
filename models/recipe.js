import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String },
  prepTime: { type: Number, required: true },
  ingredients: [String],
  poster: String,
  method: { type: String, required: true },
  reviews: [reviewSchema],
  owner: { type: mongoose.ObjectId, ref: 'User', required: true },
})

recipeSchema
  .virtual('avgRating')
  .get(function () {
    if (!this.reviews.length) return 0
    return (
      (this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length).toFixed(2)
    )
  })

recipeSchema
  .set('toJSON', {
    virtuals: true,
  })

// Populate the reviews with the corresponding user information
recipeSchema.pre('find', function (next) {
  this.populate('reviews.owner', 'username') // Assuming 'User' model has a 'username' field
  next()
})

export default mongoose.model('Recipe', recipeSchema)
