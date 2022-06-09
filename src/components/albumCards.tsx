import { FC } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import Router from 'next/router';
import { IAlbum } from '../@types';
import { DEFAULT_ALBUM_IMAGE } from '../constant';
import { alphabeticalSort, getNumberUnit, limitString } from '../util/util';


interface Props {
    sort: boolean;
    data: IAlbum[]
}

export const AlbumCards: FC<Props> = ({ sort, data }) => {

    const getAlbumData = (): IAlbum[] => {
        const newData = [...data];
        if (sort) {
            return newData.sort(alphabeticalSort);
        }
        return newData;
    };

    return (
        <Card.Group itemsPerRow={5} stackable>
            {data && getAlbumData().map((data: IAlbum, i: number) => {
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
    );
};
