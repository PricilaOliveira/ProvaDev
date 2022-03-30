let carList = []
let apiUrl = 'https://imdev.azurewebsites.net/vendarro'

function buscarApi(){
    fetch(apiUrl+'/get-carros.php')
    .then(response => response.json())
    .then(data => {
        carList = data 
        console.log(carList)
        listarCarros(carList)
    })
}

buscarApi()

function updateCar() {
    let myForm = document.getElementById('myForm')
    let formData = new FormData(myForm);

    fetch (apiUrl, {
        method: 'POST',
        body: formData})

}
// function novoCarro() {
//     let myForm = document.getElementById('myForm');
//     let formData = new FormData(myForm);
    
//         fetch ("https://imdev.azurewebsites.net/vendarro/create-carro.php", {
//             method: 'POST',
//             body: formData})
//             .then(response => {
//                 if(!response.ok) {
//                 throw Error('Favor preencha todos os campos!')
//                 }
//                 return alert('Carro enviado com sucesso!')
//             })
//             .catch(error => alert(error))
// }
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
                <td><button class="deleteButton" id="deleteButton" onClick="window.location.reload();" data-id=${carList[i].id}><img id="deleteIcon"src="img/deleteIcon.png"></button></td>
                <td><button class="editButton" id="editButton" data-id=${carList[i].id}><img id="atIcon" src="img/atualizar.png"></button></td>
            </tr>`
    }
    
//  no onclick >:(

    let deleteBtn = document.querySelectorAll('.deleteButton')
    deleteBtn.forEach(button => {
        button.onclick = function() {
            let carId = button.getAttribute('data-id')
            deleteCar(carId) 
        }
        
    })

    let editBtn = document.querySelectorAll('.editButton')
    editBtn.forEach(button => {
        button.onclick = function() {
            let carId = button.getAttribute('data-id')
            exibeModal(carId)
        }
    })
    const reloadtButton = document.querySelector("#reload");
    function reload() {
        reload = location.reload();
    }
    
}

function updateCar() {

}

function deleteCar(carId) {
    //puxando/comparando id
    let carsFind = carList.find (car => car.id == carId)
    let form = new FormData()

    form.append('id', carsFind.id)

    fetch(apiUrl+'/delete-carro.php', {
        method: 'POST',
        body: form
    })
    .then( response=>response.json())
    .then( data => console.log(data))
    listarCarros()
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
        console.log(search)
    
    }

    function showCars(carsFiltered) {

        let carItem = document.querySelector('.carTable');
    
        carItem.innerHTML = ""
    
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

    }

    function closemodal() {
        let close = document.querySelector('#modal-container')
        close.style.cssText= 'transform: translateY(-150%)'
    
        let closemodalbg = document.querySelector('.modal-bg')
        closemodalbg.style.display='none'
    
        let scrollblock = document.querySelector('body')
        scrollblock.style.cssText='overflow: auto' // desbloqueia o scroll ao ativar modal
    }