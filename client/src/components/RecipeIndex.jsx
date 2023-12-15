import { useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import textrecipe from '../images/text-recipes.png'
import renderStars from './Stars.jsx'

export default function Recipes() {
  const recipe = useLoaderData()

  //! State
  const [ filters, setFilters ] = useState({
    category: 'All',
    search: ''
  })

  const [ selectedRating, setSelectedRating ] = useState('All')

  const [ categories, setCategories ] = useState([])
  const [ filteredCategories, setFilteredCategories ] = useState([])

  //! Functions
  function handleChange(e){
    if (e.target.name === 'rating') {
      // console.log('Rating dropdown changed')
      setSelectedRating(e.target.value)
    } else {
      const newObj = {
        ...filters,
        [e.target.name]: e.target.value
      }
      // console.log('Other dropdown or input changed:', newObj)
      setFilters(newObj)
    }  
  }

  //! Effects
  useEffect(() => {

    const pattern = new RegExp(filters.search, 'i')
    const filteredArray = recipe.filter(rec => {
      // console.log('avg', typeof rec.avgRating, rec.avgRating)
      // console.log('sl', typeof selectedRating, selectedRating)
      return pattern.test(rec.title) && (rec.category === filters.category || filters.category === 'All') &&
      (selectedRating === 'All' || Math.round(parseFloat(rec.avgRating)) === Math.round(parseFloat(selectedRating)))
    })
    console.log('Filtered Array:', filteredArray)
    setFilteredCategories(filteredArray)

    if (recipe.length > 0 && categories.length === 0) {
      const categoriesArr = [...new Set(recipe.map(rec => rec.category))].filter(Boolean)
      setCategories(categoriesArr)
    }
  }, [filters, selectedRating])


    return (
      <>
        <img src={textrecipe} className="textrecipe"></img>
        <div className='search-container'>
          <div className="custom-select">
            <select id="dropdown" name="category" value={filters.category} onChange={handleChange}>
              <option value="All" default>Continents</option>
              { categories.length > 0 &&
                categories.map((category, index)=> {
                  return <option key={index} value={category}>{category}</option>
                })
              }
            </select>
          </div>
          <div className="custom-select">
            <select id="rating-dropdown" name="rating" value={selectedRating} onChange={handleChange}>
              <option value="All" default>Ratings</option>
              <option value={1}>⭐️</option>
              <option value={2}>⭐️⭐️</option>
              <option value={3}>⭐️⭐️⭐️</option>
              <option value={4}>⭐️⭐️⭐️⭐️</option>
              <option value={5}>⭐️⭐️⭐️⭐️⭐️</option>
            </select>
          </div>
          <div className="custom-select">
          <input id="search" name="search" placeholder='Search...' value={filters.search} onChange={handleChange} />
          </div>
        </div>
        <div className="recipe-cards">
        {filteredCategories.sort((a, b) => a.title < b.title ? -1 : 1).map(rec => {
          const { id, title, poster, prepTime, avgRating } = rec
          return (
              <Link key={id} to={`/recipes/${id}`} className="card-layout">
                <div className="card" style={{width: '20rem'}}>
                  <img className="card-img-top" src={poster} alt={title} style={{height: '150px', objectFit: 'cover'}}/>
                  <div className="card-body">
                    <h5 className="text-center bold card-title">{title}</h5>
                    <div className="stars">{renderStars(avgRating)}</div>
                    <p className="text-center card-text">Total Time: {prepTime}</p>
                  </div>
                </div> 
              </Link>
          )
        })}
        </div> 
      </>
    )
  }

