/** @jsxImportSource @emotion/react */
import { keyframes, css } from '@emotion/react';
import BaseModal from '../BaseModal';
import { Flex } from '../FlexGrid';
import Image from '../Image';
import { Button } from '../Buttons';
import { margin, textAlign } from '../utilities';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../../redux/my-pokemons/my-pokemons.reducer';

const pokeballFly = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(25deg);
  }
  40% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const pokeball = css`
  animation: ${pokeballFly} 1s;
  animation-iteration-count: infinite;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const pikachuShake = keyframes`
  0% {
    left: 0;
    right: 100%;
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    right: 0;
    transform: rotate(0deg);
  }
`;

const pikachu = css`
  position: absolute;
  top: 0;
  animation: ${pikachuShake} 1s;
  animation-iteration-count: infinite;
`;

const animationContainer = css`
  width: 80%;
  height: 64px;
  position: relative;
`;

function ReleaseConfirmModal ({ pokemon, onClose }) {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deletePokemon(pokemon.nickname_id));
    onClose();
  };
  if (pokemon) {
    return (
      <BaseModal>
        <Flex justifyContent="start" alignItems="center" css={animationContainer}>
          <Image
            png="/assets/img/png/pokeball-release-64.png"
            webp="/assets/img/webp/pokeball-release-64.webp"
            alt="Pokeball"
            lazy
            width={64}
            height={64}
            css={pokeball}
          />
          <Image
            png="/assets/img/png/pikachu-64.png"
            webp="/assets/img/webp/pikachu-64.webp"
            alt="Pokemon"
            lazy
            width={56}
            height={56}
            css={pikachu}
          />
        </Flex>
        <h2 css={textAlign.center}>Are you sure to release {pokemon.nickname}?</h2>
        <div>
          <Button onClick={onClose} variant="outline" css={margin.r2}>Noooo</Button>
          <Button onClick={handleDeleteClick}>Yes</Button>
        </div>
      </BaseModal>
    );
  }
  return null;
}

export default ReleaseConfirmModal;
