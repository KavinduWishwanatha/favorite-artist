import { FC } from 'react';
import styled from '@emotion/styled';
import { Navigation } from './navigation';
import { TagsList } from './tags';
import { MOBILE_MAX_WIDTH } from '../constant';
import { IArtist } from '../@types';
import { theme } from '../theme';

const BaseContainer = styled.div`
  height: 32rem;
  background-color: black;
  background-image: url(${require('../assets/wallpaper.webp')});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  picture {
    pointer-events: none;
  }
  padding: 4rem 1.5rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    height: 32rem;
    .ui.inverted.menu .item {
      margin-top: 0.5rem;
    }
  }
`;

const Container = styled.div`
  margin-top: 3rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 0;
  }
  display: flex;
  flex-direction: row;
  height: inherit;
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
                      __html: String(data?.bio.summary),
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
