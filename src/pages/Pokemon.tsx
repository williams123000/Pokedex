import { useNavigate, useParams } from "react-router-dom";
import pokeballSrc from "../assets/pokeball.png";
import Footer from "../components/footer";
import styles from "./pokemon.module.css";

import { PokemonDetails } from "../types/types";
import { useEffect, useState } from "react";
import { fetchPokemon } from "../api/fetchPokemon";
import LoadingScreen from "../components/loadingScreen";
import { waitFor } from "../utils/utils";

const Pokemon = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPokemon(){
      setIsLoading(true);
      await waitFor(300);
      const fetchedPokemon = await fetchPokemon(name as string);
      setPokemon(fetchedPokemon);
      setIsLoading(false);
    }
    getPokemon();
  }, [name]);

  if (isLoading || !pokemon) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.pokemonPage}>
      <button className={styles.pokeballButton} onClick={() => navigate(-1)}>
        <img className={styles.pokeballImg} src={pokeballSrc} alt="pokeball" />
        Go back
      </button>
      <div className={styles.pokemonDetailsContainer}>
        <div className={styles.pokemonCard}>
          <div className={styles.pokemonCardHeader}>
            <h1 className={styles.pokemonName}>{pokemon?.name?.toUpperCase()}</h1>
            <span className={styles.pokemonId}>Nr. {pokemon?.id}</span>
          </div>
          
          <div className={styles.pokemonImageContainer}>
            <img
              className={styles.pokemonImage}
              src={pokemon?.imgSrc}
              alt={pokemon?.name}
            />
          </div>
          
          <div className={styles.pokemonStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>HP</span>
              <div className={styles.statBar}>
                <div 
                  className={styles.statBarFill} 
                  style={{width: `${(pokemon?.hp || 0) / 2}%`}}
                >
                  {pokemon?.hp}
                </div>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Attack</span>
              <div className={styles.statBar}>
                <div 
                  className={styles.statBarFill} 
                  style={{width: `${(pokemon?.attack || 0) / 2}%`}}
                >
                  {pokemon?.attack}
                </div>
              </div>
            </div>
            
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Defense</span>
              <div className={styles.statBar}>
                <div 
                  className={styles.statBarFill} 
                  style={{width: `${(pokemon?.defense || 0) / 2}%`}}
                >
                  {pokemon?.defense}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pokemon;