const url = 'https://restcountries.com/v3.1/all'
const loadingCard = document.querySelector('.loading')
const cards = document.querySelector('.card-container');
const card = document.querySelector('.card')
const searchbar = document.querySelector('#searchbar');
const searchForm = document.querySelector('#search-form')
const select = document.querySelector('.select-region')
let fullData = [];

loading(true);
function loading(isLoading) {
    if (isLoading) {
        loadingCard.innerHTML = `
            <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `
    }
    else {
        loadingCard.innerHTML = "";
    }
}

async function requestAPI(url) {
    //  document.querySelector('.card').textContent='loading'
    try {
        const request = await fetch(url)
        if (!request.ok) {
            throw new Error('Xatolik bor')
        }
        fullData = await request.json()
        showResult(fullData)
        loading(false)
    }
    catch (err) {
        console.log(err.message)
    }
}

requestAPI(url)


function showResult(data) {
    const allCountry = data;
    cards.innerHTML="";
    allCountry.forEach((country) => {
        const { name, cioc, flags, population, region, capital} = country
        const div = document.createElement('div')
        div.setAttribute('id', `${name.common}`)
    
        div.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${name.common}</h5>
                    <p class="card-text">Population: ${population}</p>
                    <p class="card-text">Region: ${region}</p>
                    <p class="card-text">Capital: ${capital}</p>
                    <div class="text-center">
                        <a href="./about.html?${cioc}" class="btn btn-primary mx-auto">ReadMore</a>
                    </div>
                </div>
            </div>
        `;
        cards.appendChild(div);
    })

}

// searchbar.addEventListener('input', (e) => {
//     let searchStr = e.target.value.toLowerCase()
//     for (i = 0; i < cards.childNodes.length; i++) {
//         const country = cards.childNodes[i].getAttribute('id').toLowerCase()
//         if (!country.includes(searchStr)) {
//             cards.childNodes[i].classList.add("hidden")

//         } else {
//             cards.childNodes[i].classList.remove("hidden")
//         }
//     }
// })



searchbar.addEventListener('input', (e) => {
    let searchStr = e.target.value.toLowerCase()
    let filteredData = [];
    if (searchStr == "") {
        filteredData = fullData;
    }
    else {
        fullData.forEach((country) => {
           if (country.name.common.toLowerCase().includes(searchStr)) {
            filteredData.push(country);
           }
        })
    }
    showResult(filteredData);
})

select.addEventListener('change', (e) => {
    const region = e.target.value.toLowerCase()
    filterByRegion(region);
})


function filterByRegion(regionText) {
    let filteredData = [];
    if (regionText == "all") {
        filteredData = fullData;
    }
    else {
        fullData.forEach((country) => {
            if(country.region.toLowerCase() == regionText.toLowerCase()) {
                filteredData.push(country)
            }
        });
       
    }
    showResult(filteredData);

}