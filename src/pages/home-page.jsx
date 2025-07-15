import { useEffect, useRef, useState } from "react";
import { Pagination, PokemonList, Search } from "../components/pokemon";
import { getPokemonListData, listPokemon } from "../services/poke-api";

function HomePage({ pokemonsByPage = 20 }) {
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const totalPokemons = 1300;

  const timeoutRef = useRef(null);

  // Pagination
  useEffect(() => {
    if (search === "") {
      async function fetchPokemons() {
        try {
          setIsLoading(true);
          const currentPokemons = await listPokemon(
            page * pokemonsByPage,
            pokemonsByPage, 
            ""
          );
          const pokemonList = await getPokemonListData(currentPokemons);
          setCurrentPokemonList(pokemonList);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchPokemons();
    }
  }, [pokemonsByPage, page, search]);

  // Search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (search !== "") {
      timeoutRef.current = setTimeout(() => {
        async function fetchSearchedPokemons() {
          setIsLoading(true);
          try {
            const currentPokemons = await listPokemon(
              page * pokemonsByPage,
              pokemonsByPage, 
              search
            );
            console.debug("Current X pokemons:", currentPokemons);
            const pokemonList = await getPokemonListData(currentPokemons);
            setCurrentPokemonList(pokemonList);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }
        fetchSearchedPokemons();
      }, 2000);
    } 
    
  }, [search]);

  //const pokemonList = currentPokemonList.filter((p) => p.name.includes(search));

  const handleSearch = (search) => {
    setSearch(search);
  };

  const handlePageChange = (page) => {
    console.debug();
    if (page <= 0) {
      setPage(0);
    } else if (page >= totalPokemons / pokemonsByPage) {
      setPage(totalPokemons / pokemonsByPage);
    } else {
      setPage(page);
    }
  };

  return (
    <div className="container">
      <Search search={search} onSearch={handleSearch} />
      <div className="pokemon-list-wrapper">
        <PokemonList pokemonList={currentPokemonList} isLoading={isLoading} />
      </div>
      <div className="d-flex justify-content-center mt-3">
        {!search && <Pagination onPageChange={handlePageChange} page={page} />}
      </div>
    </div>
  );
}

export default HomePage;
