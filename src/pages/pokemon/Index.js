/** @jsxImportSource @emotion/react */
import { Grid } from '../../components/FlexGrid';
import PokemonCard from '../../components/pokemon/PokemonCard';
import { width } from '../../components/utilities';
import Loading from '../../components/Loading';

function Index ({ data, loading }) {
  return (
    <>
      <Grid cols={2} gap={4} md={{ cols: 4 }} css={width.full}>
        {
          data.map(item => <PokemonCard key={`${item.id}${item.nickname_id || ''}`} {...item} />)
        }
      </Grid>
      {loading ? <Loading/> : null}
    </>
  );
}

export default Index;
