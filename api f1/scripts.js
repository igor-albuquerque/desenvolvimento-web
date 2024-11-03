function criaCard(dados) {
  const container = document.getElementById("container");

  const card = document.createElement("div");
  card.classList.add("card");

  const foto = document.createElement("img");
  const nome = document.createElement("p");
  const id1 = document.createElement("p");
  const vitoria = document.createElement("p");
  const campeonato = document.createElement("p");

  
  foto.src = dados.imageSrc;
  nome.textContent = `Nome: ${dados.nome}`;
  id.textContent = `ID: ${dados.id1}`;
  id.textContent = `ID: ${dados.vitorias}`;
  id.textContent = `ID: ${dados.campeonatos}`;
  card.appendChild(foto);
  card.appendChild(nome);
  card.appendChild(id1);
  card.appendChild(vitorias);
  card.appendChild(campeonatos);

  container.appendChild(card);
}

async function buscapiloto() {
  const input = document.getElementById("piloto_nome");
  if (!input) {
    console.log("Elemento 'piloto_nome' não encontrado.");
    return;
  }

  const nome = input.value.toLowerCase();
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block"; 

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
    if (resposta.status === 404) {
      throw new Error("Piloto não encontrado.");
    }
    if (resposta.status !== 200) {
      throw new Error("Erro desconhecido.");
    }

    const dados = await resposta.json();
    console.log(dados);
    
    const dadosUteis = {
      imageSrc: dados.response[0]?.image, 
      nome: dados.response[0]?.name,
      id1: dados.response[0]?.id,
      vitorias:dados.response[0]?.podiums,
      campeonatos:dados.response[0]?.world_championships
    };
    criaCard(dadosUteis);
  } catch (error) {
    console.error("Erro ao buscar piloto:", error);
  } finally {
    spinner.style.display = "none"; 
    input.value = ""; 
  }
}


const btnBuscar = document.getElementById("buscar_piloto");
if (btnBuscar) {
  btnBuscar.addEventListener("click", buscapiloto);
}

const inputNome = document.getElementById("piloto_nome");
if (inputNome) {
  inputNome.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      evento.preventDefault();
      buscapiloto();
    }
  });
}

const btnLimpar = document.getElementById("limpar-card");
if (btnLimpar) {
  btnLimpar.addEventListener("click", () => {
    const container = document.getElementById("container");
    container.innerHTML = ""; 
  });
}
