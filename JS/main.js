const searchInput = document.querySelector("#search-pokemon");
const container = document.getElementById("pokemonContainer");
let allPokemonData = [];

const fetchPokemon = async () => {
  try {
    for (let i = 1; i <= 20; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const res = await fetch(url);
      const data = await res.json();

      renderPokemon(container, data);

      allPokemonData.push(data);
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

  const pokemonDetails = document.createElement("button");
  pokemonDetails.textContent = "Click for details";

  pokemonDetails.addEventListener("click", () => {
    showPokemonDetailsModal(data);
  });

  pokemonDiv.appendChild(imageElement);
  pokemonDiv.appendChild(nameElement);
  pokemonDiv.appendChild(idElement);
  pokemonDiv.appendChild(typeElement);
  pokemonDiv.appendChild(pokemonDetails);
  container.appendChild(pokemonDiv);
}

function showPokemonDetailsModal(data) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const closeModalButton = document.createElement("button");
  closeModalButton.textContent = "Close";
  closeModalButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.body.removeChild(modal);
    }
  });

  const detailsElement = document.createElement("div");
  detailsElement.className = "pokemon-details";

  detailsElement.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
      
        <img src="${
          data.sprites.other["official-artwork"].front_default
        }" alt="Image of ${data.name}">
      
        <p id="pokemon-id">ID: ${data.id}</p>
        
        <p id="pokemon-hp">HP: ${
          data.stats.find((stat) => stat.stat.name === "hp").base_stat
        }</p>

        <p id="pokemon-attack">Attack: ${
          data.stats.find((stat) => stat.stat.name === "attack").base_stat
        }</p>
      
        <p id="pokemon-special-attack">Special-attack: ${
          data.stats.find((stat) => stat.stat.name === "special-attack")
            .base_stat
        }</p>

        <p id="pokemon-defense">Defense: ${
          data.stats.find((stat) => stat.stat.name === "defense").base_stat
        }</p>
        
        <p id="pokemon-special-defense">Special-defense: ${
          data.stats.find((stat) => stat.stat.name === "special-defense")
            .base_stat
        }</p>

        <p id="pokemon-speed">Speed: ${
          data.stats.find((stat) => stat.stat.name === "speed").base_stat
        }</p>

        <p>Type: ${data.types.map((type) => type.type.name).join(", ")}</p>
        `;

  detailsElement.appendChild(closeModalButton);
  modal.appendChild(detailsElement);

  document.body.appendChild(modal);
}

fetchPokemon();

function searchPokemon(query, container) {
  const filteredPokemon = allPokemonData.filter((pokemon) =>
    pokemon.name.includes(query.toLowerCase())
  );
  renderFilteredPokemon(filteredPokemon, container);
}

function renderFilteredPokemon(filteredPokemon, container) {
  container.innerHTML = "";

  filteredPokemon.forEach((pokemon) => {
    renderPokemon(container, pokemon);
  });
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();
  if (query) {
    searchPokemon(query, container);
  } else {
    renderFilteredPokemon(allPokemonData, container);
  }
});
