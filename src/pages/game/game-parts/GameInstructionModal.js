/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import BaseModal from '../../../components/BaseModal';
import Image from '../../../components/Image';
import { margin, textAlign } from '../../../components/utilities';
import { Button } from '../../../components/Buttons';
import { css } from '@emotion/react';

const listDecimal = css`list-style-type: decimal`;

function GameInstructionModal () {
  const [close, setClose] = useState(false);

  if (!close) {
    return (
      <BaseModal>
        <Image
          png="/assets/img/png/gamepad-64.png"
          webp="/assets/img/webp/gamepad-64.webp"
          alt="Instruction"
          lazy
          width={64}
          height={64}
        />
        <h2 css={[textAlign.center, margin.b2]}>How to Play???</h2>
        <ol css={[listDecimal, margin.t0]}>
          <li>Click on the Pokeball in the bottom right corner of the page.</li>
          <li>And then, click on the pokemon you want.</li>
        </ol>
        <Button onClick={() => setClose(true)}>Okay （＞ω＜）</Button>
      </BaseModal>
    );
  }
  return null;
}

export default GameInstructionModal;
