
// This is all food code
const allFoodProduct = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
    .then((res) => res.json())
    .then((data) =>{
        displayFood(data.meals);
    })

    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
};

const displayFood = (foods) => {
    const foodContainer = document.getElementById('foodsContainer');

    foods.forEach(food => {
        const div = document.createElement('div');

        div.classList.add('card');

        div.innerHTML = `        
            <img onclick="singleFood('${food.idMeal}')" class="card-img" src="${food.strMealThumb}" alt="${food.strMeal}">
            <h5>${food.strMeal}</h5>      
        `;         

        foodContainer.appendChild(div);     
    });
};

// This is search food code
const searchFoods = (strMeal) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${strMeal}`)
    .then((res) => res.json())
    .then((data) => { 
        if(data.meals == null){
            alert('Invalid food');
        }
        else{
            searchingFood(data.meals);
        }
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
};


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const strMeal = document.getElementById('searchContainer').value;
    searchFoods(strMeal);
});

const searchingFood = (foods) => {
    const foodContainer = document.getElementById('foodsContainer');   
        
        foodContainer.innerHTML = '';
        foods.forEach(food => {
            const div = document.createElement('div');
            div.classList.add('card');
            div.innerHTML = `        
                <img onclick="singleFood('${food.idMeal}')" class="card-img" src="${food.strMealThumb}" alt="${food.strMeal}">
                <h5>${food.strMeal}</h5>      
            `; 
            foodContainer.appendChild(div);     
        });    
};


// This is single food code

const singleFood = (idMeal) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res) => res.json())
    .then((data) => {
        singlydispalyFood(data.meals);
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
};


const singlydispalyFood = (singlyFoods) => {
    const singlyfoodContainer = document.getElementById('singlyfoodsContainer');

    if(singlyFoods){
        singlyFoods.forEach(food => {
            const div = document.createElement('div');
    
        div.classList.add('singlycard');
        div.innerHTML = `        
            <img class="card-img" src="${food.strMealThumb}" alt="${food.strMeal}">
            <h5 class="food-name">${food.strMeal}</h5>
            <p class="ingredients">Ingredient</p>
            <li>${food.strIngredient1}</li>                     
            <li>${food.strIngredient2}</li>                     
            <li>${food.strIngredient3}</li>                     
            <li>${food.strIngredient4}</li>                     
            <li>${food.strIngredient5}</li>                     
            <li>${food.strIngredient6}</li>                   
                                        
        `;        
            singlyfoodContainer.appendChild(div);     
        });
    }   

};



allFoodProduct();
searchFoods();
singleFood();