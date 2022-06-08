import axios from 'axios';
import { useQuery } from 'react-query';
import { DEFAULT_ARTIST } from '../constant';
import { LAST_FM_API_KEY } from '../config';
import { IAlbumResult, IAlbumTracks, IArtist, ITrack } from '../@types';

const defaultApiParams = {
  ['api_key']: LAST_FM_API_KEY,
  format: 'json',
  artist: DEFAULT_ARTIST,
};

export const useGetArtistInfo = () => {
  return useQuery<IArtist>('get-artist', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'artist.getinfo',
      },
    });
    return response.data.artist;
  });
};

export const useGetAlbums = (page: number) => {
  return useQuery<IAlbumResult>('get-albums', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'artist.gettopalbums',
        page,
      },
    });
    return response.data;
  });
};

export const useGetAlbumTracks = (album: string) => {
  return useQuery<IAlbumTracks>('get-album-tracks', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'album.getinfo',
        album,
      },
    });
    return response.data?.album;
  });
};

export const useSearchTrackInfo = (track: string) => {
  return useQuery<ITrack[]>('search-track', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'track.search',
        track,
      },
    });
    return response.data?.results?.trackmatches?.track;
  });
};