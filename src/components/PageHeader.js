/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Flex } from './FlexGrid';
import { padding, margin, width } from './utilities';

const pageTitleStyle = css`
  background-color: white;

  ${width.full}
  h1 {
    font-size: 2rem;
    ${margin.y0}
    ${margin.r2}
  }
`;

function PageHeader ({ children }) {
  return (
    <header css={pageTitleStyle}>
      <Flex container alignItems="center" justifyContent="center" css={padding.y6}>
        <h1>{children}</h1>
      </Flex>
    </header>
  );
}

export default PageHeader;
