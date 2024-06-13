const activityData = {
    Comfort_Food: {
        locations: [
            { name: "McDonalds", lat: 5.3982068114414945, lng: 103.0850320549923 },
            { name: "Homs Bar Cafe", lat: 5.3975248394207584, lng: 103.08458941103177 },
            { name: "Texas Chicken", lat: 5.364980446220264, lng: 103.08939242054491 }
        ],
        recommendation: "Recommended restaurants for comfort food.",
        recipes: [
            "Potato Salad",
            "Potato Bhorta",
            "Insanity Burger",
            "Meatball Lasagna",
            "Creamy Shrimp Fra Diavolo",
            "Comfort-Food Hors d'Oeuvres",
            "Congee",
            "Chicken Paprikash",
            "Gnocchi Chicken & Dumplings"
          ]

    },
    Soup: {
        locations: [
            { name: "laksa Sarang", lat: 5.404637449164825, lng: 103.09839933080661 },
            { name: "Mee Sup Bawah Pokok", lat: 5.334599792684075, lng: 103.09091305280586 },
            { name: "E-rup Sup", lat: 5.774483369379622, lng: 102.41906019153878 }
        ],
        recommendation: "Recommended restaurants for soup.",
        recipes: [
            "Miso Soup Potato Chips",
            "Carrot-Tomato Soup",
            "Fluffy Drop Dumplings for Soup",
            "Tortilla Soup",
            "Chicken Casserole with Campbell's Canned Soup",
            "Cleansing Ginger-Chicken Soup",
            "Bean Soup",
            "Miso-Soup-Flavored Popcorn Recipe",
            "Hamburger Soup",
            "Matzo Ball Soup for Passover"
        ]
    },
    light_meal: {
        locations: [
            { name: "ChocaCake", lat: 5.4049666516662285, lng: 103.09805544119607 },
            { name: "Cengkih Cafe", lat: 5.329558943496999, lng: 103.13662397614732 },
            { name: "Sweden Cake and Bread Cafe", lat: 5.32901534156278, lng: 103.13452233067386 }
        ],
        recommendation: "Recommended restaurants for light meal",
        recipes: [
            "Matzo Meal Latkes",
            "Hazelnut & Olive Oil Shortbread",
            "Hazelnut Pancakes with Raspberry Sauce",
            "Thai Larb Rice Bowls",
            "Light Yakisoba Noodles",
            "Upside-Down Fruit Cake",
            "Chewy Gluten-Free Macaroons",
            "Carob Banana Soft Serve Vegan Overnight Oats",
            "Light and Creamy Custard",
            "Gluten-Free Peach Crisp"
          ]
    },
    Summer: {
        locations: [
            { name: "Tealive", lat: 5.332543214171571, lng: 103.13757429592027 },
            { name: "Bencoolen Cafe", lat: 5.330411957783416, lng: 103.13701747326725 },
            { name: "Mykori", lat: 5.328643896085357, lng: 103.1366968283639 }
        ],
        recommendation: "Recommended restaurants for summer"
    },
    Winter: {
        locations: [
            { name: "Syrup VS Soda", lat: 5.3285680723028355, lng: 103.13628689403977 },
            { name: "Nasi Dagang Atas Tol", lat: 5.3304595261236996, lng: 103.13588053529944 },
            { name: "Seoul Garden", lat: 5.331059458581866, lng: 103.13650518425163 }
        ],
        recommendation: "Recommended restaurants for winter"
    },
    Cozy: {
        locations: [
            { name: "Sushi king", lat: 5.330770803342482, lng: 103.13659648045974 },
            { name: "Midtown Cafe", lat: 5.334022690320717, lng: 103.13894034841823 },
            { name: "Coffee Lab Cafe", lat: 5.3363359464303, lng: 103.13622196934207 }
        ],
        recommendation: "Recommended restaurants for light cozy",
        recipes: [
            "Cozy Cassoulet",
            "Cozy Wonton Soup",
            "A Cozy Fire and Peppermint Marshmallows",
            "Cozy Turkey Stew",
            "Cozy Cocoa Rice Pudding",
            "Cozy Quinoa Casserole",
            "Cozy Banana Bread Pancakes",
            "Cozy Chicken and Dumplings",
            "Cozy Millet Bowl with Mushroom Gravy and Kale recipes",
            "This Chai Hot Toddy"
        ]
    },
    rainy_day: {
        locations: [
            { name: "Payung Cafe", lat: 5.331991569434853, lng: 103.13827000805433 },
            { name: "MD Curry House", lat: 5.335352140060666, lng: 103.1386911161311 },
            { name: "Willy Satay Kajang", lat: 5.335748398557004, lng: 103.1450840021501 }
        ],
        recommendation: "Recommended restaurants for rainy day",
        recipes: [
            "Rainy Day Ginger Bourbon Tea",
            "Red Lentil Dahl",
            "Rainy Day Chicken with Eggplant Salad",
            "Rainy-Day Tomato Soup",
            "Rainy Day Potato Shakshuka",
            "Rainy Day Chicken and Rice Soup",
            "Frozen Peanut Butter, Chocolate, and Banana Loaf",
            "Smoky Aubergine & Pepper Tagine",
            "Butternut Squash and Green Beans in a Coconut-Milk Curry",
            "Homemade Egg Noodles"
          ]
    }
};

function displayActivity() {
    const activitySelect = document.getElementById('activitySelect').value;
    const locationList = document.getElementById('locationList');
    const locationMessage = document.getElementById('locationMessage');
    const recipesContainer = document.getElementById('recipes');

    if (activitySelect && activityData[activitySelect]) {
        const { locations, recommendation, recipes } = activityData[activitySelect];
        locationMessage.textContent = recommendation;
        locationList.innerHTML = locations.map(location => `<p class="location-item" onclick="searchLocation(${location.lat}, ${location.lng})">${location.name}</p>`).join('');

        // Clear existing recipes
        recipesContainer.innerHTML = '';

        // Display recipes for Soup activity
        if (activitySelect === 'Soup') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }
        if (activitySelect === 'Comfort_Food') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }
        if (activitySelect === 'light_meal') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }
        if (activitySelect === 'rainy_day') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }
        if (activitySelect === 'Winter') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }
        if (activitySelect === 'Summer') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }
        if (activitySelect === 'Cozy') {
            recipes.forEach(recipe => {
                const recipeElement = document.createElement('div');
                recipeElement.classList.add('recipe');
                recipeElement.innerHTML = `<h3>${recipe}</h3>`;
                recipesContainer.appendChild(recipeElement);
            });
        }

        

    } else {
        locationMessage.textContent = '';
        locationList.innerHTML = '';
        recipesContainer.innerHTML = '';
    }
}

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 5.4094213, lng: 103.0887378 }, // Center of Malaysia
        zoom: 13
    });

    window.map = map; // Make map globally accessible
}

function searchLocation(lat, lng) {
    if (lat && lng) {
        const location = new google.maps.LatLng(lat, lng);
        window.map.setCenter(location);
        new google.maps.Marker({
            map: window.map,
            position: location,
            title: 'Selected Location'
        });
    } else {
        alert("No location selected");
    }
}

// Initialize the map when the window loads
window.onload = initMap;
