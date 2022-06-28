import { FC } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import Router from 'next/router';
import styled from '@emotion/styled';
import { IAlbum } from '../@types';
import { DEFAULT_ALBUM_IMAGE } from '../constant';
import { alphabeticalSort, getNumberUnit, limitString } from '../util/util';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface Props {
    sort: boolean;
    data: IAlbum[]
}

export const AlbumCards: FC<Props> = ({ sort, data }) => {

    const getAlbumData = (): IAlbum[] => {
        const newData = [...data];
        if (sort) {
            return newData.sort((a, b) => alphabeticalSort(a.name, b.name));
        }
        return newData;
    };

    if (!data.length) {
        return (
            <EmptyContainer>
                No albums found... 
                <label>Please search for another artist.</label>
            </EmptyContainer>
        );
    }

    return (
        <Card.Group itemsPerRow={5} stackable>
            {data && getAlbumData().map((data: IAlbum, i: number) => {
                return (
                    <Card key={i} onClick={() => Router.push(`/album/${data.mbid}`)}>
                        <Image
                            alt="album-image"
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
    );
};
