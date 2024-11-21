import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemons } from "../api/fetchPokemons";
import Footer from "../components/footer";
import Header from "../components/header";

import { Pokemon } from "../types/types.d";
import styles from "./pokemons.module.css";
import LoadingScreen from "../components/loadingScreen";
import { waitFor } from "../utils/utils";

const Pokemons = () => {
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllPokemons = async () => {
      setIsLoading(true);
      await waitFor(1000);
      const allPokemons = await fetchPokemons();
      setPokemons(allPokemons);
      setIsLoading(false);
    };
    fetchAllPokemons();
  }, []);

  const filteredPokemons = pokemons?.slice(0, 151).filter((pokemon) => {
    return pokemon.name.toLowerCase().match(query.toLowerCase());
  });

  if (isLoading || !pokemons) {
    return <LoadingScreen/>;
  }

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className={styles.mainContainer}>
        <div className={styles.pokemonGrid}>
          {filteredPokemons?.slice(0, 151).map((pokemon) => (
            <Link
              key={pokemon.id}
              className={styles.pokemonCard}
              to={`/pokemons/${pokemon.name.toLowerCase()}`}
            >
              <div className={styles.pokemonCardContent}>
                <img
                  className={styles.pokemonIcon}
                  src={pokemon.imgSrc}
                  alt={pokemon.name}
                />
                <div className={styles.pokemonInfo}>
                  <span className={styles.pokemonName}>{pokemon.name}</span>
                  <span className={styles.pokemonId}>#{pokemon.id}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pokemons;