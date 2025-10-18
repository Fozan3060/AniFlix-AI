// src/types/index.ts
export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface Movie {
  id: number;
  title: string;
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
  tagline: string | null;
  credits: {
    cast: CastMember[];
  };
  videos: {
    results: Video[];
  };
}