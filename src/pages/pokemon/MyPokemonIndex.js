/** @jsxImportSource @emotion/react */
import Index from './Index';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { selectMyPokemonData } from '../../redux/my-pokemons/my-pokemons.selectors';
import { textAlign, width } from '../../components/utilities';

function MyPokemonIndex () {
  const data = useSelector(selectMyPokemonData);

  return (
    <>
      <Helmet>
        <title>My Pokemon | Pokemon</title>
      </Helmet>
      {
        data.length ?
          (<Index data={data}/>) :
          (<p css={[textAlign.center, width.full]}>I don't have pokemon (ㄒoㄒ)</p>)
      }
    </>
  );
}

export default MyPokemonIndex;
