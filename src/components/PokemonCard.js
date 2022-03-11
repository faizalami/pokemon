/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { margin, padding, rounded, width } from './utilities';
import { Flex } from './FlexGrid';
import { darkGray, gray } from './variables';
import Image from './Image';
import { css } from '@emotion/react';
import { ButtonLink } from './Buttons';

const CardWrapper = styled(Flex)`
  border: 1px solid ${gray};
  ${rounded}
`;

const cardThumbnailStyle = (color) => css`
  position: relative;
  height: 150px;

  .thumbnail-background {
    position: absolute;
    background-color: ${color || gray};
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

function PokemonCard ({ id, name, nickname, species }) {
  return (
    <ButtonLink to={`/pokemon/${name}`} variant="link" css={[padding.a0, displayInline]}>
      <CardWrapper column>
        <div css={cardThumbnailStyle(species?.color?.name)}>
          <div className="thumbnail-background"></div>
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
      </CardWrapper>
    </ButtonLink>
  );
}

export default PokemonCard;
