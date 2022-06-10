import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useGetArtistInfo } from '../api/lastFmHook';
import { RootState } from '../redux/reducer';
import { SongsList } from '../components/songList';
import { Header } from '../components/header';
import { MOBILE_MAX_WIDTH } from '../constant';
import Head from 'next/head';

const SongContainer = styled.div`.
  display: flex;
  flex-direction: column;
  padding: 0.5rem 3rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 2rem 1rem;
  }
`;

const RowContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: 80px;
`;

const RowContent = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;
  }
`;

const EmptyFlex = styled.div`
  display: flex;
  flex: 1;
`;

const ListContainer = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
`;

const Favourite: NextPage = () => {
  const selectedArtist = useSelector((state: RootState) => state.favourite.artist);
  const favouriteList = useSelector((state: RootState) => state.favourite.list);

  const { isLoading: loading, data: artist } = useGetArtistInfo(selectedArtist);

  return (
    <>
      <Head><title>Favorite Artist</title></Head>
      <main>
        <Header loading={loading} data={artist} noCover />
        <SongContainer>
          <RowContainer>
            <Title>Liked Songs</Title>
          </RowContainer>
          <RowContent>
            <EmptyFlex />
            <ListContainer>
              <SongsList tracks={favouriteList} />
            </ListContainer>
            <EmptyFlex />
          </RowContent>
        </SongContainer>
      </main>
    </>
  );
};

export default Favourite;
