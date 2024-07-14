const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const sprite = document.getElementById('sprite');

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Function to fetch Pokémon data from API
async function fetchPokemonData(pokemon) {
  const response = await fetch(`${apiUrl}${pokemon}`);
  if (!response.ok) {
    throw new Error('Pokémon not found');
  }
  return response.json();
}

// Function to display Pokémon data
function displayPokemonData(data) {
  pokemonName.textContent = data.name.toUpperCase();
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;

  // Clear previous types
  types.innerHTML = '';

  // Add types to types element
  data.types.forEach((type) => {
    const typeElement = document.createElement('span');
    typeElement.textContent = type.type.name.toUpperCase();
    types.appendChild(typeElement);
  });

  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;

  sprite.src = data.sprites.front_default;
}

// Event listener for search button click
searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();

  try {
    const pokemonData = await fetchPokemonData(searchTerm);

    // Display Pokémon data on the UI
    displayPokemonData(pokemonData);
  } catch (error) {
    /* eslint-disable no-alert */
    alert('Pokémon not found. Please check the spelling or try another Pokémon.');
  }
});
