import { css } from '@emotion/react';
import { gray } from './variables';

const UNIT_MULTIPLIER = 0.25;

const margin = {};
const padding = {};

const spacePosition = {
  a: '',
  t: '-top',
  b: '-bottom',
  l: '-left',
  r: '-right',
};

for (let i = 0; i <= 9; i += 1) {
  Object.keys(spacePosition).forEach(key => {
    if (i === 9) {
      margin[`${key}Auto`] = css`margin${spacePosition[key]}: auto`;
    } else {
      margin[`${key}${i}`] = css`margin${spacePosition[key]}: ${i * UNIT_MULTIPLIER}rem`;
      padding[`${key}${i}`] = css`padding${spacePosition[key]}: ${i * UNIT_MULTIPLIER}rem`;
    }
  });
  if (i === 9) {
    margin[`xAuto`] = css`
      margin-left: auto;
      margin-right: auto;
    `;
    margin[`yAuto`] = css`
      margin-top: auto;
      margin-bottom: auto;
    `;
  } else {
    margin[`x${i}`] = css`
      margin-left: ${i * UNIT_MULTIPLIER}rem;
      margin-right: ${i * UNIT_MULTIPLIER}rem;
    `;
    margin[`y${i}`] = css`
      margin-top: ${i * UNIT_MULTIPLIER}rem;
      margin-bottom: ${i * UNIT_MULTIPLIER}rem;
    `;
    padding[`x${i}`] = css`
      padding-left: ${i * UNIT_MULTIPLIER}rem;
      padding-right: ${i * UNIT_MULTIPLIER}rem;
    `;
    padding[`y${i}`] = css`
      padding-top: ${i * UNIT_MULTIPLIER}rem;
      padding-bottom: ${i * UNIT_MULTIPLIER}rem;
    `;
  }
}

const width = {
  full: css`width: 100%`,
  screen: css`width: 100vw`,
};

const rounded = css`border-radius: 0.5rem`;

const textIcon = css`
  width: 1rem;
  height: 1rem;
`;

const pageWrapper = css`
  border: 4px dashed ${gray};
  ${rounded}
  ${padding.a4}
  ${width.full}
`;

export { margin, padding, width, rounded, textIcon, pageWrapper };
