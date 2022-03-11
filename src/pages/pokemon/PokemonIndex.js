import Index from './Index';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getAllPokemons } from '../../redux/pokemons/pokemons.actions';
import { selectPokemonData } from '../../redux/pokemons/pokemons.selectors';

function PokemonIndex () {
  const dispatch = useDispatch();

  const dispatchGetAll = useCallback(() => {
    dispatch(getAllPokemons({
      limit: 20,
      offset: 0,
    }));
  }, [dispatch]);

  useEffect(() => {
    dispatchGetAll();
  }, [dispatchGetAll]);

  const data = useSelector(selectPokemonData);

  return (
    <>
      <Helmet>
        <title>Pokedex | Pokemon</title>
      </Helmet>
      <Index data={data}/>
    </>
  );
}

export default PokemonIndex;
