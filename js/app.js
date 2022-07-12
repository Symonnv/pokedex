const fetchPokemon = () => {
  const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

  const pokemonPromises = []

  for (let i = 1; i <= 42; i++) {
    pokemonPromises.push(
      fetch(getPokemonUrl(i)).then(response => response.json())
    )
  }

  Promise.all(pokemonPromises).then(pokemons => {
    const pokemonsList = pokemons.reduce((accumutator, pokemon) => {
      const types = pokemon.types.map(typeInfo => typeInfo.type.name)
      const hp = pokemon.stats[0].base_stat
      const atk = pokemon.stats[1].base_stat
      const def = pokemon.stats[2].base_stat

      accumutator += `
      <li class="card ${types[0]}">
        <header>
          <h2 class="card-title">${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(" | ")}</p>
        </header>
        <img class="card-image" alt="${
          pokemon.name
        }" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png"/>
        <div class="card-information">
          <p>HP ${hp}</p>
          <div class="other">
            <p>ATK ${atk}</p>
            <p>DEF ${def}</p>
          </div>
        </div>
      </li>`

      return accumutator
    }, "")

    const ul = document.querySelector("[data-js='pokedex']")

    ul.innerHTML = pokemonsList
  })
}

fetchPokemon()
