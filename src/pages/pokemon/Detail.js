/** @jsxImportSource @emotion/react */
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/PageHeader';
import Image from '../../components/Image';
import { css } from '@emotion/react';
import { margin, padding, rounded, textAlign, width } from '../../components/utilities';
import { gray } from '../../components/variables';
import { Flex, Grid } from '../../components/FlexGrid';
import styled from '@emotion/styled';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useCallback, useEffect, useMemo } from 'react';
import mediaQueries from '../../components/media-queries';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetail } from '../../redux/pokemons/pokemons.actions';
import { selectPokemonDetail, selectLoading, selectError } from '../../redux/pokemons/pokemons.selectors';
import Loading from '../../components/Loading';
import ErrorPage from '../errors/ErrorPage';
import CatchButton from '../../components/pokemon/CatchButton';
import { catchPokemon } from '../../redux/my-pokemons/my-pokemons.actions';
import CatchModals from '../../components/pokemon/CatchModals';
import {
  selectCatchFailed,
  selectCatchLoading,
  selectCaughtPokemon,
} from '../../redux/my-pokemons/my-pokemons.selectors';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

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

const movesImageStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;

const radarWrapper = css`
  width: 100%;

  ${margin.aAuto}
  ${mediaQueries.lg} {
    width: 300px;
  }
`;

const catchButtonStyle = css`
  position: fixed;
  bottom: 5rem;
  right: 1rem;

  ${mediaQueries.lg} {
    right: 5rem;
  }
`;

const longMargin = css`margin-bottom: 8rem`;

function PokemonDetail () {
  const dispatch = useDispatch();
  const { name } = useParams();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const catchLoading = useSelector(selectCatchLoading);
  const catchFailed = useSelector(selectCatchFailed);
  const caughtPokemon = useSelector(selectCaughtPokemon);

  const dispatchGetDetail = useCallback(() => {
    dispatch(getPokemonDetail(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatchGetDetail();
  }, [dispatchGetDetail]);

  const detail = useSelector(selectPokemonDetail);

  const radarColor = useMemo(() => {
    const color = detail?.species?.color?.name || gray;
    if (color === 'white') {
      return gray;
    }
    return color;
  }, [detail]);

  const radarDataSet = useMemo(() => {
    return {
      labels: detail?.stats?.map(stat => stat.stat.name.replace('-', ' ')) || [],
      datasets: [
        {
          data: detail?.stats?.map(stat => stat.base_stat) || [],
          borderWidth: 1,
          borderColor: radarColor,
        },
      ],
    };
  }, [detail, radarColor]);

  const radarOptions = useMemo(() => {
    return {
      pointRadius: 10,
      pointBackgroundColor: radarColor,
      plugins: {
        legend: { display: false },
      },
      scales: {
        r: {
          pointLabels: {
            display: false,
          },
          min: 0,
          ticks: {
            stepSize: 20,
          },
        },
      },
    };
  }, [radarColor]);

  const handleCatchClick = () => {
    if (detail) {
      let pokemonToCatch = {
        id: detail.id,
        name: detail.name,
      };

      if (detail.species?.color) {
        pokemonToCatch.species = {
          color: {
            name: detail.species.color.name,
          },
        };
      }

      dispatch(catchPokemon(pokemonToCatch));
    }
  };

  if (name && error) {
    return <ErrorPage code={404} message="Whoops, Pokemon Not Found."/>;
  }

  if (!loading && detail) {
    return (
      <>
        <Helmet>
          <title>{detail.name} | Pokemon</title>
        </Helmet>

        <PageHeader>{detail.name}</PageHeader>

        <Flex column css={[width.full, longMargin]}>
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

          <DetailSection title="Informations">
            <Grid as="ul" cols={2} gap={4} lg={{ cols: 'auto' }} css={[width.full, padding.x4]}>
              <li>Height:<br/><strong>{detail.height / 10} Meters</strong></li>
              <li>Weight:<br/><strong>{detail.weight / 10} KG</strong></li>
              <li>Species:<br/><strong>{detail.species?.name || '-'}</strong></li>
              <li>Habitat:<br/><strong>{detail.species?.habitat?.name || '-'}</strong></li>
            </Grid>
          </DetailSection>

          <DetailSection title="Base Stats">
            <div css={radarWrapper}>
              <Radar options={radarOptions} data={radarDataSet}/>
            </div>
          </DetailSection>

          <DetailSection title="Moves">
            <Grid as="ul" cols={2} flow="row" lg={{ cols: 4 }} gap={4} css={[width.full, padding.x4]}>
              {detail.moves.map(move => (
                <Flex as="li" key={move.move.name}>
                  {move.move.class?.name ? (
                    <Image
                      src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}seals/home/move-${move.move.class?.name}.png`}
                      alt={move.move.class?.name}
                      lazy
                      width={16}
                      height={16}
                      css={movesImageStyle}
                    />
                  ) : null}
                  {move.move.name}
                </Flex>
              ))}
            </Grid>
          </DetailSection>

          {detail.moves.some(move => !!move.move.class) ? (
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
                      css={movesImageStyle}
                    />
                    {move}
                  </Flex>
                ))}
              </Grid>
            </DetailSection>
          ) : null}
        </Flex>
        <CatchButton css={catchButtonStyle} onClick={handleCatchClick}/>
        <CatchModals loading={catchLoading} failed={catchFailed} pokemon={caughtPokemon}/>
      </>
    );
  }
  return <Loading/>;
}

export default PokemonDetail;
