/** @jsxImportSource @emotion/react */
import CatchButton from '../../components/pokemon/CatchButton';
import { catchButtonStyle } from '../pokemon/Detail';
import { css } from '@emotion/react';
import { Flex } from '../../components/FlexGrid';
import { margin } from '../../components/utilities';
import { gray } from '../../components/variables';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../../redux/pokemons/pokemons.actions';
import { selectPokemonData } from '../../redux/pokemons/pokemons.selectors';
import PokemonTrack from './game-parts/PokemonTrack';
import Loading from '../../components/Loading';

const gameArena = css`
  background-color: ${gray};
  height: 100%;
  overflow: hidden;
  ${margin.a0}
`;

function GameIndex () {
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

  const shuffledData = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5);
  }, [data]);

  const splitShuffledData = useMemo(() => {
    let tempData = [];
    if (shuffledData.length) {
      for (let part = 0; part < 4; part += 1) {
        tempData = [
          ...tempData,
          shuffledData.slice(part * 5, (part + 1) * 5),
        ];
      }
    }
    return tempData;
  }, [shuffledData]);

  return (
    <>
      <Flex column container justifyContent="space-around" css={gameArena}>
        {!splitShuffledData.length ? <Loading/> : null}
        {splitShuffledData.map((pokemonList, listIndex) => (
          <PokemonTrack
            key={listIndex}
            fromRight={listIndex % 2}
            pokemonList={pokemonList}
          />
        ))}
        {/*{splitShuffledData.length ? (*/}
        {/*  <PokemonTrack*/}
        {/*    pokemonList={splitShuffledData[0]}*/}
        {/*    fromRight={true}*/}
        {/*  />*/}
        {/*) : null}*/}
      </Flex>
      <CatchButton css={catchButtonStyle}/>
    </>
  );
}

export default GameIndex;
