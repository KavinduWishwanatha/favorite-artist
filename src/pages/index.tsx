/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useEffect } from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { Card, Image, Icon, Pagination, Loader, Radio } from 'semantic-ui-react';
import { useGetAlbums, useGetArtistInfo } from '../api/lastFmHook';
import { alphabeticalSort, getNumberUnit } from '../util/util';
import { Header } from '../components/header';
import { DEFAULT_ALBUM_IMAGE, MAX_TOTAL_PAGES, MOBILE_MAX_WIDTH } from '../constant';
import { IAlbum } from '../@types';

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

const PaginationContainer = styled.div`
  display: flex;
  margin: 2rem 0rem;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Home: NextPage = () => {
  const [currentIndex, setIndex] = useState<number>(1);
  const [sort, setSort] = useState<boolean>(false);
  const [dataSet, setDataset] = useState<IAlbum[]>([]);
  const { isLoading: artistLoading, data: artist } = useGetArtistInfo();
  const {
    isLoading: loading,
    data: albums,
    refetch: listAlbums,
  } = useGetAlbums(currentIndex);

  useEffect(() => {
    listAlbums();
  }, [currentIndex]);

  useEffect(() => {
    if (albums?.error) {
      toast.error(albums.message);
    } else {
      if (sort && albums) {
        const sorted: IAlbum[] = [...albums.topalbums.album].sort(alphabeticalSort);
        setDataset(sorted);
      } else {
        albums && setDataset(albums.topalbums?.album);
      }
    }
  }, [sort, albums]);

  const totalPages = Number(albums && albums.topalbums['@attr']['totalPages']);

  return (
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
          <Card.Group itemsPerRow={5} stackable>
            {dataSet &&
              dataSet.map((data: IAlbum, i: number) => {
                return (
                  <Card key={i} onClick={() => Router.push(`/album/${data.name}`)}>
                    <Image
                      alt=""
                      src={
                        data.image[3]['#text'] ||
                        DEFAULT_ALBUM_IMAGE
                      }
                      wrapped
                      ui={false}
                    />
                    <Card.Content>
                      <Card.Header>{data.name}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <label>
                        <Icon name="play" />
                        {getNumberUnit(data.playcount)}
                      </label>
                    </Card.Content>
                  </Card>
                );
              })}
          </Card.Group>
        )}
        <PaginationContainer>
          {albums && (
            <Pagination
              size="tiny"
              activePage={currentIndex}
              onPageChange={(e, { activePage }) => [
                setIndex(Number(activePage)),
                (typeof window !== 'undefined') && window.scroll({ top: 420, behavior: 'smooth' }),
              ]}
              totalPages={totalPages > MAX_TOTAL_PAGES ? MAX_TOTAL_PAGES : totalPages}
              pointing
              secondary
              firstItem={null}
              lastItem={null}
              siblingRange={1}
            />
          )}
        </PaginationContainer>
      </Container>
    </main>
  );
};

export default Home;
