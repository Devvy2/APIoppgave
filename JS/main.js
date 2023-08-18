//  Define a function called fetchPokemon.
//  then define the URL to fetch data about a Pokémon with ID 1 from the PokeAPI.
//  and then initialize the a network fetch using the fetch API from URL.
//  Then parse the response received from API and parse it JSON.
//  After parsing the JSON data, creates a array called "Pokemon" and store the data fetched into the pokemon array

const fetchPokemon = async () => {
  try {
    const container = document.getElementById("pokemonContainer");

    for (let i = 1; i <= 20; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const res = await fetch(url);
      const data = await res.json();

      renderPokemon(container, data);
    }
  } catch (error) {
    console.error("error fetching pokemon data", error);
  }
};

async function renderPokemon(container, data) {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon-card";

  const imageElement = document.createElement("img");
  imageElement.src = data.sprites.other["official-artwork"].front_default;
  imageElement.alt = `Image of ${data.name}`;

  const nameElement = document.createElement("p");
  nameElement.textContent = `Name: ${
    data.name.charAt(0).toUpperCase() + data.name.slice(1)
  }`;

  const idElement = document.createElement("p");
  idElement.textContent = `ID: ${data.id}`;

  const typeElement = document.createElement("p");
  typeElement.textContent = `Type: ${data.types
    .map((type) => type.type.name)
    .join(", ")}`;

  pokemonDiv.appendChild(imageElement);
  pokemonDiv.appendChild(nameElement);
  pokemonDiv.appendChild(idElement);
  pokemonDiv.appendChild(typeElement);

  console.log(typeElement);

  container.appendChild(pokemonDiv);
}

fetchPokemon();
