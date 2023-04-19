



// MEAL DETAIL PAGE SCRIPT.JS FILE............
const heading=document.getElementById('heading');
const imgContainer=document.getElementById('img-container');
const name1=document.getElementById('name');
const cat=document.getElementById('cat');
const ing1=document.getElementById('in1');
const ing2=document.getElementById('in2');
const ing3=document.getElementById('in3');
const ing4=document.getElementById('in4');
const Area=document.getElementById('contry');
const youtub=document.getElementById('youtub');
const dtml=document.getElementById("meal-deatails-plate");

// fetching details of meal by id value..............
async function getdetails(term){  
    const resp = await fetch(
     "https:www.themealdb.com/api/json/v1/1/lookup.php?i=" + term
     );
  
    const respData = await resp.json();
    const meals = respData.meals;
  
    // console.log(meals);
    return meals;
  
  }
  





async function updateMealDetails(val){
    console.log(val);
    const data= await getdetails(val);
    console.log(data);
    if(data){
        console.log(data[0]);
        let elem=data[0];
        imgContainer.innerHTML=`
        <img src="${elem.strMealThumb}" id="detail-img">`
        name1.innerText += " "+elem.strMeal;
        cat.innerText += " "+elem.strCategory;
        ing1.innerText +=" "+ elem.strIngredient1;
        ing2.innerText +=" "+ elem.strIngredient2;
        ing3.innerText +=" "+ elem.strIngredient3;
        ing4.innerText +=" "+ elem.strIngredient4;
        youtub.innerText +=" "+ elem.strYoutube;
        Area.innerText += " "+elem.strArea;    
    }
}

// getting Attribute from url of this page.......
let params = new URLSearchParams(document.location.search);
// getting id of meals ............
let name = params.get("id");
// calling function with item id...........
console.log(name);
updateMealDetails(name); 