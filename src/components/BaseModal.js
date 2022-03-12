/** @jsxImportSource @emotion/react */
import { Flex } from './FlexGrid';
import { css } from '@emotion/react';
import { margin, padding, rounded, width } from './utilities';
import mediaQueries from './media-queries';
import { pokeBallDark, pokeBallRed } from './variables';
import { useEffect, useRef } from 'react';

const modalBackDrop = css`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  ${width.full}
`;

const modalContainer = css`
  max-width: 48rem;
  background-color: white;
  border-top: 2rem solid ${pokeBallRed};
  border-bottom: 2rem solid ${pokeBallDark};

  ${width.full}
  ${rounded}
  ${margin.yAuto}
  ${margin.x8}
  ${mediaQueries.lg} {
    ${margin.xAuto}
  }
`;

const modalContent = css`
  background-color: white;
  margin: -1rem 0;
  ${padding.a4}
  ${width.full}
  ${rounded}
`;

function BaseModal ({ children }) {
  const modalContentElm = useRef();

  useEffect(() => {
    modalContentElm.current?.focus?.();
  }, []);

  return (
    <Flex alignItems="start" css={modalBackDrop}>
      <div ref={modalContentElm} css={modalContainer}>
        <Flex column alignItems="center" css={modalContent}>
          {children}
        </Flex>
      </div>
    </Flex>
  );
}

export default BaseModal;
