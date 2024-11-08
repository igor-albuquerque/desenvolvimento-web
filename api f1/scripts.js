function criaCardComparacao(dados1, dados2) {
    let contador1=0
    let contador2=0
    const container = document.getElementById("container");
    container.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card");

    const piloto1 = document.createElement("div");
    piloto1.classList.add("piloto");

    const foto1 = document.createElement("img");
    foto1.src = dados1.imageSrc;
    piloto1.appendChild(foto1);

    const nome1 = document.createElement("p");
    nome1.textContent = `Nome: ${dados1.nome}`;
    piloto1.appendChild(nome1);

    const vitorias1 = document.createElement("p");
    if (dados1.vitorias>dados2.vitorias) {
        vitorias1.textContent = `*Vitórias: ${dados1.vitorias}*`;
        piloto1.appendChild(vitorias1);
        contador1++
    } else {
        vitorias1.textContent = `Vitórias: ${dados1.vitorias}`;
        piloto1.appendChild(vitorias1);
    }
    

    const corridas1 = document.createElement("p");
    if (dados1.corridas>dados2.corridas) {
        corridas1.textContent = `*campeonatos: ${dados1.corridas}*`;
        piloto1.appendChild(corridas1);
        contador1++   
    } else {
        corridas1.textContent = `campeonatos: ${dados1.corridas}`;
        piloto1.appendChild(corridas1);
    }
    

    const id1 = document.createElement("p");
    id1.textContent = `ID: ${dados1.id}`;
    piloto1.appendChild(id1);

    const carreira1 = document.createElement("p");
    if (dados1.carreira>dados2.carreira) {
        carreira1.textContent = `*pontos de carreira: ${dados1.carreira}*`;
        piloto1.appendChild(carreira1);
        contador1++ 
    } else {
        carreira1.textContent = `pontos de carreira: ${dados1.carreira}`;
        piloto1.appendChild(carreira1);
    }
    

    const btnLimpar1 = document.createElement("button");
    btnLimpar1.textContent = "Limpar";
    btnLimpar1.onclick = () => {
        piloto1.innerHTML = "";
        piloto1.appendChild(btnLimpar1);
    };
    piloto1.appendChild(btnLimpar1);

    card.appendChild(piloto1);

    const piloto2 = document.createElement("div");
    piloto2.classList.add("piloto");

    const foto2 = document.createElement("img");
    foto2.src = dados2.imageSrc;
    piloto2.appendChild(foto2);

    const nome2 = document.createElement("p");
    nome2.textContent = `Nome: ${dados2.nome}`;
    piloto2.appendChild(nome2);

    const vitorias2 = document.createElement("p");
    if (dados2.vitorias>dados1.vitorias) {
        vitorias2.textContent = `*Vitórias: ${dados2.vitorias}*>`;
        piloto2.appendChild(vitorias2);
        contador2++ 
    } else {
        vitorias2.textContent = `Vitórias: ${dados2.vitorias}`;
        piloto2.appendChild(vitorias2);
    }
   

    const corridas2 = document.createElement("p");
    if (dados2.corridas>dados1.corridas) {
        corridas2.textContent = `*podiums: ${dados2.corridas}*`;
        piloto2.appendChild(corridas2);
        contador2++ 
    } else {
        corridas2.textContent = `podiums: ${dados2.corridas}`;
        piloto2.appendChild(corridas2);
    }

    const id2 = document.createElement("p");
    id2.textContent = `ID: ${dados2.id}`;
    piloto2.appendChild(id2);

    const carreira2 = document.createElement("p");
    if (dados2.carreira>dados1.carreira) {
        carreira2.textContent = `*pontos de carreira: ${dados2.carreira}*`;
        piloto2.appendChild(carreira2);
        contador2++ 
    } else {
        carreira2.textContent = `pontos de carreira: ${dados2.carreira}`;
        piloto2.appendChild(carreira2);
    }

    const btnLimpar2 = document.createElement("button");
    btnLimpar2.textContent = "Limpar";
    btnLimpar2.onclick = () => {
        piloto2.innerHTML = "";
        piloto2.appendChild(btnLimpar2);
    };
    piloto2.appendChild(btnLimpar2);

    card.appendChild(piloto2);
    container.appendChild(card);
    if (contador1<contador2) {
        console.log("vitoria piloto1")
    } else {
        console.log("vitoria piloto2")
    }
}

