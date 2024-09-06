const p = document.getElementById("par");
p.innerText = "Troquei o texto do parágrafo";

const p2 = document.getElementById("p2");

p2.onclick = () => {
  console.log("clicou em p2");
};

p2.addEventListener("click", () => console.log("evento do listener 1"));
p2.addEventListener("click", () => console.log("evento do listener 2"));
p2.addEventListener("click", () => console.log("evento do listener 3"));
p2.addEventListener("click", () => console.log("evento do listener 4"));

p2.addEventListener("dblclick", () => alert("segundo alerta!!!"));
