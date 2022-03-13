/** @jsxImportSource @emotion/react */
import { Button } from '../Buttons';
import Image from '../Image';
import { css, keyframes } from '@emotion/react';
import { margin, padding, rounded } from '../utilities';

const shake = keyframes`
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
`;

const iconShake = css`
  & img:hover,
  &:focus img {
    animation: ${shake} 0.5s;
    animation-iteration-count: infinite;
  }
`;

const buttonLabel = css`
  background-color: white;
  font-weight: bold;
  ${rounded}
  ${padding.a1}
  ${margin.a0}
`;

function CatchButton ({ className, onClick }) {
  return (
    <Button column variant="link" onClick={onClick} className={className} css={iconShake}>
      <Image
        png="/assets/img/png/pokeball-64.png"
        webp="/assets/img/webp/pokeball-64.webp"
        alt="Catch!"
        lazy
        width={64}
        height={64}
      />
      <p css={buttonLabel}>Catch!</p>
    </Button>
  );
}

export default CatchButton;