async function buscarPiloto(nome) {
    const url = `https://api-formula-1.p.rapidapi.com/drivers?search=${nome}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c7f52b762dmshdde23277bc1db4bp15da64jsnd2e933964b80',
            'x-rapidapi-host': 'api-formula-1.p.rapidapi.com'
        }
    };

    try {
        const resposta = await fetch(url, options);
        if (resposta.status === 404 || resposta.status !== 200) {
            throw new Error("Piloto não encontrado ou erro desconhecido.");
        }

        const dados = await resposta.json();
        console.log(dados)
        return {
            imageSrc: dados.response[0]?.image,
            nome: dados.response[0]?.name,
            id: dados.response[0]?.id,
            vitorias: dados.response[0]?.podiums || 0,
            corridas: dados.response[0]?.world_championships || 0,
            carreira: dados.response[0]?.career_points || 0
        };
    } catch (error) {
        console.error("Erro ao buscar piloto:", error);
        return null;
    }
}

async function compararPilotos() {
    const nomePiloto1 = document.getElementById("piloto_nome1").value.toLowerCase();
    const nomePiloto2 = document.getElementById("piloto_nome2").value.toLowerCase();

    if (!nomePiloto1 || !nomePiloto2) {
        alert("Insira o nome de dois pilotos para comparar.");
        return;
    }

    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    const dadosPiloto1 = await buscarPiloto(nomePiloto1);
    const dadosPiloto2 = await buscarPiloto(nomePiloto2);

    if (dadosPiloto1 && dadosPiloto2) {
        criaCardComparacao(dadosPiloto1, dadosPiloto2);
    } else {
        alert("Um ou ambos os pilotos não foram encontrados.");
    }

    spinner.style.display = "none";
}

document.getElementById("comparar-pilotos").addEventListener("click", compararPilotos);
document.getElementById("limpar-tudo").addEventListener("click", () => {
    document.getElementById("container").innerHTML = "";
    document.getElementById("piloto_nome1").value = "";
    document.getElementById("piloto_nome2").value = "";
});



function criaCardComparacao(dados1, dados2) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    function criarCardPiloto(dados) {
        const card = document.createElement("div");
        card.classList.add("card");

        const foto = document.createElement("img");
        foto.src = dados.imageSrc;
        card.appendChild(foto);

        const nome = document.createElement("p");
        nome.textContent = `Nome: ${dados.nome}`;
        card.appendChild(nome);

        const vitorias = document.createElement("p");
        vitorias.textContent = `Vitórias: ${dados.vitorias}`;
        card.appendChild(vitorias);

        const corridas = document.createElement("p");
        corridas.textContent = `Campeonatos: ${dados.corridas}`;
        card.appendChild(corridas);

        const id = document.createElement("p");
        id.textContent = `ID: ${dados.id}`;
        card.appendChild(id);

        const carreira = document.createElement("p");
        carreira.textContent = `Pontos de carreira: ${dados.carreira}`;
        card.appendChild(carreira);

        const btnLimpar = document.createElement("button");
        btnLimpar.textContent = "Limpar";
        btnLimpar.onclick = () => {
            card.innerHTML = ""; 
            card.appendChild(btnLimpar);
        };
        card.appendChild(btnLimpar);

        return card;
    }

    const cardPiloto1 = criarCardPiloto(dados1);
    const cardPiloto2 = criarCardPiloto(dados2);

    container.appendChild(cardPiloto1);
    container.appendChild(cardPiloto2);
}
