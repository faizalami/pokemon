import CatchingModal from './CatchingModal';
import CatchFailedModal from './CatchFailedModal';
import { useCallback, useEffect, useState } from 'react';
import CatchSuccessModal from './CatchSuccessModal';
import { useDispatch } from 'react-redux';
import { resetPokemonCatch } from '../../redux/my-pokemons/my-pokemons.reducer';

function CatchModals ({ loading, failed, pokemon }) {
  const dispatch = useDispatch()
  const dispatchResetPokemonCatch = useCallback(() => {
    dispatch(resetPokemonCatch());
  }, [dispatch]);

  useEffect(() => {
    dispatchResetPokemonCatch();
  }, [dispatchResetPokemonCatch]);

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
