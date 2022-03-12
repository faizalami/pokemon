import CatchingModal from './CatchingModal';
import CatchFailedModal from './CatchFailedModal';
import { useEffect, useState } from 'react';
import CatchSuccessModal from './CatchSuccessModal';

function CatchModals ({ loading, failed, pokemon }) {
  const [catchFailed, setCatchFailed] = useState(false);

  useEffect(() => {
    setCatchFailed(failed);
  }, [failed]);

  if (loading) {
    return (<CatchingModal/>);
  }

  if (catchFailed) {
    return (<CatchFailedModal onClose={() => setCatchFailed(false)}/>);
  }

  if (pokemon) {
    return (<CatchSuccessModal pokemon={pokemon}/>);
  }

  return null;
}

export default CatchModals;
