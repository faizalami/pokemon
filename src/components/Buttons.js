/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { lightGray, gray, darkGray, pokeBallRed, pokeBallDarkRed } from './variables';
import { padding } from './utilities';
import { applyFlexTo } from './FlexGrid';
import { Link } from 'react-router-dom';

function buttonVariants (variant) {
  switch (variant) {
    case 'outline':
      return css`
        color: ${darkGray};
        background-color: white;
        border: 1px solid ${gray};

        &:hover, &:focus {
          background-color: ${lightGray};
        }
      `;
    case 'link':
      return css`
        background-color: transparent;
        border: 1px solid transparent;
      `;
    case 'darken':
      return css`
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        border: 1px solid transparent;
      `;
    default:
      return css`
        color: white;
        background-color: ${pokeBallRed};
        border: 1px solid transparent;

        &:hover, &:focus {
          background-color: ${pokeBallDarkRed};
        }
      `;
  }
}

const baseButton = (props) => css`
  border-radius: 0.375rem;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  ${padding.y2}
  ${padding.x4}
  ${buttonVariants(props.variant)}
`;

const circleButton = () => css`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;

  ${padding.a0}
  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const defaultFlexProps = {
  inline: true,
  justifyContent: 'center',
  alignItems: 'center',
};

export const Button = applyFlexTo(styled.button`
  ${baseButton}
`, defaultFlexProps);

function LinkWithClassName (props) {
  return (
    <Link
      className={props.className}
      to={props.to}
      replace={props.replace}
      state={props.state}
      reloadDocument={props.reloadDocument}
      aria-label={props['aria-label']}
    >
      {props.children}
    </Link>
  );
}

export const ButtonLink = applyFlexTo(styled(LinkWithClassName)`
  ${baseButton}
`, defaultFlexProps);

export const CircleButton = styled(Button)`
  ${circleButton}
`;

export const CircleButtonLink = styled(ButtonLink)`
  ${circleButton}
`;
