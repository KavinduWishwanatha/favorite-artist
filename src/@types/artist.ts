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
