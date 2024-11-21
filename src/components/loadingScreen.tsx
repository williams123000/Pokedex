import Poedex from "../assets/pokedex.png";
import styles from "./loadingScreen.module.css";

const LoadingScreen = () => {
    return (
        <div className={styles.loadingScreen}>
            <img className={styles.loadingScreenIcon} src={Poedex} alt="pokedex" />
        </div>
    );
    }

export default LoadingScreen;