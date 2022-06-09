import { useEffect, useState, FC } from 'react';
import styled from '@emotion/styled';
import { Input, Icon, Label } from 'semantic-ui-react';
import { Portal } from 'react-portal';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useSearchArtist, useSearchTrack } from '../api/lastFmHook';
import { SongsList } from './songList';
import { DEFAULT_ALBUM_IMAGE } from '../constant';
import { ArtistList } from './artistList';

const SongsContainer = styled.div`
  margin-top: 4rem;
  flex: 2;
  height: 21rem;
  overflow: auto;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PointedIcon = styled(Icon)`
  cursor: pointer;
  align-self: flex-start;
`;

const LabelContainer = styled.div`
  margin-top: 0.5rem;
`;

const CustomLabel = styled(Label)`
  cursor: pointer;
`;

const PaddedDrawer = styled(Drawer)`
  padding: 1rem !important;
`;

const CustomInput = styled(Input)`
  width: 90%;
  font-size: 2rem !important;
  input {
    margin: 0 !important;
    padding: 0 !important;
    border: none !important;
  }
`;

const ColumnContainer = styled(Input)`
  display: flex;
  flex-direction: column;
`;

interface Props {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
}

export const SearchModal: FC<Props> = ({ setOpen, open }) => {
  const [isArtist, setType] = useState(false);
  const [search, setSearch] = useState('');
  const { data: tracks, refetch: getTracksListFn } = useSearchTrack(search);
  const { data: artists, refetch: getArtistListFn } = useSearchArtist(search);

  useEffect(() => {
    if (!open) {
      setSearch('');
      setType(false);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => [getArtistListFn(), getTracksListFn()], 500);
  }, [search]);

  return (
    <Portal>
      <PaddedDrawer open={open} onClose={() => setOpen(false)} direction="top" size={500}>
        <RowContainer>
          <ColumnContainer>
            <CustomInput
              value={search}
              placeholder={`Find ${isArtist ? "Artists" : "Songs"}`}
              onChange={({ target }) => setSearch(target.value)}
              autoFocus
            />
            <LabelContainer>
              <CustomLabel onClick={() => setType(false)} color={!isArtist ? "teal" : undefined}>Songs</CustomLabel>
              <CustomLabel onClick={() => setType(true)} color={isArtist ? "teal" : undefined}>Artists</CustomLabel>
            </LabelContainer>
          </ColumnContainer>
          <PointedIcon name="close" size="big" onClick={() => setOpen(false)} />
        </RowContainer>
        <SongsContainer>
          {isArtist ? <ArtistList artists={artists || []} setOpen={setOpen} /> : <SongsList
            artist
            duration={false}
            tracks={tracks || []}
            albumImage={DEFAULT_ALBUM_IMAGE}
            customEmptyMessage="Please enter your query..."
          />}
        </SongsContainer>
      </PaddedDrawer>
    </Portal>
  );
};
