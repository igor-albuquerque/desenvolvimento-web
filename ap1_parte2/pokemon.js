function pokemon(data){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
     .then(response=>{
        if (!response.ok){
            throw new Error(`pokemon ${data} nao encontrado`)
        }
        return response.json();
     })
     .then(data =>{
        const pokeresp ={
            nome: data.name,
            id:data.id,
            height:data.height,
            weight:data.weight,
            stats: {
               hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
               attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
               defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
               speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
            
            },
            type: data.types.map (tipo => tipo.type.name),
            moves: data.moves.map(movi=>movi.move.name),
            abilities:data.abilities.map(hab=>hab.ability.name),
            forms:data.forms.map(forma=>forma.name),
        };
        return pokeresp
     })
     .catch(error => {
        console.error('erro ao procurar',error);
     })
    }


    pokemon(23).then(poke => console.log(poke));




