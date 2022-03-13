/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { margin, padding, rounded, width } from '../utilities';
import { Flex } from '../FlexGrid';
import { darkGray, gray, pokeBallDark, pokeBallDarkRed } from '../variables';
import Image from '../Image';
import { css } from '@emotion/react';
import { Button, ButtonLink } from '../Buttons';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../../redux/my-pokemons/my-pokemons.reducer';

const CardWrapper = styled(Flex)`
  border: 1px solid ${gray};
  ${rounded}
`;

const cardThumbnailStyle = css`
  position: relative;
  height: 150px;

  .thumbnail-background {
    position: absolute;
    height: 150px;
    border: 0.5rem solid transparent;
    opacity: 0.7;
    ${rounded}
    ${width.full}
  }

  .thumbnail-image {
    position: absolute;
    object-position: center;
    object-fit: contain;
    height: 150px;
    border: 0.5rem solid transparent;
    ${width.full}
  }
`;

const pokemonCountBadge = css`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 2rem;
  height: 2rem;

  * {
    position: absolute;
  }

  img {
    width: 2rem;
    height: 2rem;
  }

  .pokemon-total {
    color: ${pokeBallDarkRed};
    background-color: white;
    border-radius: 50%;
    font-size: 0.75rem;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0.4rem;
    border: 1.5px solid ${pokeBallDark};
  }
`;

const cardThumbnailBackground = color => css`background-color: ${color}`;

const displayInline = css`display: inline-block`;

const PokemonName = styled.h2`
  font-weight: normal;
  text-align: center;
  ${margin.a2}
  ${margin.b1}
`;

const PokemonOriginalName = styled.p`
  text-align: center;
  color: ${darkGray};
  ${margin.a2}
  ${margin.t0}
`;

const releaseButtonStyle = css`
  img {
    display: inline-flex;
    width: 1.25rem;
    height: 1.25rem;
    ${margin.t1}
  }

  p {
    color: white;
    display: inline-flex;
    font-size: 1rem;
    ${margin.a0}
    ${margin.l2}
  }
`;

function PokemonTotal ({ total }) {
  if (total) {
    const totalDisplay = total > 9 ? '9+' : total;
    return (
      <div css={pokemonCountBadge}>
        <Image
          png="/assets/img/png/pokeball-64.png"
          webp="/assets/img/webp/pokeball-64.webp"
          alt="Release"
          lazy
          width={24}
          height={24}
        />
        <Flex justifyContent="center" alignItems="center" className="pokemon-total">{totalDisplay}</Flex>
      </div>
    );
  }
  return null;
}

function PokemonCard ({ id, nickname_id, name, nickname, species, pokemonsTotal }) {
  const dispatch = useDispatch();

  const total = pokemonsTotal?.[id];

  const handleReleaseClick = () => {
    dispatch(deletePokemon(nickname_id));
  };

  return (
    <CardWrapper column>
      <ButtonLink to={`/pokemon/${name}`} variant="link" css={[padding.a0, displayInline]}>
        <div css={cardThumbnailStyle}>
          <div className="thumbnail-background" css={cardThumbnailBackground(species?.color?.name)}/>
          <Image
            className="thumbnail-image"
            src={`${process.env.REACT_APP_DREAM_WORLD_URL}${id}.svg`}
            alt={name}
            lazy
            width={300}
            height={300}
          />
          <PokemonTotal total={total}/>
        </div>

        <PokemonName>{nickname || name}</PokemonName>
        {nickname ? <PokemonOriginalName>{name}</PokemonOriginalName> : null}
      </ButtonLink>
      {nickname ? (
        <Button css={releaseButtonStyle} onClick={handleReleaseClick}>
          <Image
            png="/assets/img/png/pokeball-release-64.png"
            webp="/assets/img/webp/pokeball-release-64.webp"
            alt="Release"
            lazy
            width={64}
            height={64}
          />
          <p>Release</p>
        </Button>
      ) : null}
    </CardWrapper>
  );
}

export default PokemonCard;
