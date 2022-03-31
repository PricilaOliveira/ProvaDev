let carList = []
let apiUrl = 'https://imdev.azurewebsites.net/vendarro'
let deleteId
let inputFile = document.getElementById('fileForm');
let fileNameField = document.getElementById('fileName');
const cars = document.querySelector('.tableCar')

let deleteYes = document.querySelector('#ButtonYes')
deleteYes.onclick = deleteCar

function CreateCar () {
    
}
function buscarApi(){
    fetch(apiUrl+'/get-carros.php')
    .then(response => response.json())
    .then(data => {
        carList = data 
        listarCarros(carList)
    })
}

buscarApi()

function listarCarros() {
    let carTable = document.querySelector('.carTable')
    carTable.innerHTML =`
    <tr>
        <th>Id</th>
        <th>Modelo</th>
        <th>Valor</th>
        <th>Descrição</th>
        <th>deletar</th>
        <th>editar</th>
    </tr>
    `
    for( let i in carList ){
        carTable.innerHTML += `
            <tr class="carros">
                <td>${carList[i].id}</td>
                <td class="info-modelo">${carList[i].modelo}</td>
                <td class="info-valor">R$${carList[i].valor}</td>
                <td class="info-descr">${carList[i].descricao}</td>
                <td><button class="deleteButton" id="deleteButton" data-id=${carList[i].id}><img id="deleteIcon"src="img/deleteIcon.png"></button></td>
                <td><button class="editButton" id="editButton" data-id=${carList[i].id}><img id="atIcon" src="img/atualizar.png"></button></td>
            </tr>`
    }
//  no onclick >:(

    let deleteBtn = document.querySelectorAll('.deleteButton')
    deleteBtn.forEach(button => {
        button.onclick = function() {
            deleteId = button.getAttribute('data-id')
            // deleteCar(carId) 
            exibeModalDelete()
        }
    })

    let editBtn = document.querySelectorAll('.editButton')
    editBtn.forEach(button => {
        button.onclick = function() {
            let carId = button.getAttribute('data-id')
            exibeModal(carId)
        }
    })
}

function deleteCar() {
    let carsFind = carList.find (car => car.id == deleteId)
    let form = new FormData()

    form.append('id', carsFind.id)

    fetch(apiUrl+'/delete-carro.php', {
        method: 'POST',
        body: form
    })
    .then( response=>response.json())
    .then( data => {
        buscarApi()
        closemodalDelete()
    })
}

let input = document.querySelector('#cardList')
    input.onkeyup=filterCars


inputFile.addEventListener('change', function(event){
    let uploadedFile = event.target.files[0].name;
    fileNameField.textContent = uploadedFile;
})

function filterCars() {
        let search = input.value.toLowerCase()
    
        let  carsFiltered = carList.filter(json => json.modelo.toLowerCase().includes(search))
        if ( carsFiltered < 1 ) {
            showCars(carList)
        }
        else {
            showCars(carsFiltered)
        }
        console.log(search)
    
}

function showCars(carsFiltered) {
    let carItem = document.querySelector('.carTable');   
    carItem.innerHTML = ` 
    <tr>
        <th>Id</th>
        <th>Modelo</th>
        <th>Valor</th>
        <th>Descrição</th>
        <th>deletar</th>
        <th>editar</th>
    </tr>`
        
    for (let i in carsFiltered){
        carItem.innerHTML +=
            `<tr class="carros" data-id=${carsFiltered[i].id}>
                <td>${carsFiltered[i].id}</td>
                <td class="info-modelo">${carsFiltered[i].modelo}</td>
                <td class="info-valor">R$${carsFiltered[i].valor}</td>
                <td class="info-descr">${carsFiltered[i].descricao}</td>
                <td><button id="deleteButton" onclick="getCarId()"><img id="deleteIcon"src="img/deleteIcon.png"></button></td>
                <td><button id="editButton" onclick="exibeModal()"><img id="atIcon" src="img/atualizar.png"></button></td>
            </tr>`
            }
}

function exibeModal(carId) {

let exibeCar = carList.find(modal => modal.id == carId)

let nomeCar = document.getElementById('nomeId')
    nomeCar.value = `${exibeCar.modelo}`;

let valorCar = document.getElementById('valorId')
    valorCar.value = `${exibeCar.valor}`;

let descCar = document.getElementById('descricaoId')
    descCar.value = `${exibeCar.descricao}`
let modal = document.querySelector('#modal-container')
    modal.style.cssText= 'transform: translateY(0%)'

let modalbg = document.querySelector('.modal-bg')
    modalbg.style.display='flex'  // puxará o background 

let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: hidden' // bloqueia o scroll ao ativar modal

    let editCar = document.querySelectorAll('#buttonFormId')
    editCar.forEach(button => {
        button.onclick = function() {
            // let carsFind = carList.find (car => car.id == carId)
            let myForm = document.getElementById('myForm')
            let formData = new FormData(myForm)
            formData.append('id', exibeCar.id)
            fetch ("https://imdev.azurewebsites.net/vendarro/update-carro.php", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch(error => alert(error))
            closemodal()
            buscarApi() 
        }
    })
}

function closemodal() {
let close = document.querySelector('#modal-container')
    close.style.cssText= 'transform: translateY(-150%)'
    
let closemodalbg = document.querySelector('.modal-bg')
    closemodalbg.style.display='none'
    
let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: auto' // desbloqueia o scroll ao ativar modal
    buscarApi() 
}

function exibeModalDelete() {
    let modalDeleteBg = document.querySelector('.modalDeleteBg')
    modalDeleteBg.style.display='flex';

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: hidden';

    let modal = document.querySelector('#modalDeleteContainer')
    modal.style.cssText= 'transform: translateY(0%)';

}

function closemodalDelete() {
    let closeModalDeleteBg= document.querySelector('.modalDeleteBg')
    closeModalDeleteBg.style.display='none';

    let close = document.querySelector('#modalDeleteContainer')
    close.style.cssText= 'transform: translateY(-600%)';

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: auto';
}

function exibeModalNewCar() {
    let modalDeleteBg = document.querySelector('#modalNewCarBg')
    modalDeleteBg.style.display='flex';

    let modal = document.querySelector('#modalNewCarContainer')
    modal.style.cssText= 'transform: translateY(0%)';

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: hidden';
}

function closeModalNewCar() {

    let closeModalDeleteBg= document.querySelector('#modalNewCarBg')
    closeModalDeleteBg.style.display='none';

    let close = document.querySelector('#modalNewCarContainer')
    close.style.cssText= 'transform: translateY(-600%)';

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: auto';
}