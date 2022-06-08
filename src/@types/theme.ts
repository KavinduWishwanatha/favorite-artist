type ITextPrimary = {
  blue?: string;
  black?: string;
};

export type ITheme = {
  fontPrimary: string;
  fontSecondary: string;

  black: string;
  white: string;

  primary: string;
  primaryDark: string;
  secondary: string;

  success: string;
  error: string;

  textPrimary: ITextPrimary;
  textSecondary: string;

  bgWhite: string;
  bgGray: string;
  bgBlack: string;

  stroke: string;
};
