/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { useState, useEffect } from 'react';
import Router from 'next/router';
import type { NextPage } from 'next';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { Card, Image, Icon, Loader, Radio } from 'semantic-ui-react';
import { useGetAlbums, useGetArtistInfo } from '../api/lastFmHook';
import { alphabeticalSort, getNumberUnit, limitString } from '../util/util';
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
  const [currentIndex, setIndex] = useState<number>(1);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [sort, setSort] = useState<boolean>(false);
  const [dataSet, setDataset] = useState<IAlbum[]>([]);
  const { isLoading: artistLoading, data: artist } = useGetArtistInfo();
  const { isLoading: loading, data: albums, refetch: listAlbums, isRefetching: refetching } = useGetAlbums(currentIndex);

  useEffect(() => {
    const totalPages = Number((albums && albums.topalbums['@attr']['totalPages']) || 1);
    const pageCount = totalPages > MAX_TOTAL_PAGES ? MAX_TOTAL_PAGES : totalPages;
    if (currentIndex <= pageCount) {
      listAlbums();
    } else {
      setShowMore(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (albums?.error) {
      toast.error(albums.message);
    } else {
      const data = albums && albums.topalbums?.album.filter((i) => i.mbid);
      data && setDataset([...dataSet, ...data]);
    }
  }, [albums]);

  const getAlbumData = (): IAlbum[] => {
    const newData = [...dataSet];
    if (sort) {
      return newData.sort(alphabeticalSort);
    }
    return newData;
  };

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
              getAlbumData().map((data: IAlbum, i: number) => {
                return (
                  <Card key={i} onClick={() => Router.push(`/album/${data.mbid}`)}>
                    <Image
                      alt=""
                      src={data.image[3]['#text'] || DEFAULT_ALBUM_IMAGE}
                      wrapped
                      ui={false}
                    />
                    <Card.Content>
                      <Card.Header>{limitString(data.name, 40)}</Card.Header>
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
        {showMore && (
          <LoadMoreContainer>
            {refetching?  <Loader active inline /> : <LoadMoreLabel onClick={() => setIndex(Number(currentIndex + 1))}>
              Load More
            </LoadMoreLabel>}
          </LoadMoreContainer>
        )}
      </Container>
    </main>
  );
};

export default Home;
