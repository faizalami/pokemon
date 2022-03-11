import { gql } from '@apollo/client';

export const GET_ALL_POKEMONS = gql`
  query getAllPokemons ($limit: Int, $offset: Int) {
    pokemons: pokemon_v2_pokemon (limit: $limit, offset: $offset, distinct_on: id, order_by: {id: asc}) {
      id
      name
      species: pokemon_v2_pokemonspecy {
        color: pokemon_v2_pokemoncolor {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query getPokemonDetail ($name: String) {
    pokemon: pokemon_v2_pokemon(limit: 1, offset: 0, where: {name: {_eq: $name}}) {
      id
      name
      height
      weight
      species: pokemon_v2_pokemonspecy {
        name
        color: pokemon_v2_pokemoncolor {
          name
        }
        generation: pokemon_v2_generation {
          name
        }
        shape: pokemon_v2_pokemonshape {
          name
        }
        habitat: pokemon_v2_pokemonhabitat {
          name
        }
      }
      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      moves: pokemon_v2_pokemonmoves(distinct_on: move_id) {
        move: pokemon_v2_move {
          name
          class: pokemon_v2_movedamageclass {
            name
          }
        }
        move_id
      }
    }
  }
`;
