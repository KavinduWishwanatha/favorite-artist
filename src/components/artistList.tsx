import { FC } from 'react';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Table, Image } from 'semantic-ui-react';
import type { ISearchArtist } from '../@types';
import { DEFAULT_ARTIST_IMAGE } from '../constant';
import { favouriteSetArtistAction } from '../redux/actions';

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

const Title = styled.label`
  margin-left: 2rem;
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 1rem;
  line-height: 20px;
`;

const CustomTableRow = styled(Table.Row)`
  cursor: pointer;
`;

interface IArtistList {
  artists: ISearchArtist[];
  setOpen: (visible: boolean) => void;
  customEmptyMessage: string;
}

export const ArtistList: FC<IArtistList> = ({
  artists,
  setOpen,
  customEmptyMessage
}) => {
  const { route } = useRouter();
  const dispatch = useDispatch();

  if (artists && !artists.length) {
    return (
      <EmptyContainer>
        {customEmptyMessage ? customEmptyMessage : 'No records found...'}
      </EmptyContainer>
    );
  }

  return (
    <Table celled selectable basic>
      <Table.Body>
        {artists.map((data, i) => {
          return (
            <CustomTableRow key={i} onClick={() => [
              dispatch(favouriteSetArtistAction(data.name)),
              (route === '/') ? setOpen(false) : Router.push('/')
            ]
            }>
              <Table.Cell>
                <Container>
                  <LeftContainer>
                    <Image rounded alt="album-image" src={data.image[0]['#text'] || DEFAULT_ARTIST_IMAGE} size="mini" />
                    <Title>
                      {data.name}
                    </Title>
                  </LeftContainer>
                </Container>
              </Table.Cell>
            </CustomTableRow>
          );
        })}
      </Table.Body>
    </Table>
  );
};