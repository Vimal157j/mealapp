




// importing of html tag..
const container=document.getElementById("moreMeals");

// fetching details of meal by id value..............




async function getdetails(term){  
  const resp = await fetch(
   ".../https:www.themealdb.com/api/json/v1/1/lookup.php?i=" + term 
   );

  const respData = await resp.json();
  const meals = respData.meals;

  // console.log(meals);
  return meals;

}



//  removing Item from favourite List of Items.........

var num=5000;
function remove(ev){
        let val=ev.toString();
    if (Object.values(localStorage).indexOf(val) > -1) {
        // The value exists.............
        Object.keys(localStorage).forEach(function(key) {
            if (localStorage.getItem(key) === val) {
              localStorage.removeItem(key);
            }
          });
      } else {
        // The value does not exist.............
        localStorage.setItem(num, ev);
        num++;
      }

      myFavourite();
}


//  diplay of Fovourite Items in a container box................
function myFavourite(){
    container.innerHTML=" ";
    Object.keys(localStorage).forEach( async function(key) {
        let val=parseInt(localStorage.getItem(key));
             console.log(val);
             fetchData(val);
             const num= await getdetails(val);
             if(num){
              //  console.log(num[0],"$$");
                let elt=num[0];
                let InfoDiv=document.createElement("div");
                let Info=`
                <a href="./meal.html?id=${elt.idMeal}"  id="mealsItem" name="elem.idMeal" target="_black">
                <div class="card1 m-2" style="width: 12rem;">
                <img src="${elt.strMealThumb}" class="card-img-top" alt="..."></a>
                <div class="card-body">
                  <h6 class="card-title">${elt.strMeal}</h6>
                  
                  <button id="box1" onclick="remove(${elt.idMeal})">Remove</button>
                </div>
              </div>`
             InfoDiv.innerHTML=Info;
             container.appendChild(InfoDiv);
            }
      });
};


//  innitail call of displaying favourite Items...in a container...........
myFavourite();


//  cheking changes in localStorage............
window.addEventListener("storage", function () {
  myFavourite();
}, false);
  

 function fetchData(val) {
  let request = new XMLHttpRequest();
  request.open("GET", new Request(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${val}`,{redirect:'manual'}));
  request.send();
  request.onload = () => {
    console.log("REQUEST: ", request);

    if (request.status == 200) {
      console.log("RAW JSON: ", JSON.parse(request.response));
      let json = JSON.parse(request.response);

      for (let i = 0; i < json.meals.length; i++) {
        let obj = json.meals[i];
        console.log("Meal Id :",obj.idMeal);
        console.log("JSON OBJECT: ", obj.strMeal);
      }
    } else {
      console.log(`ERROR: ${request.status} ${request.statusText}`);
    }
  };
}

