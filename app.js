 const api ='https://restcountries.com/v3.1/all'
 const info = document.querySelector('.info')
 const cards= document.querySelector('.card-container');
 const card = document.querySelector('.card')
 const searchbar = document.querySelector('#searchbar');
const searchForm = document.querySelector('#search-form')
const select = document.querySelector('.select-region')
let loading=false
let fullData = [];

 async function requestAPI(url){
    //  document.querySelector('.card').textContent='loading'
    loading=true
    try{
        const request = await fetch(url)
        if(!request.ok){
            throw new Error('Xatolik bor')
        }
        const data = await request.json()
        showResult(data)
        fullData = data
        loading=false
    }
    catch(err){
        console.log(err.message)
    }
 }

 requestAPI(api)


function showResult(data){
    const allCountry=data
    allCountry.forEach((country)=>{
        const {name, cioc, flags,region}=country
        const div = document.createElement('div')
        div.setAttribute('id',`${name.common}`)
        div.setAttribute('data-set', `${region}`)
        let card = `
            <div class="card" style="width: 18rem;">
                <img src="${flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name.common}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="./about.html?${cioc}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;
        div.innerHTML=card;
        
        cards.appendChild(div);
    })
    
}

 

searchbar.addEventListener('input', (e) => {
    let searchStr =e.target.value.toLowerCase()
    for(i=1;i<cards.childNodes.length;i++){
       const country = cards.childNodes[i].getAttribute('id').toLowerCase()
       if(!country.includes(searchStr)){
           cards.childNodes[i].classList.add("hidden")
    
       }else{
        cards.childNodes[i].classList.remove("hidden")
       }


    }
    
})

select.addEventListener('change',(e)=>{
    const region = select.value.toLowerCase()
    for(i=1;i<cards.childNodes.length;i++){
        const country = cards.childNodes[i].getAttribute('data-set').toLowerCase()
        if(!country.includes(region)){
            cards.childNodes[i].classList.add("hidden")
     
        }else{
         cards.childNodes[i].classList.remove("hidden")
        }
 
 
     }
})