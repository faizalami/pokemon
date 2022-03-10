import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/errors/ErrorPage';

const Layout = React.lazy(() => import('./components/Layout'));
const PokemonIndex = React.lazy(() => import('./pages/pokemon/PokemonIndex'));
const PokemonDetail = React.lazy(() => import('./pages/pokemon/Detail'));
const MyPokemon = React.lazy(() => import('./pages/pokemon/MyPokemonIndex'));
const About = React.lazy(() => import('./pages/about/Index'));
const Game = React.lazy(() => import('./pages/game/Index'));

function App () {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path="/" element={<Layout title="Pokedex"/>}>
          <Route index element={<PokemonIndex/>}/>
          <Route path="pokemon" element={<PokemonIndex/>}/>
          <Route path="pokemon/:slug" element={<PokemonDetail/>}/>
        </Route>
        <Route path="/my-pokemon" element={<Layout title="My Pokemon"/>}>
          <Route index element={<MyPokemon/>}/>
        </Route>
        <Route path="/play" element={<Layout/>}>
          <Route index element={<Game/>}/>
        </Route>
        <Route path="/about" element={<Layout title="About"/>}>
          <Route index element={<About/>}/>
        </Route>
        <Route path="/404" element={<Layout/>}>
          <Route index element={<ErrorPage code={404} message="Not Found."/>}/>
        </Route>
        <Route path="*" element={<Layout/>}>
          <Route index element={<ErrorPage code={404} message="Not Found."/>}/>
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
