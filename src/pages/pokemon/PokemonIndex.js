import Index from './Index';
import { Helmet } from 'react-helmet-async';

const dummyData = [
  {
    'id': 1,
    'name': 'bulbasaur',
    'species': {
      'color': {
        'name': 'green',
      },
    },
  },
  {
    'id': 2,
    'name': 'ivysaur',
  },
  {
    'id': 3,
    'name': 'venusaur',
  },
  {
    'id': 4,
    'name': 'charmander',
  },
  {
    'id': 5,
    'name': 'charmeleon',
  },
  {
    'id': 6,
    'name': 'charizard',
  },
  {
    'id': 7,
    'name': 'squirtle',
  },
  {
    'id': 8,
    'name': 'wartortle',
  },
  {
    'id': 9,
    'name': 'blastoise',
  },
  {
    'id': 10,
    'name': 'caterpie',
  },
  {
    'id': 11,
    'name': 'metapod',
  },
  {
    'id': 12,
    'name': 'butterfree',
  },
  {
    'id': 13,
    'name': 'weedle',
  },
  {
    'id': 14,
    'name': 'kakuna',
  },
  {
    'id': 15,
    'name': 'beedrill',
  },
  {
    'id': 16,
    'name': 'pidgey',
  },
  {
    'id': 17,
    'name': 'pidgeotto',
  },
  {
    'id': 18,
    'name': 'pidgeot',
  },
  {
    'id': 19,
    'name': 'rattata',
  },
  {
    'id': 20,
    'name': 'raticate',
  },
];

function PokemonIndex () {
  return (
    <>
      <Helmet>
        <title>Pokedex | Pokemon</title>
      </Helmet>
      <Index data={dummyData}/>
    </>
  );
}

export default PokemonIndex;
