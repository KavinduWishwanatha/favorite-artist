import styled from '@emotion/styled';
import Router, { useRouter } from 'next/router';
import { Menu, Button, Grid } from 'semantic-ui-react';
import 'react-modern-drawer/dist/index.css';
import { useState } from 'react';
import { SearchModal } from './searchModal';

const NavLink = styled.label`
  cursor: pointer;
`;

const NavGrid = styled(Grid)`
  margin: 0 !important;
  width: 100%;
`;

const NavGridColumn = styled(Grid.Row)`
  padding: 0 !important;
`;

export const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <NavGrid>
        <NavGridColumn only="computer" computer={16}>
          <Menu fixed="top" stackable inverted>
            <Menu.Item active={router.pathname === '/'} onClick={() => Router.push('/')} as="div">
              <NavLink>Home</NavLink>
            </Menu.Item>
            <Menu.Item
              active={router.pathname === '/favourite'}
              onClick={() => Router.push('/favourite')}
              as="div"
            >
              <NavLink>Liked Songs</NavLink>
            </Menu.Item>
            <Menu.Menu position="right" as="div">
              <Menu.Item>
                <Button circular icon="search" onClick={() => setOpen(true)} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </NavGridColumn>
        <NavGridColumn only="mobile tablet" mobile={16} tablet={16}>
          <Menu fixed="top" inverted>
            <Menu.Item active={router.pathname === '/'} onClick={() => Router.push('/')} as="div">
              <NavLink>Home</NavLink>
            </Menu.Item>
            <Menu.Item
              active={router.pathname === '/favourite'}
              onClick={() => Router.push('/favourite')}
              as="div"
            >
              <NavLink>Liked Songs</NavLink>
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as="div">
                <Button circular icon="search" onClick={() => setOpen(true)} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </NavGridColumn>
      </NavGrid>
      <SearchModal open={open} setOpen={setOpen} />
    </>
  );
};
