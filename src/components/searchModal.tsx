import { FC } from 'react';
import styled from '@emotion/styled';
import { Input, Icon, Label } from 'semantic-ui-react';
import { Portal } from 'react-portal';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useEffect, useState } from 'react';
import { useSearchArtist, useSearchTrack } from '../api/lastFmHook';
import { SongsList } from './songList';
import { DEFAULT_ALBUM_IMAGE } from '../constant';
import { css } from '@emotion/react';

const SongsContainer = styled.div`
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

interface Props {
  setOpen: (isOpen: boolean) => void;
  open: boolean;
}

export const SearchModal: FC<Props> = ({ setOpen, open }) => {
  const [search, setSearch] = useState<string>('');
  const { data: tracks, refetch: getTracksListFn } = useSearchTrack(search);
  const { data: artists, refetch: getArtistListFn } = useSearchArtist(search);

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => [getTracksListFn(), getArtistListFn()], 500);
  }, [search]);

  return (
    <Portal>
      <PaddedDrawer open={open} onClose={() => setOpen(false)} direction="top" size={500}>
        <RowContainer>
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <CustomInput
              value={search}
              placeholder={'Find Songs'}
              onChange={({ target }) => setSearch(target.value)}
              autoFocus
            />
            <div
              css={css`
                margin-top: 0.5rem;
              `}
            >
              <Label color="teal">Songs</Label>
              <Label color={undefined}>Artists</Label>
            </div>
          </div>
          <PointedIcon name="close" size="big" onClick={() => setOpen(false)} />
        </RowContainer>
        <SongsContainer>
          <SongsList
            artist
            duration={false}
            tracks={tracks || []}
            albumImage={DEFAULT_ALBUM_IMAGE}
            customEmptyMessage="Please enter your query..."
          />
        </SongsContainer>
        {/* <div css={css`
          flex: 1;
        `}>{artists && JSON.stringify(artists[0]?.name)}</div> */}
      </PaddedDrawer>
    </Portal>
  );
};
