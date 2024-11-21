import { Link } from "react-router-dom";
import styles from './footer.module.css';
//Assets
import PokemonPic from '../assets/pikachu.png';
import LocationPic from '../assets/pointer.png';
import ItemsPic from '../assets/pokeball.png';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Link className={styles.footerLink} to="/pokemons">
                <img className={styles.footerIcon} src={PokemonPic} alt="pokeball" />
                Pokemons
            </Link>
            <Link 
            onClick={() => alert("This page is under construction")}
            className={styles.footerLink} 
            to="/items">
                <img className={styles.footerIcon} src={ItemsPic} alt="pokeball" />
                Items
            </Link>
            <Link 
            onClick={() => alert("This page is under construction")}
            className={styles.footerLink} 
            to="/location">
                <img className={styles.footerIcon} src={LocationPic} alt="pokeball" />
                Mapa
            </Link>
            
        </footer>
    )
}

export default Footer;