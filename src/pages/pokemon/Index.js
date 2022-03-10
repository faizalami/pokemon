/** @jsxImportSource @emotion/react */
import { Grid } from '../../components/FlexGrid';
import PokemonCard from '../../components/PokemonCard';
import { width } from '../../components/utilities';

function Index ({ data }) {
  return (
    <Grid cols={2} gap={4} md={{ cols: 4 }} css={width.full}>
      {
        data.map(item => <PokemonCard key={item.id} {...item} />)
      }
    </Grid>
  );
}

export default Index;
