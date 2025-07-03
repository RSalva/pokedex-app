import { useEffect, useState } from "react";
import { Pagination, PokemonList, Search } from "../components/pokemon";
import { getPokemonListData, listPokemon } from "../services/poke-api";

function HomePage({ pokemonsByPage = 20 }) {
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const totalPokemons = 1300;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const currentPokemons = await listPokemon(
          page * pokemonsByPage,
          pokemonsByPage, 
          search
        );
        console.debug("Current 20 pokemons:", currentPokemons);
        const pokemonList = await getPokemonListData(currentPokemons);
        setCurrentPokemonList(pokemonList);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemons();
  }, [pokemonsByPage, page, search]);

  const pokemonList = currentPokemonList.filter((p) => p.name.includes(search));

  const handleSearch = (search) => {
    setSearch(search);
  };

  const handlePageChange = (page) => {
    console.debug();
    if (page <= 0) {
      console.debug("Page is <= 0 -->", page);
      setPage(0);
    } else if (page >= totalPokemons / pokemonsByPage) {
      console.debug("Page is last one -->", page);
      setPage(totalPokemons / pokemonsByPage);
    } else {
      setPage(page);
    }
  };

  return (
    <div className="container">
      <Search search={search} onSearch={handleSearch} />
      <div className="pokemon-list-wrapper">
        <PokemonList pokemonList={pokemonList} isLoading={isLoading} />
      </div>
      <div className="d-flex justify-content-center mt-3">
        {!search && <Pagination onPageChange={handlePageChange} page={page} />}
      </div>
    </div>
  );
}

export default HomePage;
