/** @jsxImportSource @emotion/react */
import { Flex } from './FlexGrid';
import { padding, width } from './utilities';
import Image from './Image';
import { css, keyframes } from '@emotion/react';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const loadingIconStyle = css`
  animation: ${rotateAnimation} 3s infinite linear;
`;

function Loading () {
  return (
    <Flex justifyContent="center" css={[width.full, padding.a2]}>
      <Image
        png="/assets/img/png/pokeball-64.png"
        webp="/assets/img/webp/pokeball-64.webp"
        alt="Loading"
        width={64}
        height={64}
        css={loadingIconStyle}
      />
    </Flex>
  );
}

export default Loading;
