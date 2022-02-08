const queryString = window.location.search;
console.log(queryString);
const cioc = queryString.slice(1)
const card = document.querySelector('.card-container')
const api =`https://restcountries.com/v3.1/alpha/${cioc}`
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
    const {flags, name}=data[0]
    console.log(data)
   
        
        const div = document.createElement('div')
        let detail = `
            <div class="card" style="width: 18rem;">
                <img src="${flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name.common}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        `;
        div.innerHTML=detail;
        
        card.appendChild(div);
    }   
    
