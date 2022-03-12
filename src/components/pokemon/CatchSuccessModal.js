/** @jsxImportSource @emotion/react */
import BaseModal from '../BaseModal';
import Image from '../Image';
import { margin, padding, rounded, textAlign, width } from '../utilities';
import { Button } from '../Buttons';
import { Flex } from '../FlexGrid';
import { css } from '@emotion/react';
import { pokeBallDark } from '../variables';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeCaughtPokemon } from '../../redux/my-pokemons/my-pokemons.reducer';
import { selectCatchError } from '../../redux/my-pokemons/my-pokemons.selectors';

const nameInput = css`
  font-size: 1rem;
  border: 1px solid ${pokeBallDark};
  ${rounded}
  ${width.full}
  ${padding.a2}
  ${margin.b2}
`;

function CatchSuccessModal ({ pokemon }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const error = useSelector(selectCatchError);

  const handleFormSubmit = event => {
    event.preventDefault();

    dispatch(storeCaughtPokemon(name));
  };

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

      <Flex as="form" lg={{ alignItems: 'center' }} column css={width.full} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          aria-label="Pokemon Name"
          css={nameInput}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        {error ? 'Name already exist, try different name!' : null}
        <Button type="submit">Save</Button>
      </Flex>
    </BaseModal>
  );
}

export default CatchSuccessModal;
