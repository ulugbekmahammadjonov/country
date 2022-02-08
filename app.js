 const api ='https://restcountries.com/v3.1/all'
 const info = document.querySelector('.info')
 const cards= document.querySelector('.card-container')

let loading=false

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
        const {name, altSpellings, flags}=country
        const div = document.createElement('div')
        let card = `
            <div class="card" style="width: 18rem;">
                <img src="${flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name.common}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="./about.html?${altSpellings[name.common]}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;
        div.innerHTML=card;
        
        cards.appendChild(div);
    })
    
}