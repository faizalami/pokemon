/** @jsxImportSource @emotion/react */
import { Flex, Grid } from '../../../components/FlexGrid';
import { margin, padding, rounded, textAlign, width } from '../../../components/utilities';
import Image from '../../../components/Image';
import { css } from '@emotion/react';
import { gray } from '../../../components/variables';

const shapeConvert = {
  ball: 'head',
  legs: 'head-legs',
  fish: 'fins',
  armor: 'insectoid',
  quadruped: 'quadruped',
  'bug-wings': 'wings-multiple',
  heads: 'multiple',
  tentacles: 'tentacles',
  blob: 'head-base',
  upright: 'bipedal-tailed',
  humanoid: 'bipedal-tailless',
  wings: 'wings-single',
  squiggle: 'serpentine',
  arms: 'head-arms',
};

const pokemonImageStyle = (color) => css`
  position: relative;
  width: 300px;
  height: 300px;

  ${margin.aAuto}
  .thumbnail-background {
    position: absolute;
    background-color: ${color || gray};
    width: 300px;
    height: 300px;
    border: 0.5rem solid transparent;
    opacity: 0.7;
    ${rounded}
  }

  img {
    position: absolute;
    object-position: center;
    object-fit: contain;
    width: 300px;
    height: 300px;
    border: 0.5rem solid transparent;
  }
`;

function Main ({ detail }) {
  return (
    <Flex as="section" css={width.full}>
      <div css={pokemonImageStyle(detail.species?.color?.name)}>
        <div className="thumbnail-background"/>
        <Image
          src={`${process.env.REACT_APP_DREAM_WORLD_URL}${detail.id}.svg`}
          alt={detail.name}
          lazy
          width={300}
          height={300}
        />
      </div>

      <Grid as="ul" container cols="auto" gap={4} css={[width.full, padding.x8]}>
        {detail.species?.shape?.name ? (
          <Flex as="li" column alignItems="center">
            <Image
              src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}body-style/${shapeConvert[detail.species?.shape?.name]}-gen8.png`}
              alt={detail.species?.shape?.name}
              lazy
              width={32}
              height={32}
            />
            <p
              css={[
                margin.a0,
                textAlign.center,
              ]}
            >{shapeConvert[detail.species?.shape?.name]?.replace('-', ' ')}</p>
          </Flex>
        ) : null}
        {detail.types.map(type => (
          <Flex as="li" key={type.type.name} column alignItems="center">
            <Image
              src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}types/gen8/${type.type.name}.png`}
              alt={type.type.name}
              lazy
              width={32}
              height={32}
            />
            <p css={margin.a0}>{type.type.name}</p>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
}

export default Main;
