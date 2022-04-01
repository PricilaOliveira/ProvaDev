function novoCarro() {
    let newCarForm = document.getElementById('modalNewCarContainer');
    let formData = new FormData(newCarForm);
    
        fetch ("https://imdev.azurewebsites.net/vendarro/create-carro.php", {
            method: 'POST',
            body: formData})
            .then(response => {
                if(!response.ok) {
                throw Error('Favor preencha todos os campos!')
                }
            })
            .catch(error => alert(error))
}

let inputFile = document.getElementById('fileForm');
let fileNameField = document.getElementById('fileName');
inputFile.addEventListener('change', function(event){
    let uploadedFile = event.target.files[0].name;
    fileNameField.textContent = uploadedFile;
})

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

}