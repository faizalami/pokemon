import CatchingModal from './CatchingModal';
import CatchFailedModal from './CatchFailedModal';
import { useEffect, useState } from 'react';

function CatchModals ({ loading, failed }) {
  const [catchFailed, setCatchFailed] = useState(false);

  useEffect(() => {
    setCatchFailed(failed);
  }, [failed])

  if (loading) {
    return (<CatchingModal/>);
  }

  if (catchFailed) {
    return (<CatchFailedModal onClose={() => setCatchFailed(false)}/>);
  }

  return null;
}

export default CatchModals;
