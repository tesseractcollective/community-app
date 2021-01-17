
export async function fetchPokemon() {
  const result = await fetch('https://pokeapi.co/api/v2/pokemon');
  if (result.ok) {
    return result.json();
  } 
  throw new Error('unable to fetch');
}

export async function fetchSinglePokemon(url: string) {
  const result = await fetch(url);
  if (result.ok) {
    return result.json();
  } 
  throw new Error('unable to fetch');
}