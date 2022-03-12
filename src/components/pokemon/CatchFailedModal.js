/** @jsxImportSource @emotion/react */
import BaseModal from '../BaseModal';
import Image from '../Image';
import { Button } from '../Buttons';
import { textAlign } from '../utilities';

function CatchFailedModal ({ onClose }) {
  return (
    <BaseModal>
      <Image
        png="/assets/img/png/surprised-pikachu-128.png"
        webp="/assets/img/webp/surprised-pikachu-128.webp"
        alt="Surprised Pikachu"
        lazy
        width={76}
        height={76}
      />
      <h2 css={textAlign.center}>OH Noooo, Pokemon escaped ! ! !</h2>
      <Button onClick={onClose}>Okay (ㄒoㄒ)</Button>
    </BaseModal>
  );
}

export default CatchFailedModal;
