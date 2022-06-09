import { FC } from 'react';
import styled from '@emotion/styled';
import { Table, Feed, Icon, Image } from 'semantic-ui-react';
import { secondsToTime } from '../util/util';
import type { ITrack } from '../@types';
import { useFavorites } from '../util/useFavorite';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.label`
  margin-left: 2rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 1rem;
  line-height: 20px;
`;

const Duration = styled.label`
  margin-left: 2rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 1rem;
  line-height: 20px;
  width: 3rem;
`;

const CustomLike = styled(Feed.Like)`
  display: flex;
  width: 3rem;
  justify-content: center;
`;

const PointedIcon = styled(Icon)`
  cursor: pointer;
`;

interface ISongsList {
  tracks: ITrack[];
  albumImage?: string;
  duration?: boolean;
  customEmptyMessage?: string;
  artist?: boolean;
}

export const SongsList: FC<ISongsList> = ({
  tracks,
  albumImage,
  duration = true,
  customEmptyMessage,
}) => {
  const { trackList, addTrackAsFavourite } = useFavorites({ tracks, albumImage });

  if (!trackList.length) {
    return (
      <EmptyContainer>
        {customEmptyMessage ? customEmptyMessage : 'No records found...'}
      </EmptyContainer>
    );
  }

  return (
    <Table celled selectable basic>
      <Table.Body>
        {trackList.map(({ isFav, ...data }, i) => {
          return (
            <Table.Row key={i}>
              <Table.Cell>
                <Container>
                  <LeftContainer>
                    {albumImage ? (
                      <Image rounded alt="album-image" src={albumImage} size="mini" />
                    ) : (
                      data.image && <Image rounded alt="album-image" src={data.image} size="mini" />
                    )}
                    <Title>
                      {i + 1}. {data.name}
                    </Title>
                  </LeftContainer>
                  <RightContainer>
                    <CustomLike>
                      <PointedIcon
                        name="like"
                        onClick={() => addTrackAsFavourite(data)}
                        color={isFav ? 'red' : 'grey'}
                      />
                    </CustomLike>
                    {duration && <Duration>{secondsToTime(data.duration)}</Duration>}
                  </RightContainer>
                </Container>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
