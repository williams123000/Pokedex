export type Pokemon = {
    name: string;
    id: number;
    imgSrc: string;
};


export type PokemonDetails = {
    name: string;
    id: string;
    imgSrc: string;
    hp: number;
    attack: number;
    defense:  number;

}

export type Item = {
    id: string;
    name: string;
    category: string;
    description: string;
    imgSrc: string;
    cost: number;
    attributes: string[];
  };