/** @jsxImportSource @emotion/react */
import DetailSection from './DetailSection';
import { Flex, Grid } from '../../../components/FlexGrid';
import { padding, width } from '../../../components/utilities';
import Image from '../../../components/Image';
import { css } from '@emotion/react';

export const moveImageStyle = css`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;

function MoveTypes () {
  return (
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
              css={moveImageStyle}
            />
            {move}
          </Flex>
        ))}
      </Grid>
    </DetailSection>
  );
}

export default MoveTypes;
