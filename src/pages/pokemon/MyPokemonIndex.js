import Index from './Index';

const dummyData = [
  {
    'id': 1,
    'name': 'bulbasaur',
    'nickname': 'Joni',
  },
  {
    'id': 2,
    'name': 'ivysaur',
    'nickname': 'Jono',
  },
  {
    'id': 1,
    'name': 'bulbasaur',
    'nickname': 'Bambang',
  },
  {
    'id': 2,
    'name': 'ivysaur',
    'nickname': 'Samsul',
  },
  {
    'id': 1,
    'name': 'bulbasaur',
    'nickname': 'Samuel',
  },
  {
    'id': 2,
    'name': 'ivysaur',
    'nickname': 'Sontoloyo',
  },
];

function MyPokemonIndex () {
  return (
    <Index data={dummyData}/>
  );
}

export default MyPokemonIndex;
