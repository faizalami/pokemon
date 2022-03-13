/** @jsxImportSource @emotion/react */
import { Grid } from '../../components/FlexGrid';
import PokemonCard from '../../components/pokemon/PokemonCard';
import { width } from '../../components/utilities';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import { selectMyPokemonTotalEachId } from '../../redux/my-pokemons/my-pokemons.selectors';

function Index ({ data, loading }) {
  const pokemonsTotal = useSelector(selectMyPokemonTotalEachId);

  return (
    <>
      <Grid cols={2} gap={4} md={{ cols: 4 }} css={width.full}>
        {
          data.map((item, index) => <PokemonCard
            key={`${item.id}${item.nickname_id || ''}`} {...item}
            pokemonsTotal={pokemonsTotal}
            lazy={index >= 8}
          />)
        }
      </Grid>
      {loading ? <Loading/> : null}
    </>
  );
}

export default Index;
