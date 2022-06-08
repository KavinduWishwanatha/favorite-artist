import React, { FC } from 'react';
import { withTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { ITheme } from '../@types';
import ScrollTop from 'react-scrolltop-button';
import { Icon } from 'semantic-ui-react';

interface IScrollTopProps {
  theme: ITheme;
}

const StyledScrollTop = styled(ScrollTop)`
  right: 1% !important;
  bottom: 2% !important;
  padding: 0px !important;
  border: 0px !important;
  background: transparent !important;
  &:hover {
    color: ${(props) => props.black} !important;
    background: transparent !important;
  }
`;

const ScrollTopComponent: FC<IScrollTopProps> = (props) => {
  const { theme } = props;

  return (
    <StyledScrollTop
      {...theme}
      breakpoint={0}
      text={<Icon size="big" name="chevron circle up" />}
    />
  );
};

export const ScrollTopBtn = withTheme(ScrollTopComponent);
