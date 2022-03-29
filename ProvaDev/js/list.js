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
            <tr class="carros">
                <td class="info-modelo">${carList[i].id}</td>
                <td class="info-modelo">${carList[i].modelo}</td>
                <td class="info-valor">${carList[i].valor}</td>
                <td class="info-descr">${carList[i].descricao}</td>
                <td><button id="deleteButton"><img id="deleteIcon"src="img/deleteIcon.png"></button></td>
                <td><button id="editButton"><img id="atIcon" src="img/atualizar.png"></button></td>
            </tr>`
    }
    console.log(carList)
}
listarCarros()

const delButton = document.getElementById('deleteButton');

delButton.addEventListener('click', function() { console.log('oi')})