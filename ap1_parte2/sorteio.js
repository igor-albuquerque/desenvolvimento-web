function pokemon(data) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon ${data} não encontrado`);
            }
            return response.json();
        })
        .then(data => {
            const pokeresp = {
                nome: data.name,
                id: data.id,
                height: data.height,
                weight: data.weight,
                stats: {
                    hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
                    attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
                    defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
                    speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
                },
                type: data.types.map(tipo => tipo.type.name),
                moves: data.moves.map(movi => movi.move.name),
                abilities: data.abilities.map(hab => hab.ability.name),
                forms: data.forms.map(forma => forma.name),
            };
            return pokeresp;
        })
        .catch(error => {
           
            return { error: error.message };
        });
}

function fetchAndOrderby(names, atributo) {
    const promises = names.map(name => pokemon(name)); 

    Promise.all(promises).then(listapoke => {
        const listaok = listapoke.filter(pokemon => !pokemon.error); 
        const erros = listapoke.filter(pokemon => pokemon.error); 

        listaok.sort((a, b) => b.stats[atributo] - a.stats[atributo]);

        console.log('Segue a lista:', listaok);
        if (erros.length > 0) {
            console.error('Erros encontrados:');
            erros.forEach(err => console.error(err.error)); 
        }
    });
}

const nomes = ['snorlax', 'pikachu', 'charmander'];
fetchAndOrderby(nomes, 'attack');
