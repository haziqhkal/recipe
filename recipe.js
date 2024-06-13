document.addEventListener('DOMContentLoaded', function() {
    // Automatically fetch recipes when the page loads
    getAllRecipes('chicken'); // You can set a default query or fetch popular recipes
});

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value;
    getAllRecipes(query);
});

async function getAllRecipes(query) {
    const appId = '4994f904'; // Replace with your Edamam App ID
    const appKey = '17828a480e4c7f1f17dc9c1bd935c390'; // Replace with your Edamam App Key
    const batchSize = 100;
    let allRecipes = [];
    let from = 0;
    let to = batchSize;
    let moreResults = true;

    while (moreResults) {
        const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.hits.length > 0) {
                allRecipes = allRecipes.concat(data.hits);
                from += batchSize;
                to += batchSize;
                if (data.hits.length < batchSize) {
                    moreResults = false;
                }
            } else {
                moreResults = false;
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            moreResults = false;
        }
    }

    displayRecipes(allRecipes);
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(hit => {
        const recipe = hit.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        const recipeContent = `
            <h3>${recipe.label}</h3>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;

        recipeElement.innerHTML = recipeContent;
        recipesContainer.appendChild(recipeElement);
    });
}
