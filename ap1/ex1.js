//igor Cavalcante 2300718 e felipe vilaça 2301771

const salario = 0;
var imposto = 0;


function calculo(salario) {
    if (salario<1412) {
        imposto = 0 ;
        return imposto;
    }
    else if ((salario>1412.12)&&(salario<2666.68)){
        imposto=((salario*0.09)-21.18);
    }
    else if ((salario>2666.69)&&(salario<4000.03)){
        imposto=((salario*0.12)-101.18);
    }
    else if ((salario>4000.04)&&(salario<7786.02)){
        imposto=((salario*0.14)-181.18);
    }
    else{
        imposto=((salario*0.14)-181.18);
    }
    return imposto




}


console.log(calculo(1400));
console.log(calculo(2500));
console.log(calculo(3000));
console.log(calculo(5000));
console.log(calculo(10000));



// ex2
const entrada = [ 
    {idade: 32, bloqueado: false}, 
    {idade: 27, bloqueado: true},
    {idade: 29, bloqueado: false}
 ]
 
resposta=[]
function filtraidade(usuarios,min,max){
    for(const usuario of usuarios ){
        if ((usuario.idade>=min)&&(usuario.idade<=max)){
            if(usuario.bloqueado===false){
                resposta.push(usuario);}}}
    return resposta;
}


console.log(filtraidade(entrada,25,35))

function geracupom(produtos){
    var totalitem=0;
    var totalcompra = 0;
    const cupom=[];
    for (const produto of produtos){
        const valortotal = produto.valor*produto.qtd;
        cupom.push(`${produto.qtd} x ${produto.descricao} : R$: ${valortotal}`);
        totalcompra += valortotal;
        totalitem += produto.qtd;
    }
    cupom.push(`itens: ${totalitem}`)
    cupom.push(`total: R$ ${totalcompra}`)
    return cupom
}
const lista =
[
{descricao: "Tomate cereja", valor: 7.99, qtd: 1.5},
{descricao: "Azeite", valor: 59.99, qtd: 2},
{descricao: "Orégano", valor: 4.5, qtd: 1} 
];

console.log(geracupom(lista));