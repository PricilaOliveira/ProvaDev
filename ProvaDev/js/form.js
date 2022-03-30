function novoCarro() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    
        fetch ("https://imdev.azurewebsites.net/vendarro/create-carro.php", {
            method: 'POST',
            body: formData})
            .then(response => {
                if(!response.ok) {
                throw Error('Favor preencha todos os campos!')
                }
                return alert('Carro enviado com sucesso!')
            })
            .catch(error => alert(error))
}

let inputFile = document.getElementById('fileForm');
let fileNameField = document.getElementById('fileName');

inputFile.addEventListener('change', function(event){
    let uploadedFile = event.target.files[0].name;
    fileNameField.textContent = uploadedFile;
})

const cars = document.querySelector('.tableCar')

function validar() {
    let modelo = document.getElementById('nomeId');
    let valor = document.getElementById('valorId');
    let descr = document.getElementById('descricaoId');
    let image = document.getElementById('fileForm');
    let imgvalue = image.files;

    if (modelo.value == '') {
     alert ('Preencha o modelo do carro!');
    }
     if (valor.value == '') {
        alert ('Preencha o valor!');
    }
     if (descr.value == '') {
       alert ('Escreva uma breve descrição para o carro!');
    }
    if (imgvalue.length == 0) {
        alert ('Insira uma imagem!')
    }
    else {
        novoCarro()
     }
}

