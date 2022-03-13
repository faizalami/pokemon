/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const listDisc = css`list-style-type: disc`;

function AboutIndex () {
  return (
    <article>
      <p>An entertaining Pokemon catalogue app by Faizal Amiruddin.</p>

      <h2>Thanks to</h2>
      <ul css={listDisc}>
        <li>
          <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">
            Pokemon icons created by Those Icons - Flaticon
          </a>
        </li>
        <li>
          <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons">
            Pokemon icons created by Nikita Golubev - Flaticon
          </a>
        </li>
        <li>
          <a href="https://pokeapi.co/docs/graphql" title="PokéAPI">
            PokéAPI - GraphQL v1beta
          </a>
        </li>
        <li>
          <a href="https://msikma.github.io/pokesprite/overview/misc.html" title="PokéSprite">
            PokéSprite
          </a>
        </li>
      </ul>
    </article>
  );
}

export default AboutIndex;
