function criaCardComparacao(dados1, dados2) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card-comparacao");

    const piloto1 = document.createElement("div");
    piloto1.classList.add("piloto");

    const foto1 = document.createElement("img");
    foto1.src = dados1.imageSrc;
    piloto1.appendChild(foto1);

    const nome1 = document.createElement("p");
    nome1.textContent = `Nome: ${dados1.nome}`;
    piloto1.appendChild(nome1);

    const vitorias1 = document.createElement("p");
    vitorias1.textContent = `Vitórias: ${dados1.vitorias}`;
    piloto1.appendChild(vitorias1);

    const corridas1 = document.createElement("p");
    corridas1.textContent = `Corridas: ${dados1.corridas}`;
    piloto1.appendChild(corridas1);

    const id1 = document.createElement("p");
    id1.textContent = `ID: ${dados1.id}`;
    piloto1.appendChild(id1);

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
    vitorias2.textContent = `Vitórias: ${dados2.vitorias}`;
    piloto2.appendChild(vitorias2);

    const corridas2 = document.createElement("p");
    corridas2.textContent = `Corridas: ${dados2.corridas}`;
    piloto2.appendChild(corridas2);

    const id2 = document.createElement("p");
    id2.textContent = `ID: ${dados2.id}`;
    piloto2.appendChild(id2);

    const btnLimpar2 = document.createElement("button");
    btnLimpar2.textContent = "Limpar";
    btnLimpar2.onclick = () => {
        piloto2.innerHTML = "";
        piloto2.appendChild(btnLimpar2);
    };
    piloto2.appendChild(btnLimpar2);

    card.appendChild(piloto2);
    container.appendChild(card);
}

async function buscarPiloto(nome) {
    const url = `https://api-formula-1.p.rapidapi.com/drivers?search=${nome}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '9bd4480d30msh303ccd63e416d40p156124jsn0edbfc0c9806',
            'x-rapidapi-host': 'api-formula-1.p.rapidapi.com'
        }
    };

    try {
        const resposta = await fetch(url, options);
        if (resposta.status === 404 || resposta.status !== 200) {
            throw new Error("Piloto não encontrado ou erro desconhecido.");
        }

        const dados = await resposta.json();
        return {
            imageSrc: dados.response[0]?.image,
            nome: dados.response[0]?.name,
            id: dados.response[0]?.id,
            vitorias: dados.response[0]?.wins || 0,
            corridas: dados.response[0]?.races || 0
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