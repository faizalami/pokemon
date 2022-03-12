/** @jsxImportSource @emotion/react */
import BaseModal from '../BaseModal';
import { css, keyframes } from '@emotion/react';
import { Flex } from '../FlexGrid';
import Image from '../Image';

const pokeballFly = keyframes`
  from {
    left: 0;
    right: 100%;
    transform: rotate(0deg);
  }
  to {
    right: 0;
    transform: rotate(359deg);
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
    transform: rotate(5deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const pikachu = css`
  animation: ${pikachuShake} 1s;
  animation-iteration-count: infinite;
`;

const animationContainer = css`
  width: 80%;
  height: 64px;
  position: relative;
`;

function CatchingModal () {
  return (
    <BaseModal>
      <Flex justifyContent="space-between" alignItems="center" css={animationContainer}>
        <Image
          png="/assets/img/png/pokeball-64.png"
          webp="/assets/img/webp/pokeball-64.webp"
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
      <h2>Catching Pokemon . . .</h2>
    </BaseModal>
  );
}

export default CatchingModal;
