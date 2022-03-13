/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import { css } from '@emotion/react';
import { width } from '../../components/utilities';
import { Flex } from '../../components/FlexGrid';
import { useCallback, useEffect } from 'react';
import mediaQueries from '../../components/media-queries';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetail } from '../../redux/pokemons/pokemons.actions';
import { selectPokemonDetail, selectLoading, selectError } from '../../redux/pokemons/pokemons.selectors';
import Loading from '../../components/Loading';
import ErrorPage from '../errors/ErrorPage';
import CatchButton from '../../components/pokemon/CatchButton';
import { catchPokemon } from '../../redux/my-pokemons/my-pokemons.actions';
import CatchModals from '../../components/pokemon/CatchModals';
import {
  selectCatchFailed,
  selectCatchLoading,
  selectCaughtPokemon,
} from '../../redux/my-pokemons/my-pokemons.selectors';
import MoveTypes from './detail-parts/MoveTypes';
import Moves from './detail-parts/Moves';
import BaseStats from './detail-parts/BaseStats';
import Informations from './detail-parts/Informations';
import Main from './detail-parts/Main';
import MyPokemon from './detail-parts/MyPokemon';

export const catchButtonStyle = css`
  position: fixed;
  bottom: 5rem;
  right: 1rem;

  ${mediaQueries.lg} {
    right: 5rem;
  }
`;

const longMargin = css`margin-bottom: 8rem`;

function PokemonDetail () {
  const dispatch = useDispatch();
  const { name } = useParams();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const catchLoading = useSelector(selectCatchLoading);
  const catchFailed = useSelector(selectCatchFailed);
  const caughtPokemon = useSelector(selectCaughtPokemon);

  const dispatchGetDetail = useCallback(() => {
    dispatch(getPokemonDetail(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatchGetDetail();
  }, [dispatchGetDetail]);

  const detail = useSelector(selectPokemonDetail);

  const handleCatchClick = () => {
    if (detail) {
      let pokemonToCatch = {
        id: detail.id,
        name: detail.name,
      };

      if (detail.species?.color) {
        pokemonToCatch.species = {
          color: {
            name: detail.species.color.name,
          },
        };
      }

      dispatch(catchPokemon(pokemonToCatch));
    }
  };

  if (name && error) {
    return <ErrorPage code={404} message="Whoops, Pokemon Not Found."/>;
  }

  if (!loading && detail) {
    return (
      <>
        <Helmet>
          <title>{detail.name} | Pokemon</title>
        </Helmet>

        <PageHeader>{detail.name}</PageHeader>

        <Flex column css={[width.full, longMargin]}>
          <Main detail={detail}/>

          <MyPokemon pokemonId={detail.id}/>

          <Informations detail={detail}/>

          <BaseStats detail={detail}/>

          <Moves moves={detail.moves}/>

          {detail.moves.some(move => !!move.move.class) ? (
            <MoveTypes/>
          ) : null}
        </Flex>
        <CatchButton css={catchButtonStyle} onClick={handleCatchClick}/>
        <CatchModals loading={catchLoading} failed={catchFailed} pokemon={caughtPokemon}/>
      </>
    );
  }
  return <Loading/>;
}

export default PokemonDetail;
