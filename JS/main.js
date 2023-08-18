//  Define a function called fetchPokemon.
//  then define the URL to fetch data about a Pokémon with ID 1 from the PokeAPI.
//  and then initialize the a network fetch using the fetch API from URL.
//  Then parse the response received from API and parse it JSON.
//  After parsing the JSON data, creates a array called "Pokemon" and store the data fetched into the pokemon array

const fetchPokemon = async () => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    const res = await fetch(url);
    const data = await res.json();

    const nameElement = document.getElementById("pokemonName");
    const idElement = document.getElementById("pokemonId");
    const imageElement = document.getElementById("pokemonImage");

    nameElement.textContent = `Name: ${data.name}`;
    idElement.textContent = `ID: ${data.id}`;
    imageElement.src = data.sprites.other["official-artwork"].front_default;
    console.log(imageElement);
    imageElement.alt = `Image of ${data.name}`;
  } catch (error) {
    console.error("error fetching pokemon data", error);
  }
};

console.log(fetchPokemon);
fetchPokemon();
