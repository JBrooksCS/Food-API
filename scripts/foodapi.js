console.log("foodapi was included");

foodFactory = (foodItem) => {
    let htmlString = (`<div class="foodItem-div">
                        <ul class="main_list">
                        <li><h2>${foodItem.name}</h2></li>`)

    //Origin
    htmlString += `<li><h4><b>Country of Origin</b></h4></li>
                    <li>${foodItem.ethnicity}</li>`;
    //Calories
    htmlString += `<li><h4><b>Calories</b></h4></li>
                    <li>${foodItem.calories}</li>`
    //Fat
    htmlString += `<li><h4><b>Grams of Fat</b></h4></li>
                    <li>${foodItem.fat}</li>`                
    //INGREDIENTS
    htmlString+= (`<li><h4><b>Ingredients</b></h4></li>`)
    foodItem.ingredients.forEach(listItem => {
        htmlString += `<li>${listItem.text}</li>`;
        //console.log(listItem.text)
    })
    htmlString += `</ul></div>`;
    return htmlString
   
}


addFoodToDom = (foodAsHTML) => {
    //make variable for container
    const el = document.querySelector("#container");

    el.innerHTML += foodAsHTML;

}

fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            //console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients;
                    food.ethnicity = productInfo.product.countries;
                    
                    food.sugar = productInfo.product.nutriments.sugars_value;
                    food.fat = productInfo.product.nutriments.fat;
                    food.calories = productInfo.product.nutriments.energy_value + ' kcal';
                    console.log(food) 
                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })





/*
function getData(resource) {
    //Will likely remove this line later, clears previous content
    const el = document.querySelector("#container");
    el.innerHTML = "";

    fetch(`http://localhost:8088/${resource}`)
        .then(foodResult => {
            console.log(foodResult)
            return foodResult
        })
        .then(foods => foods.json())
        .then(parsedFoods => {
            parsedFoods.forEach(food => {
                const foodAsHTML = foodFactory(food);
                addFoodToDom(foodAsHTML);
            })
        })
}

const getDataButton = document.getElementById("btn-getData");
// works getDataButton.addEventListener("click", getData);
//wont work, is called before action  getDataButton.addEventListener("click", getData("drinks"));
//
getDataButton.addEventListener("click", () => getData("drinks"));
*/