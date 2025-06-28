import { PokemonCard, PokemonList } from "./components/pokemon/index.js";
import { useEffect, useState } from "react";
import { listPokemon } from "./services/poke-api.js";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [offSet, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    async function fetchPokemons() {
      const pokemon = await listPokemon(offSet, limit, setIsLoading);
      setPokemonList(pokemon);
    }
    
    fetchPokemons();
  }, [offSet, limit]);

  console.log(pokemonList);
  return (
    <div className="pokemon-list-wrapper">
      <PokemonList pokemonList={pokemonList} isLoading={isLoading} />
    </div>
  );
}

export default App;
