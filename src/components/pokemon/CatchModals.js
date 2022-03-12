import CatchingModal from './CatchingModal';

function CatchModals ({ loading }) {
  if (loading) {
    return (<CatchingModal/>);
  }
  return null;
}

export default CatchModals;
