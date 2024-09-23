function pokemoncor(nome) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`pokemon ${nome} nao encontrado`);
            }
            return response.json();  
        })
        .then(data => {
            const pokeprint = {
                nome: data.name,
                urlcor: data.species.url
            };
   
                fetch(pokeprint.urlcor)
                .then(response=>{
                    if (!response.ok){
                        throw new Error(`pokemon ${pokeprint.nome} nao encontrado`)
                    }
                    return response.json();
                
                })
                .then(data=>{
                    const cora={
                        cor: data.color.name
                    }
                    console.log(`nome:${pokeprint.nome} cor:${cora.cor}`)
                })
                     
                })
        
        .catch(error => {
            console.error('erro ao procurar', error); 
        });}


pokemoncor(23);  
