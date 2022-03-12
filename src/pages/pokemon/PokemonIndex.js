import Index from './Index';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { getAllPokemons } from '../../redux/pokemons/pokemons.actions';
import { selectPokemonData, selectLoading, selectCurrentOffset } from '../../redux/pokemons/pokemons.selectors';

function PokemonIndex () {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const currentOffset = useSelector(selectCurrentOffset);
  const [pageOffset, setPageOffset] = useState(0);
  const [latestScrollHeight, setLatestScrollHeight] = useState(0);

  const dispatchGetAll = useCallback(() => {
    dispatch(getAllPokemons({
      limit: 20,
      offset: pageOffset,
    }));
  }, [dispatch, pageOffset]);

  useEffect(() => {
    dispatchGetAll();
  }, [dispatchGetAll]);

  useEffect(() => {
    let allowRun = true;
    const main = document.querySelector('main');

    main.onscroll = debounce((event) => {
      if (allowRun) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = event.target;

        if (clientHeight + scrollTop >= scrollHeight - 10 && scrollHeight > latestScrollHeight && !loading) {
          setLatestScrollHeight(scrollHeight);
          setPageOffset(pageOffset + 20);
        }
      }
    }, 100);

    return () => {
      allowRun = false;
    };
  }, [pageOffset, latestScrollHeight, loading]);

  useEffect(() => {
    if (currentOffset > 0 && pageOffset === 0) {
      setPageOffset(currentOffset);
    }
  }, [currentOffset, pageOffset]);

  const data = useSelector(selectPokemonData);

  return (
    <>
      <Helmet>
        <title>Pokedex | Pokemon</title>
      </Helmet>
      <Index data={data} loading={loading}/>
    </>
  );
}

export default PokemonIndex;
