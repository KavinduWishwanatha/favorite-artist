import { FC } from 'react';
import styled from '@emotion/styled';
import { Label } from 'semantic-ui-react';
import { IArtistTag } from '../@types';

const TagContainer = styled.div`
  margin-bottom: 2rem;
  .ui.tag.label {
    margin-right: 0.8em;
  }
`;

interface ITagsList {
  tags?: IArtistTag[];
}

export const TagsList: FC<ITagsList> = ({ tags }) => {
  return (
    <TagContainer>
      {tags && tags.map((data: IArtistTag, i: number) => (
        <Label key={i} tag color="black">
          {data.name}
        </Label>
      ))}
    </TagContainer>
  );
};
