import { FC } from 'react';
import styled from '@emotion/styled';
import { Label } from 'semantic-ui-react';
import { IArtist, IArtistTag } from '../@types';

interface ITagsList {
  artist: IArtist | undefined;
}

const TagContainer = styled.div`
  margin-bottom: 2rem;
  .ui.tag.label {
    margin-right: 0.8em;
  }
`;

export const TagsList: FC<ITagsList> = ({ artist }) => {
  return (
    <TagContainer>
      {artist?.tags.tag.map((data: IArtistTag, i: number) => (
        <Label key={i} tag color="black">
          {data.name}
        </Label>
      ))}
    </TagContainer>
  );
};
