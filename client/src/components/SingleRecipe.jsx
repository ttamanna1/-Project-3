

import { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getToken } from '../utilities/helpers/common';
import axios from 'axios';

// Helpers
import { activeUser } from '../utilities/helpers/common';

export default function SingleRecipe() {
  const [recipe, setRecipe] = useState(useLoaderData());
  const [formData, setFormData] = useState({ rating: 5, text: '' });
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Set the logged-in user when the component mounts
    const user = activeUser();
    setLoggedInUser(user);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/recipes/${recipe._id}/reviews`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log('Review created:', response.data)
      setFormData({ rating: 5, text: '' })
      // Fetch updated recipe data after creating the review
      const updatedRecipe = await axios.get(`/api/recipes/${recipe._id}`)
      // Update the component state with the latest recipe data
      updatedRecipe && setRecipe(updatedRecipe.data)
      console.log('Updated Recipe:', updatedRecipe.data)
    } catch (error) {
      console.error('Error creating review:', error)
    }
  }



  const handleDeleteReview = async (reviewId) => {
    console.log('Deleting review with IDs:', recipe._id, reviewId);
    try {
      console.log('Attempting to delete review:', reviewId);
  
      const response = await axios.delete(`/api/recipes/${recipe._id}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
  
      console.log('Review deleted:', response.data)
  
      // Fetch updated recipe data after deleting the review
      const updatedRecipe = await axios.get(`/api/recipes/${recipe._id}`)
      // Update the component state with the latest recipe data
      setRecipe(updatedRecipe.data)
      console.log('Updated Recipe:', updatedRecipe.data)
    } catch (error) {
      console.error('Error deleting review:', error)
  
      // Log the specific response received
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
    }
  };
  

  return (
    <>
      <div>
        <h2>{recipe.title}</h2>
      </div>
      <div className='img-ing'>
        <img className="single-img" src={recipe.poster} alt={`Image of ${recipe.title}`} />
        <div className="ing-div">
          <h3 className='single-recipe-title'>Ingredients</h3>
          <ul className='ingredient-list'>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className='single-recipe-title'>Continent</h3>
        <p className='continent'>{recipe.category}</p>
        <h3 className='single-recipe-title'>Total Time</h3>
        <p className='prep'>{recipe.prepTime} mins</p>
        <h3 className='single-recipe-title'>Description</h3>
        <p className='description'>{recipe.description}</p>
        {/* <p>{recipe.ingredients}</p> */}
        <h3 className='single-recipe-title'>Method</h3>
        <p className='method'>{recipe.method}</p>
        

        <div className='review-section'>
          <h3 className='review-title'>Reviews</h3>
            {recipe.reviews && recipe.reviews.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recipe.reviews.map((review, index) => (
                  <li className= 'review-text' key={index}>
                    <div>
                      <p className='star-rating'>
                        {Array(review.rating).fill().map((_, starIndex) => (
                          <span key={starIndex}>★</span>
                        ))}
                        {review.owner && review.owner.username ? `${'\u00a0'} Rated by ${review.owner.username}` : 'Unknown User'}
                      </p>
                      {review.text && <p className='comment'>{`${review.text}`}</p>}
                    </div>
                    <div className='delete-btn-container'>
                      {loggedInUser && review.owner && loggedInUser === review.owner.id && (
                      <button className="delete-btn" onClick={() => handleDeleteReview(review._id)}>
                      Delete Review
                      </button>
                      )}
                    </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}

        <form className='review-form-container' onSubmit={handleSubmitReview}>
          <div className='spacer'></div>
          <div className='spacer'></div>
          <div className='spacer'></div>
          <div className='spacer'></div>
          <label className='label-text'>
            Rating:{'\u00a0'}
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="1"
              max="5"
            />
          </label>
          <label className='label-text'>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder='Add review here'
            />
          </label>
          <button className='review-btn' type="submit">Submit Review</button>
          <div className='spacer'></div>
          <div className='spacer'></div>
          <div className='spacer'></div>
          <div className='spacer'></div>
        </form>
      </div>
      </div>
    </>
  )
}