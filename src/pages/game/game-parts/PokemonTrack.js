/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '../../../components/Buttons';
import Image from '../../../components/Image';
import { useEffect, useRef, useState } from 'react';
import { padding } from '../../../components/utilities';

const gameRail = css`
  margin: 0 -30px 0 -110px;
`;

const pokemonButton = (duration) => css`
  transition: all linear ${duration}ms;
  margin-left: 0%;
  ${padding.a0}
`;

function PokemonTrack ({ pokemonList, fromRight, onClick }) {
  const [index, setIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const rail = useRef();

  useEffect(() => {
    if (fromRight) {
      const pokeButton = rail.current.querySelector('button');
      pokeButton.style.marginLeft = '100%';
    }
  }, [fromRight]);

  useEffect(() => {
    let timeout = null;
    if (pokemonList.length) {
      const railWidth = rail.current.clientWidth;
      const pokeButton = rail.current.querySelector('button');
      setDuration(5000 * railWidth / 640);

      if (duration) {
        pokeButton.style.marginLeft = pokeButton.style.marginLeft === '100%' ? '0%' : '100%';
        timeout = setTimeout(() => {
          if (index < 4) {
            setIndex(index + 1);
          } else {
            setIndex(0);
          }
        }, duration);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [pokemonList, index, duration]);

  return (
    <div ref={rail} css={gameRail} data-testid="pokemon-track">
      <Button
        variant="link"
        css={pokemonButton(duration)}
        onClick={() => onClick({ ...pokemonList[index] })}
      >
        <Image
          src={`${process.env.REACT_APP_DREAM_WORLD_URL}${pokemonList[index].id}.svg`}
          alt={pokemonList[index].name}
          lazy
          width={80}
          height={80}
        />
      </Button>
    </div>
  );
}

export default PokemonTrack;
