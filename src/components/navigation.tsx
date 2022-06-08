import { FC } from 'react';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Button, Grid } from 'semantic-ui-react';
import 'react-modern-drawer/dist/index.css';
import { useState } from 'react';
import { ITheme } from '../@types';
import { SearchModal } from './searchModal';

const NavLink = styled.a`
  cursor: pointer;
`;

const NavGrid = styled(Grid)`
  margin: 0 !important;
  width: 100%;
`;

const NavGridColumn = styled(Grid.Row)`
  padding: 0 !important;
`;

interface INavigation {
  theme: ITheme;
}

const NavigationComp: FC<INavigation> = ({ theme }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <NavGrid>
        <NavGridColumn only="computer" computer={16}>
          <Menu fixed="top" stackable inverted>
            <Menu.Item active={router.pathname === '/'}>
              <Link href={'/'} passHref>
                <NavLink>Home</NavLink>
              </Link>
            </Menu.Item>
            <Menu.Item active={router.pathname === '/favourite'}>
              <Link href={'/favourite'} passHref>
                <NavLink>Liked Songs</NavLink>
              </Link>
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button circular icon="search" onClick={() => setOpen(true)} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </NavGridColumn>
        <NavGridColumn only="mobile tablet" mobile={16} tablet={16}>
          <Menu fixed="top" inverted>
            <Menu.Item active={router.pathname === '/'}>
              <Link href={'/'} passHref>
                <NavLink>Home</NavLink>
              </Link>
            </Menu.Item>
            <Menu.Item active={router.pathname === '/favourite'}>
              <Link href={'/favourite'} passHref>
                <NavLink>Liked Songs</NavLink>
              </Link>
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Button circular icon="search" onClick={() => setOpen(true)} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </NavGridColumn>
      </NavGrid>
      <SearchModal open={open} setOpen={setOpen} theme={theme} />
    </>
  );
};

const Navigation = withTheme(NavigationComp);
export { Navigation };
