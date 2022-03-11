import Index from './Index';
import { Helmet } from 'react-helmet-async';

const dummyData = [
  {
    'id': 1,
    'nickname_id': 1,
    'name': 'bulbasaur',
    'nickname': 'Joni',
  },
  {
    'id': 2,
    'nickname_id': 2,
    'name': 'ivysaur',
    'nickname': 'Jono',
  },
  {
    'id': 1,
    'nickname_id': 3,
    'name': 'bulbasaur',
    'nickname': 'Bambang',
  },
  {
    'id': 2,
    'nickname_id': 4,
    'name': 'ivysaur',
    'nickname': 'Samsul',
  },
  {
    'id': 1,
    'nickname_id': 5,
    'name': 'bulbasaur',
    'nickname': 'Samuel',
  },
  {
    'id': 2,
    'nickname_id': 6,
    'name': 'ivysaur',
    'nickname': 'Sontoloyo',
  },
];

function MyPokemonIndex () {
  return (
    <>
      <Helmet>
        <title>My Pokemon | Pokemon</title>
      </Helmet>
      <Index data={dummyData}/>
    </>
  );
}

export default MyPokemonIndex;
