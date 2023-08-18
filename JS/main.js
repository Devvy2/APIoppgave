//  Define a function called fetchPokemon.
//  then define the URL to fetch data about a Pokémon with ID 1 from the PokeAPI.
//  and then initialize the a network fetch using the fetch API from URL.
//  Then parse the response received from API and parse it JSON.
//  After parsing the JSON data, creates a array called "Pokemon" and store the data fetched into the pokemon array

const fetchPokemon = () => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const pokemon = [];
      pokemon[`name`] = data.name;
      pokemon[`id`] = data.id;
      pokemon[`image`] = data.sprites[`front_default`];
      console.log(pokemon);
    });
};

fetchPokemon();
