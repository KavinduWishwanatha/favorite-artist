import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useGetArtistInfo } from '../api/lastFmHook';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { SongsList } from '../components/songList';
import { Header } from '../components/header';
import { MOBILE_MAX_WIDTH } from '../constant';

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 3rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 2rem 1rem;
  }
`;

const RowContainer = styled.div`
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
  const { isLoading: loading, data: artist } = useGetArtistInfo();

  const favouriteList = useSelector((state: RootState) => state.favourite.list);

  return (
    <main>
      <Header loading={loading} data={artist} />
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
  );
};

export default Favourite;
