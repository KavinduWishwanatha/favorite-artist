import axios from 'axios';
import { useQuery } from 'react-query';
import { LAST_FM_API_KEY } from '../config';
import { IAlbumResult, IAlbumTracks, IArtist, ITrack, SearchArtist } from '../@types';

const defaultApiParams = {
  ['api_key']: LAST_FM_API_KEY,
  format: 'json'
};

export const useGetArtistInfo = (artist: string) => {
  return useQuery<IArtist>('get-artist', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        artist,
        method: 'artist.getinfo',
      },
    });
    return response.data.artist;
  });
};

export const useGetAlbums = (artist: string, page: number) => {
  return useQuery<IAlbumResult>('get-albums', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'artist.gettopalbums',
        artist,
        page,
      },
    });
    return response.data;
  });
};

export const useGetAlbumTracks = (artist: string, mbid: string) => {
  return useQuery<IAlbumTracks>('get-album-tracks', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'album.getinfo',
        artist,
        mbid,
      },
    });
    return response.data?.album;
  });
};

export const useSearchTrack = (track: string) => {
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

export const useSearchArtist = (artist: string) => {
  return useQuery<SearchArtist[]>('search-artist', async () => {
    const response = await axios.get(`/`, {
      params: {
        ...defaultApiParams,
        method: 'artist.search',
        artist,
      },
    });
    return response.data?.results?.artistmatches?.artist;
  });
};
