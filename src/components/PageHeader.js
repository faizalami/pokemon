import { css } from '@emotion/react';
import { Flex } from './FlexGrid';
import { padding, margin } from './utilities';

const pageTitleBackground = css`background-color: white`;
const pageTitle = css`font-size: 2rem`;

function PageHeader ({ children }) {
  return (
    <header css={pageTitleBackground}>
      <Flex container alignItems="center" css={padding.y6}>
        <h1 css={[margin.y0, margin.r2, pageTitle]}>{children}</h1>
      </Flex>
    </header>
  );
}

export default PageHeader;
