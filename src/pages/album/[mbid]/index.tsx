import type { NextPage } from 'next';
import moment from 'moment';
import { Dimmer, Icon, Image, Label, Loader } from 'semantic-ui-react';
import styled from '@emotion/styled';
import { Navigation } from '../../../components/navigation';
import { getNumberUnit } from '../../../util/util';
import { SongsList } from '../../../components/songList';
import { DEFAULT_ALBUM_IMAGE, MOBILE_MAX_WIDTH } from '../../../constant';
import { useAlbum } from '../../../util/useAlbum';
import Head from 'next/head';

const BaseContainer = styled.div`
  height: 32rem;
  background-color: black;
  padding: 4rem 1.5rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    height: 38rem;
    padding: 6rem 1.5rem;
    .ui.inverted.menu .item {
      margin-top: 0.5rem;
    }
  }
`;

const HeaderContainer = styled.div`
  margin-top: 3rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 0;
  }
  height: inherit;
`;

const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    align-items: center;
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  justify-content: center;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-left: 0;
    margin-top: 2rem;
    align-items: center;
  }
`;

const AlbumName = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: 50px;
  color: white;
`;

const Title = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 2rem;
  line-height: 80px;
`;

const PublishedDate = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 20px;
  color: white;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    padding: 1rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

interface IAlbum {
  mbid: string | string[] | undefined;
}

const Album: NextPage<IAlbum> = (props) => {
  const { dataSet, albumImage, albumLoading, album } = useAlbum({ mbid: String(props.mbid) });

  return (
    <>
      <Head><title>{album?.name || 'Favorite Artist'}</title></Head>
      <main>
        {albumLoading && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
        <BaseContainer>
          <Navigation />
          <HeaderContainer>
            <ResponsiveContainer>
              <Image
                rounded
                alt="album-image"
                src={
                  (album && album.image[3]['#text']) ||
                  DEFAULT_ALBUM_IMAGE
                }
                size="medium"
              />
              <InfoContainer>
                <div>
                  <Label>
                    <Icon name="user circle" />

                    <Label.Detail>
                      {album && getNumberUnit(album.listeners)}
                    </Label.Detail>
                  </Label>
                  <Label>
                    <Icon name="play circle" />{' '}
                    <Label.Detail>
                      {album && getNumberUnit(album.playcount)}
                    </Label.Detail>
                  </Label>
                </div>
                <AlbumName>{album && album.name} </AlbumName>
                {album && album.wiki && (
                  <PublishedDate>
                    Published :{' '}
                    {album && moment(new Date(album.wiki.published)).format('Do MMM YYYY')}
                  </PublishedDate>
                )}
              </InfoContainer>
            </ResponsiveContainer>
          </HeaderContainer>
        </BaseContainer>

        <ResultContainer>
          {album && album.wiki && (
            <div
              dangerouslySetInnerHTML={{
                __html: album.wiki.summary,
              }}
            />
          )}

          <TitleContainer>
            <Title>Tracks</Title>
          </TitleContainer>
          <ResponsiveContainer>
            <EmptyFlex />
            <ListContainer>
              <SongsList tracks={dataSet} albumImage={albumImage} />
            </ListContainer>
            <EmptyFlex />
          </ResponsiveContainer>
        </ResultContainer>
      </main>
    </>
  );
};

Album.getInitialProps = async ({ query }) => {
  const { mbid } = query;
  return { mbid };
};

export default Album;
