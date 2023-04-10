
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';


export const Home = () => {

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const [Cookies, _] = useCookies(['access_token']);


  const userID = useGetUserID();

  useEffect(() => {

    const fetchRecipe = async () => {
      try {

        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        // console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    };


    const fetchSavedRecipe = async () => {
      try {

        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes);

      } catch (err) {
        console.log(err)
      }
    }

    fetchRecipe();

    if (Cookies.access_token) {

      fetchSavedRecipe();
    }

  }, [userID]);


  const saveRecipe = async (recipeID) => {

    try {

      const response = await axios.put("http://localhost:3001/recipes", { recipeID, userID }, { headers: { authorization: Cookies.access_token } });

      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err)
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);


  return (
    <div>
      <h2>
        Recipes
      </h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {savedRecipes.includes(recipe._id) && <h1>Saved</h1>}
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}
              </button>
            </div>
            <div className='instructions'>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (mins)</p>
          </li>
        ))}
      </ul>
    </div>
  )
};
