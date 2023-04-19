

// SCRIPT.JS FOR HOME PAGE OF HTML ..........

// importing of document element.......
const input=document.getElementById("input1");
const msg=document.getElementById("msg");
const submit=document.getElementById("btn1");
const container=document.getElementById("moreMeals");



async function getdetails(term){  
    const resp = await fetch(
     "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
     );
 
    const respData = await resp.json();
    const meals = respData.meals;
 
    // console.log(meals);
    return meals;
 
 }

 
 
 async function getdetailsByLetter(term){  
    const resp = await fetch(
     "https://www.themealdb.com/api/json/v1/1/search.php?f=" + term
     );
 
    const respData = await resp.json();
    const meals = respData.meals;
 
    // console.log(meals);
    return meals;
 
 }
 



// updating the input search..Items list by first letter of dish name..
 async function checkByLetter(){
    if(input.value.length !== 0){
    msg.style.height="200px";
    msg.style.display="block";
    let val=input.value;
    const data= await getdetailsByLetter(val);
        console.log(data);
        msg.innerText="";
        if(data){
            data.forEach(elem=>{
                // console.log(elem.strMeal);
                let paratext=document.createElement("div");
                paratext.innerHTML=`<div id="itemName">${elem.strMeal}</div>`
                msg.appendChild(paratext);
            });
        }
    }else{
        msg.innerText="";
    }

};



// Updating list of similar Item dishes you have searched in input search bar...........
async function itemsMeal(data1){
   

    const meals = await getdetails(data1);

    if (meals) {
        container.innerText="";
        meals.forEach((elt) => {
            console.log(elt);
            msg.style.display="none";
            let InfoDiv=document.createElement("div");
                let Info=`
                <a href="./meal.html?id=${elt.idMeal}"  id="mealsItem" name="elem.idMeal" target="_black">
                <div class="card m-2" style="width: 12rem;">
                <img src="${elt.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h6 class="card-title">${elt.strMeal}</h6>
                  
                  <input type="checkbox" class="box" id="${elt.idMeal}" onclick="myFunction(${elt.idMeal})">
                </div>
              </div></a>
              `
             InfoDiv.innerHTML=Info;
             container.appendChild(InfoDiv);
        });
    }else{
        console.log("not found");
        msg.style.display="block";
        msg.innerText="Item Not Fount";
    }
   
    checkingFav();
};


//  innitail items of home page....
// const url2=`https:www.themealdb.com/api/json/v1/1/search.php?s=${""}`
itemsMeal("");


var lastName="";

// searching Item when submiting the Name of Item in input search bar....
submit.addEventListener('click',()=>{
    let inputValue=input.value;
    lastName=inputValue;
    console.log(inputValue);
    itemsMeal(inputValue);
    input.value="";
});

var num=0;
function myFunction(ev){
        let val=ev.toString();
        console.log(val);
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
}

// checking check box ckecked by using Favourite List Items......
function checkingFav(){
    Object.keys(this.localStorage).forEach(function(key){
        let val=localStorage.getItem(key);
        console.log(val,"$$",key);
        document.getElementById(val).checked =true;
    });
}

//  cheking changes in localStorage............
window.addEventListener("storage", function () {
    itemsMeal(lastName);
}, false);
    
