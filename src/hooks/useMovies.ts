import { useQuery } from '@tanstack/react-query'
import { tmdbApi } from '../api/tmdb'

export const useMovies = () => {
  const trending = useQuery({
    queryKey: ['trending'],
    queryFn: tmdbApi.getTrendingMovies
  })

  const topRated = useQuery({
    queryKey: ['topRated'],
    queryFn: tmdbApi.getTopRatedMovies
  })

  const nowPlaying = useQuery({
    queryKey: ['nowPlaying'],
    queryFn: tmdbApi.getNowPlayingMovies
  })
  const upcomming = useQuery({
    queryKey: ['upcomming'],
    queryFn: tmdbApi.getUpcommingMovies
  })
  const popularTv = useQuery({
    queryKey: ['popularTv'],
    queryFn: tmdbApi.getPopularTvShows
  })
  
  return { trending, topRated, nowPlaying, upcomming, popularTv }
}

export const useSearchMovies = (movieName: string) => {
  const queryEnabled = movieName.trim().length > 0;

  return useQuery({
    queryKey: ["searchMovies", movieName],
    queryFn: () => tmdbApi.getSearchMovies(movieName),
    enabled: queryEnabled,
  });
};