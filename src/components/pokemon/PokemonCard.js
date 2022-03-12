/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { margin, padding, rounded, width } from '../utilities';
import { Flex } from '../FlexGrid';
import { darkGray, gray } from '../variables';
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

  img {
    position: absolute;
    object-position: center;
    object-fit: contain;
    height: 150px;
    border: 0.5rem solid transparent;
    ${width.full}
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

function PokemonCard ({ id, nickname_id, name, nickname, species }) {
  const dispatch = useDispatch();

  const handleReleaseClick = () => {
    dispatch(deletePokemon(nickname_id));
  };

  return (
    <CardWrapper column>
      <ButtonLink to={`/pokemon/${name}`} variant="link" css={[padding.a0, displayInline]}>
        <div css={cardThumbnailStyle}>
          <div className="thumbnail-background" css={cardThumbnailBackground(species?.color?.name)}/>
          <Image
            src={`${process.env.REACT_APP_DREAM_WORLD_URL}${id}.svg`}
            alt={name}
            lazy
            width={300}
            height={300}
          />
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
