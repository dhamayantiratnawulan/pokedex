
export class PokemonModel {
    results: any;
    types: any;
    count: number;
    color: DetailPokemon;
    gender_rate: number;
    chain
}

export class DetailPokemon {
    name: string;
    url: string;
}

export class EvolutionModel {
    evolution_details: any;
    evolves_to: any;
    species: DetailPokemon;
}

