/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import Image from '../../components/Image';
import { css } from '@emotion/react';
import { margin, padding, rounded, width } from '../../components/utilities';
import { gray } from '../../components/variables';
import { Flex, Grid } from '../../components/FlexGrid';
import styled from '@emotion/styled';

const dummy = {
  'id': 1,
  'name': 'bulbasaur',
  'height': 7,
  'weight': 69,
  'species': {
    'name': 'bulbasaur',
    'color': {
      'name': 'green',
    },
    'generation': {
      'name': 'generation-i',
    },
    'shape': {
      'name': 'quadruped',
    },
    'habitat': {
      'name': 'grassland',
    },
  },
  'stats': [
    {
      'base_stat': 45,
      'stat': {
        'name': 'hp',
      },
    },
    {
      'base_stat': 49,
      'stat': {
        'name': 'attack',
      },
    },
    {
      'base_stat': 49,
      'stat': {
        'name': 'defense',
      },
    },
    {
      'base_stat': 65,
      'stat': {
        'name': 'special-attack',
      },
    },
    {
      'base_stat': 65,
      'stat': {
        'name': 'special-defense',
      },
    },
    {
      'base_stat': 45,
      'stat': {
        'name': 'speed',
      },
    },
  ],
  'types': [
    {
      'type': {
        'name': 'grass',
      },
    },
    {
      'type': {
        'name': 'poison',
      },
    },
  ],
  'moves': [
    {
      'move': {
        'name': 'razor-wind',
        'class': {
          'name': 'special',
        },
      },
      'move_id': 13,
    },
    {
      'move': {
        'name': 'swords-dance',
        'class': {
          'name': 'status',
        },
      },
      'move_id': 14,
    },
    {
      'move': {
        'name': 'cut',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 15,
    },
    {
      'move': {
        'name': 'bind',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 20,
    },
    {
      'move': {
        'name': 'vine-whip',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 22,
    },
    {
      'move': {
        'name': 'headbutt',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 29,
    },
    {
      'move': {
        'name': 'tackle',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 33,
    },
    {
      'move': {
        'name': 'body-slam',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 34,
    },
    {
      'move': {
        'name': 'take-down',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 36,
    },
    {
      'move': {
        'name': 'double-edge',
        'class': {
          'name': 'physical',
        },
      },
      'move_id': 38,
    },
  ],
};

function DetailSectionTemplate ({ className, title, children }) {
  return (
    <Flex as="section" column alignItems="center" className={className}>
      <h2>{title}</h2>
      {children}
    </Flex>
  );
}

const DetailSection = styled(DetailSectionTemplate)`
  border: 1px solid ${gray};

  ${margin.t4}
  ${rounded}
  h2 {
    font-size: 1.25rem;
    display: inline-block;
    margin-top: -0.75rem;
    background: white;
    border: 1rem solid white;
    border-top: none;
    border-bottom: none;
  }
`;

const pokemonImageStyle = (color) => css`
  ${margin.aAuto}
  img {
    width: 300px;
    height: 300px;
    background-color: ${color || gray};
    border: 0.5rem solid ${color || gray};
    object-fit: contain;
    ${rounded}
  }
`;

const movesImageStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;

function PokemonDetail () {
  return (
    <>
      <Helmet>
        <title>{dummy.name} | Pokemon</title>
      </Helmet>

      <PageHeader>{dummy.name}</PageHeader>

      <Flex column css={width.full}>
        <Flex as="section" css={width.full}>
          <div css={pokemonImageStyle(dummy.species?.color?.name)}>
            <Image
              src={`${process.env.REACT_APP_DREAM_WORLD_URL}${dummy.id}.svg`}
              alt={dummy.name}
              lazy
              width={300}
              height={300}
            />
          </div>

          <Grid as="ul" container cols="auto" gap={4} css={[width.full, padding.x8]}>
            {dummy.species?.shape?.name ? (
              <Flex as="li" column alignItems="center">
                <Image
                  src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}body-style/${dummy.species?.shape?.name}-gen8.png`}
                  alt={dummy.species?.shape?.name}
                  lazy
                  width={32}
                  height={32}
                />
                <p css={margin.a0}>{dummy.species?.shape?.name}</p>
              </Flex>
            ) : null}
            {dummy.types.map(type => (
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

        <DetailSection title="Informations">
          <Grid as="ul" cols={2} gap={4} lg={{ cols: 'auto' }} css={[width.full, padding.x4]}>
            <li>Height:<br/><strong>{dummy.height / 10} Meters</strong></li>
            <li>Weight:<br/><strong>{dummy.weight / 10} KG</strong></li>
            <li>Species:<br/><strong>{dummy.species?.name || '-'}</strong></li>
            <li>Habitat:<br/><strong>{dummy.species?.habitat?.name || '-'}</strong></li>
          </Grid>
        </DetailSection>

        <DetailSection title="Moves">
          <Grid as="ul" cols={2} flow="row" lg={{ cols: 4 }} gap={4} css={[width.full, padding.x4]}>
            {dummy.moves.map(move => (
              <Flex as="li" key={move.move.name}>
                {move.move.class?.name ? (
                  <Image
                    src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}seals/home/move-${move.move.class?.name}.png`}
                    alt={move.move.class?.name}
                    lazy
                    width={16}
                    height={16}
                    imageCss={movesImageStyle}
                  />
                ) : null}
                {move.move.name}
              </Flex>
            ))}
          </Grid>
        </DetailSection>

        {dummy.moves.some(move => !!move.move.class) ? (
          <DetailSection title="Move Types">
            <Grid as="ul" cols={3} gap={4} css={[width.full, padding.x4]}>
              {['physical', 'special', 'status'].map(move => (
                <Flex as="li" key={move}>
                  <Image
                    src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}seals/home/move-${move}.png`}
                    alt={move}
                    lazy
                    width={16}
                    height={16}
                    imageCss={movesImageStyle}
                  />
                  {move}
                </Flex>
              ))}
            </Grid>
          </DetailSection>
        ) : null}
      </Flex>
    </>
  );
}

export default PokemonDetail;
