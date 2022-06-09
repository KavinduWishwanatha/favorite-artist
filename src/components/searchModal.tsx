import { FC } from 'react';
import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { Portal, Input, Icon } from 'semantic-ui-react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useEffect, useState } from 'react';
import { useSearchTrackInfo } from '../api/lastFmHook';
import { SongsList } from './songList';
import { ITheme } from '../@types';
import { DEFAULT_ALBUM_IMAGE } from '../constant';

const SongsContainer = styled.div`
  height: 21rem;
  overflow: auto;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.label<ITheme>`
  font-family: ${(props) => props.fontPrimary};
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
  theme: ITheme;
  setOpen: (isOpen: boolean) => void;
  open: boolean;
}

export const SearchModalComp: FC<Props> = ({ theme, setOpen, open }) => {
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
    <Portal open={true} onClose={() => setOpen(false)}>
      <PaddedDrawer open={open} onClose={() => setOpen(false)} direction="top" size={500}>
        <RowContainer>
          <Title {...theme}>Find Songs</Title>
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

const SearchModal = withTheme(SearchModalComp);
export { SearchModal };
