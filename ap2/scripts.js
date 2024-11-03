
async function trunfo() {
    
    const input = document.getElementById("piloto_nome");

    if (!input) {
        console.log("Elemento 'piloto_nome' não encontrado.");
        return; 
    }

    const nome = input.value;

    const url = `https://api-formula-1.p.rapidapi.com/drivers?search=${nome}`;

    
    const options = {
        method: 'GET', 
        headers: {
            'x-rapidapi-key': '9bd4480d30msh303ccd63e416d40p156124jsn0edbfc0c9806', 
            'x-rapidapi-host': 'api-formula-1.p.rapidapi.com'
        }
    };

    try {
       
        const response = await fetch(url, options);


        const result = await response.text();


        console.log(result);
    } catch (error) {

        console.error(error);
    }
}


const btnBuscar = document.getElementById("buscar-piloto");
if (btnBuscar) {

    btnBuscar.addEventListener("click", trunfo);
}


const inputNome = document.getElementById("piloto_nome");
if (inputNome) {
    
    inputNome.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            evento.preventDefault(); 
            trunfo(); 
        }
    });
}
