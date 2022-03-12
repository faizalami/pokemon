/** @jsxImportSource @emotion/react */
import BaseModal from '../BaseModal';
import Image from '../Image';
import { margin, padding, rounded, textAlign, width } from '../utilities';
import { Button } from '../Buttons';
import { Flex } from '../FlexGrid';
import { css } from '@emotion/react';
import { pokeBallDark } from '../variables';

const nameInput = css`
  font-size: 1rem;
  border: 1px solid ${pokeBallDark};
  ${rounded}
  ${width.full}
  ${padding.a2}
  ${margin.b2}
`;

function CatchSuccessModal ({ pokemon, onAdded }) {
  return (
    <BaseModal>
      <Image
        src={`${process.env.REACT_APP_DREAM_WORLD_URL}${pokemon.id}.svg`}
        alt={pokemon.name}
        lazy
        width={76}
        height={76}
      />
      <h2 css={textAlign.center}>Yay, We got {pokemon.name}, give it a name !</h2>

      <Flex as="form" lg={{ alignItems: 'center' }} column css={width.full}>
        <input type="text" name="name" aria-label="Pokemon Name" css={nameInput}/>
        <Button onClick={onAdded}>Save</Button>
      </Flex>
    </BaseModal>
  );
}

export default CatchSuccessModal;
