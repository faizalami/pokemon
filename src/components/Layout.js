/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import { Flex, Grid } from './FlexGrid';
import { ButtonLink, CircleButtonLink } from './Buttons';
import { margin, padding, width } from './utilities';
import { pokeBallRed, pikachuYellow } from './variables';
import Image from './Image';
import { ReactComponent as QuestionCircle } from './icons/question-circle.svg';
import mediaQueries from './media-queries';

const navStyle = css`
  background-color: ${pokeBallRed};

  & * {
    color: ${pikachuYellow} !important;
  }
`;

const aboutButtonStyle = css`
  position: absolute;
  right: 0;

  ${margin.r1}
  ${mediaQueries.lg} {
    position: relative;
    ${margin.r0}
  }
`;

const pageTitleBackground = css`background-color: white`;

const appTitle = css`
  ${width.full}
  img {
    ${width.full}
    height: 3rem;
    object-position: center;
    object-fit: contain;
  }

  ${mediaQueries.lg} {
    width: auto;
  }
`;

const pageTitle = css`
  font-size: 2rem;
`;

const minHeightFull = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const flexGrow = css`flex-grow: 1`;

const lgHide = css`
  ${mediaQueries.lg} {
    display: none;
  }
`;

const lgShow = css`
  display: none;

  ${mediaQueries.lg} {
    display: flex;
  }
`;

const topNavButtonStyle = css`
  img {
    display: inline-flex;
    width: 1.25rem;
    height: 1.25rem;
    ${margin.t1}
  }

  p {
    display: inline-flex;
    font-size: 1rem;
    ${margin.a0}
    ${margin.l2}
  }
`;

const bottomNavButtonStyle = css`
  img {
    width: 2rem;
    height: 2rem;
    flex-grow: 1;
  }

  p {
    font-size: 0.75rem;
    text-align: center;
    ${margin.a0}
  }
`;

function NavButton ({ png, webp, title, to, bottom }) {
  return (
    <ButtonLink to={to} variant={bottom ? 'link' : 'darken'}>
      <Flex column={bottom} alignItems="center" css={bottom ? bottomNavButtonStyle : topNavButtonStyle}>
        <Image
          png={png}
          webp={webp}
          alt={title}
          lazy
          width={64}
          height={64}
        />
        <p>{title}</p>
      </Flex>
    </ButtonLink>
  );
}

function Layout (props) {
  return (
    <Flex column css={minHeightFull}>
      <nav css={navStyle}>
        <Flex container alignItems="center" css={padding.y2}>
          <Flex justifyContent="center" css={appTitle}>
            <Image
              png="/assets/img/png/pokemon-logo-64.png"
              webp="/assets/img/webp/pokemon-logo-64.webp"
              alt="Pokemon"
              lazy
              width={174}
              height={64}
              imageCss={margin.xAuto}
            />
          </Flex>

          <Flex as="ul" gap={2} css={[margin.lAuto, margin.r2, lgShow]}>
            <li>
              <NavButton
                png="/assets/img/png/pikachu-64.png"
                webp="/assets/img/webp/pikachu-64.webp"
                title="Pokedex"
                to="/"
              />
            </li>
            <li>
              <NavButton
                png="/assets/img/png/pokemon-trainer-64.png"
                webp="/assets/img/webp/pokemon-trainer-64.webp"
                title="My Pokemon"
                to="/my-pokemon"
              />
            </li>
            <li>
              <NavButton
                png="/assets/img/png/pokeball-64.png"
                webp="/assets/img/webp/pokeball-64.webp"
                title="Play"
                to="/play"
              />
            </li>
          </Flex>

          <CircleButtonLink variant="link" to="/about" css={aboutButtonStyle}>
            <QuestionCircle/>
          </CircleButtonLink>
        </Flex>
      </nav>

      <div css={flexGrow}>
        {props.title ?
          <header css={pageTitleBackground}>
            <Flex container alignItems="center" css={padding.y6}>
              <h1 css={[margin.y0, margin.r2, pageTitle]}>{props.title}</h1>
            </Flex>
          </header>
          : null
        }

        <Flex as="main" container css={margin.b8}>
          {props.children || <Outlet/>}
        </Flex>
      </div>

      <nav css={[navStyle, lgHide]}>
        <Grid container cols={3}>
          <NavButton
            bottom
            png="/assets/img/png/pikachu-64.png"
            webp="/assets/img/webp/pikachu-64.webp"
            title="Pokedex"
            to="/"
          />
          <NavButton
            bottom
            png="/assets/img/png/pokeball-64.png"
            webp="/assets/img/webp/pokeball-64.webp"
            title="Play"
            to="/play"
          />
          <NavButton
            bottom
            png="/assets/img/png/pokemon-trainer-64.png"
            webp="/assets/img/webp/pokemon-trainer-64.webp"
            title="My Pokemon"
            to="/my-pokemon"
          />
        </Grid>
      </nav>
    </Flex>
  );
}

export default Layout;
