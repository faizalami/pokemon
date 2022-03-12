/** @jsxImportSource @emotion/react */
import { Flex } from '../../components/FlexGrid';
import { margin, width } from '../../components/utilities';
import Image from '../../components/Image';

function ErrorPage ({ code, message }) {
  return (
    <>
      <Flex column alignItems="center" css={[width.full, margin.y8]}>
        <Image
          png="/assets/img/png/surprised-pikachu-128.png"
          webp="/assets/img/webp/surprised-pikachu-128.webp"
          lazy
          width={128}
          height={128}
        />
        <h1 css={margin.y1}>
          {code}
        </h1>
        <p css={margin.y1}>
          {message}
        </p>
      </Flex>
    </>
  );
}

export default ErrorPage;
