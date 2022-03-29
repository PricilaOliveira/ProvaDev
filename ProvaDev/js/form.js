function novoCarro() {
    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    
        fetch ("https://imdev.azurewebsites.net/vendarro/create-carro.php", {
            method: 'POST',
            body: formData})

        .then(response => {
            if(!response.ok) {
            throw Error('Preencha todos os corretamente!')
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