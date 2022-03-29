let cars 

let input = document.querySelector('#cardsid')
    input.onkeyup=filterCars

let closeBtn = document.querySelector('#spanbutton')
    closeBtn.onclick = closemodal

let closeBg = document.querySelector('.modal-bg')
    closeBg.onclick = closemodal 


// close modal com Esc
window.addEventListener("keyup",(e) => {
    if (e.key == 'Escape'){
        console.log(e)
    }
})

let apiUrl = "https://imdev.azurewebsites.net/vendarro"

fetch(apiUrl+"/get-carros.php")
.then(response => response.json())
.then(data => {
    cars = data
    showCars(cars)
})


function showCars(carsFiltered) {

    let carscontainer = document.getElementById('carscontainer');

    carscontainer.innerHTML = ""

    for (let i in carsFiltered){
        console.log(`${apiUrl}/${carsFiltered[i].filePath}`)

        carscontainer.innerHTML +=
        `<div class="container-jaguar" data-id="${carsFiltered[i].id}">
        <img class="container-jaguar-img" src="${apiUrl}/${carsFiltered[i].filePath}">
        <p class="container-jaguar-name">${carsFiltered[i].modelo}</p>
        <p class="container-jaguar-valor">R$ ${carsFiltered[i].valor}</p>
        </div>`
    }

    let cards = document.querySelectorAll('.container-jaguar')
    cards.forEach(card => {
        card.onclick = function() {
            let idcar = card.getAttribute('data-id')
            exibeModal(idcar)
        }
    })

    let counter = document.getElementById('counterid') 
    counter.innerHTML = "Carros encontrados: "
    counter.innerHTML += carsFiltered.length
}

function filterCars() {
    let search = input.value.toLowerCase()

    let  carsFiltered = cars.filter(json => json.nome.toLowerCase().includes(search))
    if ( carsFiltered < 1 ) {
        showCars(cars)
    }
    else {
        showCars(carsFiltered)
    }
    console.log(search)

}

function exibeModal(idcar) {
    let findmodal = cars.find(modal => modal.id == idcar)

    let modal = document.querySelector('#modal-container')
    modal.style.cssText= 'transform: translateY(0%)'

    let modalbg = document.querySelector('.modal-bg')
    modalbg.style.display='flex'  // puxará o background 

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: hidden' // bloqueia o scroll ao ativar modal

    let modalimg = document.querySelector('#modal-img')
    modalimg.setAttribute('src',`${apiUrl}/${findmodal.filePath}`)

    let modalnome = document.querySelector('#modal-namecar')
    modalnome.innerHTML = findmodal.modelo

    let modalvalor = document.querySelector('#modal-valor')
    modalvalor.innerHTML = `R$ ${findmodal.valor}`

    let modaldsc = document.querySelector('#description')
    modaldsc.innerHTML = findmodal.descricao
}

function closemodal() {
    let close = document.querySelector('#modal-container')
    close.style.cssText= 'transform: translateY(-150%)'

    let closemodalbg = document.querySelector('.modal-bg')
    closemodalbg.style.display='none'

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: auto' // desbloqueia o scroll ao ativar modal
}