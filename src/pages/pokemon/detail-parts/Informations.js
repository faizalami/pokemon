/** @jsxImportSource @emotion/react */
import DetailSection from './DetailSection';
import { Grid } from '../../../components/FlexGrid';
import { padding, width } from '../../../components/utilities';

function Informations ({ detail }) {
  return (
    <DetailSection title="Informations">
      <Grid as="ul" cols={2} gap={4} lg={{ cols: 'auto' }} css={[width.full, padding.x4]}>
        <li>Height:<br/><strong>{detail.height / 10} Meters</strong></li>
        <li>Weight:<br/><strong>{detail.weight / 10} KG</strong></li>
        <li>Species:<br/><strong>{detail.species?.name || '-'}</strong></li>
        <li>Habitat:<br/><strong>{detail.species?.habitat?.name || '-'}</strong></li>
      </Grid>
    </DetailSection>
  );
}

export default Informations;
