type IAlbumImages = {
  ['#text']: string;
};

type IAlbumWiki = {
  published: string;
  summary: string;
};

export type ITrack = {
  isFav?: boolean;
  artist: string;
  name: string;
  image: string;
  duration: number;
};

export type IAlbum = {
  name: string;
  image: IAlbumImages[];
  playcount: number;
  tracks: ITrack[];
  listeners: number;
  wiki: IAlbumWiki;
};

type IAlbumAttributes = {
  totalPages: number;
};

type ITopAlbums = {
  album: IAlbum[];
  ['@attr']: IAlbumAttributes;
};

export type IAlbumResult = {
  topalbums: ITopAlbums;
  message?: string;
  error: number;
};

export type IAlbumTrackObj = {
  track: ITrack[];
};

export type IAlbumTracks = {
  name: string;
  image: IAlbumImages[];
  playcount: number;
  tracks: IAlbumTrackObj;
  listeners: number;
  wiki: IAlbumWiki;
};
