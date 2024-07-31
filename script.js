
const url='https://api.thedogapi.com/v1/images/search?limit=10'
const url1='https://api.thedogapi.com/v1/images/search'
const breedsUrl='https://api.thedogapi.com/v1/breeds'
const breedImgUrl='https://api.thedogapi.com/v1/images/search?breed_ids='
const getDogs=document.querySelector('#getDogs');
const getDog=document.querySelector('#getDog');
const row=document.querySelector('#row');
const selectBreeds=document.querySelector('#select');
const dog=document.querySelector('#dog');


let breedsArr=[]

fetch(breedsUrl)
    .then(response => response.json())
    .then(data => {
        breedsArr=data;
        selectBreeds.innerHTML = data.map(breed => {
            return `
            <option value=${breed.id}>${breed.name}</option>
            `
        })

    })


selectBreeds.addEventListener('change', (event) => {
    fetch(breedImgUrl + event.target.value)
        .then(response => response.json())
        .then(data => {
            const currentBreed = breedsArr.find(el => +el.id === +event.target.value)
            return dog.innerHTML=`
            <img src="${data[0].url}" class="img" alt=""/>
            <div>
            <h2>${currentBreed.name}</h2>
            <p>${currentBreed?.description ? currentBreed?.description : ''}</p>
            <p>${currentBreed?.country_code ? currentBreed?.country_code : ''}</p>
            </div>
            
            `

        })

})


// getDogs.addEventListener('click', (e) => {
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             return row.innerHTML=data.map(dog => {
//                 return `
//         <div class='col-4'>
//              <div>
//                 <img src="${dog.url}" class="img" alt=""/>
//             </div>
//
//         </div>
//         `
//             }).join('')
//         })
//
// })
//
//
// getDog.addEventListener('click', (e) => {
//     fetch(url1)
//         .then(res => res.json())
//         .then(data => {
//             return row.innerHTML=data.map(dog => {
//                 return `
//         <div class='col-4'>
//              <div>
//                 <img src="${dog.url}" class="img" alt=""/>
//             </div>
//
//         </div>
//         `
//             }).join('')
//         })
//
// })
 const handleGetDogs=(arg) => {
     fetch(arg)
         .then(res => res.json())
         .then(data => {
             row.innerHTML=data.map(dog => {
                 return `
        <div class='col-4'>
             <div>
                <img src="${dog.url}" class="img" alt=""/>
            </div>
            
        </div>
        `
             }).join('')
         })
 }
getDogs.addEventListener('click', () => handleGetDogs(url))
getDog.addEventListener('click', () => handleGetDogs(url1))