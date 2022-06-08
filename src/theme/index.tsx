import { css, Global } from '@emotion/react';
import { ITheme } from '../@types';

export const theme: ITheme = {
  fontPrimary: 'Inter',
  fontSecondary: 'Manrope',

  black: '#000000',
  white: '#FFFFFF',

  primary: '#102770',
  primaryDark: '#081746',
  secondary: '#FFC83D',

  success: '#2E7D32',
  error: '#C62828',

  textPrimary: {
    blue: '#102770',
    black: '#000000',
  },
  textSecondary: '#6C6C6C',

  bgWhite: '#FFFFFF',
  bgGray: '#F9F9F9',
  bgBlack: '#191919',

  stroke: '#BABABA',
};

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        font-family: Manrope, Inter;
        margin: 0;
        padding: 0;
        background: white;
        min-height: 100%;
      }
    `}
  />
);
