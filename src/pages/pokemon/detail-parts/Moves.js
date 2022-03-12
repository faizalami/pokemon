/** @jsxImportSource @emotion/react */
import DetailSection from './DetailSection';
import { Flex, Grid } from '../../../components/FlexGrid';
import { padding, width } from '../../../components/utilities';
import Image from '../../../components/Image';
import { moveImageStyle } from './MoveTypes';

function Moves ({ moves }) {
  return (
    <DetailSection title="Moves">
      <Grid as="ul" cols={2} flow="row" lg={{ cols: 4 }} gap={4} css={[width.full, padding.x4]}>
        {moves.map(move => (
          <Flex as="li" key={move.move.name}>
            {move.move.class?.name ? (
              <Image
                src={`${process.env.REACT_APP_SYMBOLS_IMAGE_URL}seals/home/move-${move.move.class?.name}.png`}
                alt={move.move.class?.name}
                lazy
                width={16}
                height={16}
                css={moveImageStyle}
              />
            ) : null}
            {move.move.name}
          </Flex>
        ))}
      </Grid>
    </DetailSection>
  );
}

export default Moves;
