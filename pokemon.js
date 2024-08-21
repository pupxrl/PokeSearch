/*
This program fetches data from the Pokemon API based on the pokemon's name,
stores the result, and logs specific information such as,
the pokemon's name, weight, and abilities.
*/

// storing as an object to hold pokemon data
let pokemon = {};
// array for storing the abilities
let abilitiesArray = [];

// function to fetch a pokemon and some of its respective properties by its name
async function fetchPokemon(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);

    // check if the response status is OK
    if (!response.ok) {
      throw new Error(`Pokemon ${response.statusText}`);
    }

    // parse response to JSON
    const result = await response.json();
    
    // storing all of the result object into pokemon
    pokemon = result;

    // check if 'abilities' property exists
    if (!pokemon.abilities) {
      throw new Error('Abilities data is not available');
    }

    // map the abilities info into the array
    abilitiesArray = pokemon.abilities.map((abilities) => ({
      // inside the abilities array, there is an object called ability which contains name and url
      name: abilities.ability.name,
      url: abilities.ability.url,
      // inside the ability object, there are two properties: is_hidden (boolean) and slot (number)
      is_hidden: abilities.is_hidden,
      slot: abilities.slot,
    }));

    // logging name, weight, and abilities
    console.log(
      "name:\n" +
      pokemon.name + "\n" +
      "\nweight:\n" +
      pokemon.weight + "\n" +
      "\nabilities:"
    );
    console.log(abilitiesArray);
    
  } catch (error) {
    // logging error if any error occurs
    console.error("Error fetching Pokemon data:", error.message);
  }
}

// enter a pokemon's name for the name parameter
fetchPokemon("nig");
