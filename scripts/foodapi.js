console.log("foodapi was included");

foodFactory = (foodItem) => {
    return `<div class="foodItem-div"><h2>${foodItem.name}</h2>`
    /*
    <p><b>Country of origin</b> : ${}</p>
    <p><b>Calories per serving</b> : ${}</p>
    <p><b>Fat per serving</b> : ${}</p>
    <p><b>Sugar per serving</b> : ${}</p>
    <p><b>Ingredients</b> : ${}</p>
    
    
    </div>`
    */
     /* --- Things to add ----
    Ingredients
    Country of origin
    Calories per serving
    Fat per serving
    Sugar per serving
    */
}


addFoodToDom = (foodAsHTML) => {
    //make variable for container
    const el = document.querySelector("#container");
    
    el.innerHTML += foodAsHTML;
   
}


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
