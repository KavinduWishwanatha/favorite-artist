import { FC } from 'react';
import styled from '@emotion/styled';
import { Navigation } from './navigation';
import { TagsList } from './tags';
import { MOBILE_MAX_WIDTH } from '../constant';
import { IArtist } from '../@types';
import { theme } from '../theme';
import { limitString } from '../util/util';

const BaseContainer = styled.div`
  height: 25rem;
  background-color: black;
  padding: 2rem 3rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    height: 40rem;
    padding: 4rem 1rem;
    .ui.inverted.menu .item {
      margin-top: 0.5rem;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: inherit;  
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 2rem;
  }
`;

const ColumnContainer = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  @media (min-width: ${MOBILE_MAX_WIDTH}px) {
    justify-content: center;
  }
`;

const SummaryContainer = styled.div`
display: block;
  margin-bottom: 2rem;
  color: white;
  background: ${theme.bgBlack};
  padding: 10px;
  color: ${theme.stroke};
  line-height: 20px;
  border-radius: 5px;
  .ui.tag.label {
    margin-right: 0.8em;
  }
`;

const Artist = styled.label`
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 4rem;
  line-height: 80px;
  color: white;
`;

interface IHeader {
  loading: boolean;
  data: IArtist | undefined;
}

export const Header: FC<IHeader> = ({ loading, data }) => {
  return (
    <>
      <Navigation />
      <BaseContainer>
        <Container>
          {
            <ColumnContainer>
              {!loading && (
                <>
                  <Artist>{data?.name}</Artist>
                  <TagsList artist={data} />
                  <SummaryContainer
                    dangerouslySetInnerHTML={{
                      __html: limitString(String(data?.bio.summary), 500),
                    }}
                  />
                </>
              )}
            </ColumnContainer>
          }
        </Container>
      </BaseContainer>
    </>
  );
};
