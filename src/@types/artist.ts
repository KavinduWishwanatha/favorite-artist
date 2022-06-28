export type IArtistTag = {
  name: string;
};

type IArtistTags = {
  tag: IArtistTag[];
};

type IArtistBio = {
  summary: string;
};

export type IArtist = {
  bio: IArtistBio;
  name: string;
  tags: IArtistTags;
};

type IArtistImages = {
  ['#text']: string;
  size: string;
};

export type ISearchArtist = {
  name: string;
  listeners: number;
  mbid: string;
  streamable: string;
  image: IArtistImages[];
};
