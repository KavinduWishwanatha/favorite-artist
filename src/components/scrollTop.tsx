import React, { FC } from 'react';
import styled from '@emotion/styled';
import ScrollTop from 'react-scrolltop-button';
import { theme } from '../theme';

const StyledScrollTop = styled(ScrollTop)`
  right: 1% !important;
  bottom: 2% !important;
  padding: 0px !important;
  border: 0px !important;
  background: transparent !important;
  font-size: 3rem;
  &:hover {
    color: ${theme.black} !important;
    background: transparent !important;
  }
`;

export const ScrollTopBtn: FC = () => {
  return (
    <StyledScrollTop
      {...theme}
      breakpoint={0}
      text="🔝"
    />
  );
};
