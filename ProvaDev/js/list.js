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

function listarCarros() {
    let carTable = document.querySelector('.carTable')

    for( let i in carList ){
        carTable.innerHTML += `
            <tr class="carros" data-id=${carList[i].id}>
                <td>${carList[i].id}</td>
                <td class="info-modelo">${carList[i].modelo}</td>
                <td class="info-valor">R$${carList[i].valor}</td>
                <td class="info-descr">${carList[i].descricao}</td>
                <td><button id="deleteButton" onclick="getCarId()"><img id="deleteIcon"src="img/deleteIcon.png"></button></td>
                <td><button id="editButton"><img id="atIcon" src="img/atualizar.png"></button></td>
            </tr>`
    }
    console.log(carList)
}

function getCarId() {

    let getCarId = document.querySelectorAll('.carros')
        getCarId.forEach(tr =>{
        tr.onclick = () => { 
        let carId = tr.getAttribute('data-id')
        deleteCar(carId)
    }
    }) 
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
}


listarCarros()

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
                <td><button id="editButton"><img id="atIcon" src="img/atualizar.png"></button></td>
            </tr>`
        }
    }