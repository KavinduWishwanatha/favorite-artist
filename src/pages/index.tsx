import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Loader, Radio } from 'semantic-ui-react';
import { Header } from '../components/header';
import { MOBILE_MAX_WIDTH } from '../constant';
import { useAlbums } from '../util/useAlbums';
import { AlbumCards } from '../components/albumCards';
import { MetaHead } from '../components/metaHead';

const Container = styled.div`
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

const FilterText = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  margin-right: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0rem;
`;

const LoadMoreLabel = styled.div`
  margin-right: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 22px;
  letter-spacing: -0.25px;
  text-decoration-line: underline;
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: black;
    color: white;
    text-decoration-line: none;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Home: NextPage = () => {
  const [sort, setSort] = useState(false);
  const { showMore, artistLoading, artist, loading, refetching, dataSet, setIndex, currentIndex } = useAlbums();

  return (
    <>
      <MetaHead title={artist?.name || 'Favorite Artist'}/>
      <main>
        <Header loading={artistLoading} data={artist} />
        <Container>
          <RowContainer>
            <Title>Albums</Title>
            <FilterContainer>
              <FilterText>Sort by name</FilterText>
              <Radio slider onChange={() => setSort(!sort)} />
            </FilterContainer>
          </RowContainer>

          {loading ? (
            <LoadingContainer>
              <Loader active inline />
            </LoadingContainer>
          ) : (
            <AlbumCards sort={sort} data={dataSet} />
          )}
          {dataSet.length > 0 && showMore && (
            <LoadMoreContainer>
              {refetching ? <Loader active inline /> : <LoadMoreLabel onClick={() => setIndex(Number(currentIndex + 1))}>
                Load More
              </LoadMoreLabel>}
            </LoadMoreContainer>
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
