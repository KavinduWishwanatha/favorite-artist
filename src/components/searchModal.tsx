import { FC } from 'react';
import styled from '@emotion/styled';
import { Input, Icon } from 'semantic-ui-react';
import { Portal } from 'react-portal';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useEffect, useState } from 'react';
import { useSearchTrackInfo } from '../api/lastFmHook';
import { SongsList } from './songList';
import { DEFAULT_ALBUM_IMAGE } from '../constant';
import { theme } from '../theme';

const SongsContainer = styled.div`
  height: 21rem;
  overflow: auto;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.label`
  font-family: ${theme.fontPrimary};
  font-style: normal;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 40px;
`;

const PointedIcon = styled(Icon)`
  cursor: pointer;
`;

const PaddedDrawer = styled(Drawer)`
  padding: 1rem !important;
`;

const CustomInput = styled(Input)`
  font-size: 2rem !important;
  input {
    border: none !important;
  }
`;

interface Props {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
}

export const SearchModal: FC<Props> = ({ setOpen, open }) => {
  const [search, setSearch] = useState<string>('');
  const { data: tracks, refetch: getTracksListFn } = useSearchTrackInfo(search);

  useEffect(() => {
    if(!open){
      setSearch('');
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => getTracksListFn(), 500);
  }, [search, getTracksListFn]);

  return (
    <Portal>
      <PaddedDrawer open={open} onClose={() => setOpen(false)} direction="top" size={500}>
          <RowContainer>
            <Title>Find Songs</Title>
            <PointedIcon name="close" size="big" onClick={() => setOpen(false)} />
          </RowContainer>
          <br />
          <CustomInput
            value={search}
            placeholder="Search..."
            onChange={({ target }) => setSearch(target.value)}
            autoFocus
          />
          <br />
          <br />
          <SongsContainer>
            <SongsList
              artist
              duration={false}
              tracks={tracks || []}
              albumImage={DEFAULT_ALBUM_IMAGE}
              customEmptyMessage="Please enter your query..."
            />
          </SongsContainer>
      </PaddedDrawer>
    </Portal>
  );
};
