import CatchingModal from './CatchingModal';
import CatchFailedModal from './CatchFailedModal';
import { useEffect, useState } from 'react';
import CatchSuccessModal from './CatchSuccessModal';

function CatchModals ({ loading, failed, pokemon }) {
  const [catchFailed, setCatchFailed] = useState(false);
  const [caughtPokemon, setCaughtPokemon] = useState(null);

  useEffect(() => {
    setCatchFailed(failed);
  }, [failed])

  useEffect(() => {
    setCaughtPokemon(pokemon);
  }, [pokemon])

  if (loading) {
    return (<CatchingModal/>);
  }

  if (catchFailed) {
    return (<CatchFailedModal onClose={() => setCatchFailed(false)}/>);
  }

  if (caughtPokemon) {
    return (<CatchSuccessModal pokemon={caughtPokemon} onAdded={() => setCaughtPokemon(null)}/>)
  }

  return null;
}

export default CatchModals;
