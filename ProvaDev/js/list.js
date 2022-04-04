let carList = []
let apiUrl = 'https://imdev.azurewebsites.net/vendarro'
let deleteId
const cars = document.querySelector('.tableCar')

let deleteYes = document.querySelector('#ButtonYes')
deleteYes.onclick = deleteCar

function newCarfunc() {
    let newCar = document.getElementById('newCarForm');
    let newFormData = new FormData(newCar)
    
        fetch ("https://imdev.azurewebsites.net/vendarro/create-carro.php", {
            method: 'POST',
            body: newFormData})
            .then(response => {
                if(!response.ok) {
                throw Error('Favor preencha todos os campos!')
                }
                return alert('Carro enviado com sucesso!')
            })
            .catch(error => alert(error))
}

// altera o nome da imagem no input do novo carro
let newCarInputImg = document.getElementById('newCarModalImg')
let newCarInputValue = document.getElementById('newCarModalImgValue')

newCarInputImg.addEventListener('change', function(event) {
    let uploadedNewCarImg = event.target.files[0].name
    newCarInputValue.textContent = uploadedNewCarImg
})

// altera nome da imagem no input do atualizar carro
let inputFile = document.getElementById('fileForm')
let fileNameField = document.getElementById('fileName')

inputFile.addEventListener('change', function(event){
    let uploadedFile = event.target.files[0].name;
    fileNameField.textContent = uploadedFile;
})

function NewCarValidate() {
    let newCarModalName = document.getElementById('newCarModalName')
    let newCarModalValor = document.getElementById('newCarModalValor')
    let newCarModalDesc = document.getElementById('newCarModalDesc')
    let newCarModalImagem = document.getElementById('newCarModalImg')
    let filesModalNewCar = newCarModalImagem.files;

    if (newCarModalName.value == '') {
        alert ('Preencha o modelo do carro!');
       }
        if (newCarModalValor.value == '') {
           alert ('Preencha o valor!');
       }
        if (newCarModalDesc.value == '') {
          alert ('Escreva uma breve descrição para o carro!');
       }
       if (filesModalNewCar.length == 0) {
           alert ('Insira uma imagem!')
       }
       else {
            alert ('Carro enviado com sucesso!')
            buscarApi()
        }
        newCarfunc()
        closeModalNewCar()
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


    let validarNovoCarro = document.querySelector('#modalNewCarRegister')
        validarNovoCarro.onclick = (NewCarValidate)

    let fechaModalDeletarNao = document.querySelector('#ButtonNo')
        fechaModalDeletarNao.onclick = (closemodalDelete)

    let openModalNewCar = document.querySelector('.buttonAdd')
        openModalNewCar.onclick = (exibeModalNewCar)

    let fechaModalNewCar = document.querySelector('#modalNewCarBg')
        fechaModalNewCar.onclick = (closeModalNewCar)

    let fechaModalBg = document.querySelector('.modal-bg')
        fechaModalBg.onclick = (closemodal)

    let fechamodalDeleteBg = document.querySelector('.modalDeleteBg')
        fechamodalDeleteBg.onclick = (closemodalDelete)
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

function filterCars() {
        let search = input.value.toLowerCase()
    
        let  carsFiltered = carList.filter(json => json.modelo.toLowerCase().includes(search))
        if ( carsFiltered < 1 ) {
            showCars(carList)
        }
        else {
            showCars(carsFiltered)
        }
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
    close.style.cssText= 'transform: translateY(-1000%)';

    let scrollblock = document.querySelector('body')
    scrollblock.style.cssText='overflow: auto';
}