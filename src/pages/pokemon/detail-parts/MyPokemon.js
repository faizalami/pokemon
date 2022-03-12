/** @jsxImportSource @emotion/react */
import DetailSection from './DetailSection';
import { Flex, Grid } from '../../../components/FlexGrid';
import { padding, width } from '../../../components/utilities';
import Image from '../../../components/Image';
import { useSelector } from 'react-redux';
import { selectMyPokemonById } from '../../../redux/my-pokemons/my-pokemons.selectors';
import { css } from '@emotion/react';

export const releaseButton = css`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;

function MyPokemon ({ pokemonId }) {
  const data = useSelector(state => selectMyPokemonById(state, pokemonId));

  if (data.length) {
    return (
      <DetailSection title="My Pokemons">
        <Grid as="ul" cols={2} lg={{ cols: 'auto' }} gap={4} css={[width.full, padding.x4]}>
          {data.map(pokemon => (
            <Flex as="li" key={pokemon.nickname_id}>
              {pokemon.nickname}
              <Image
                png="/assets/img/png/pokeball-release-64.png"
                webp="/assets/img/webp/pokeball-release-64.webp"
                alt="Release"
                lazy
                width={16}
                height={16}
                css={releaseButton}
              />
            </Flex>
          ))}
        </Grid>
      </DetailSection>
    );
  }
  return null;
}

export default MyPokemon;
