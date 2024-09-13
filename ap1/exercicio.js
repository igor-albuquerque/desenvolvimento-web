const btn1 = document.getElementById("btn-1");
btn1.addEventListener("click",adicionalinha);
const btn3 = document.getElementById("btn-3");
btn3.addEventListener("click",apagaum);
const btn2 = document.getElementById("btn-2");
btn2.addEventListener("click",apagatodos);
function adicionalinha(){
  const linha = document.createElement("p")
  linha.innerText = "izi"
  const div=document.getElementById("grupo-de-linhas")
  div.appendChild(linha)
}
function apagaum(){
  const div = document.getElementById("grupo-de-linhas");

  const paragrafos = div.getElementsByTagName("p");

  paragrafos[paragrafos.length - 1].remove();
}

function apagatodos() {
  console.log("jao")
  const div = document.getElementById("grupo-de-linhas");
  div.innerHTML = "";
}
