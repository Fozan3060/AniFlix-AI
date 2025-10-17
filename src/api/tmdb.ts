import axios from 'axios'

export const BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_API_KEY = process.env.EXPO_PUBLIC_MDB_API_KEY
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`
  }
})

export const tmdbApi = {
  getTrendingMovies: async () => {
    const { data } = await api.get('/trending/movie/week')
    return data.results
  },
  getTopRatedMovies: async () => {
    const { data } = await api.get('/movie/top_rated')
    return data.results
  },
  getNowPlayingMovies: async () => {
    const { data } = await api.get('/movie/now_playing')
    return data.results
  },
  getUpcommingMovies: async () => {
    const { data } = await api.get('/movie/upcoming')
    return data.results
  },
  getPopularTvShows: async () => {
    const { data } = await api.get('/tv/popular')
    return data.results
  },
  getSearchMovies: async (movie: string) => {
    const { data } = await api.get('/search/movie', { params: { query: movie } })
    return data.results
  },
  getMovieDetails: async (id: number) => {
  const { data } = await api.get(`/movie/${id}`, {
    params: { append_to_response: "credits,videos" },
  });
  return data;
},
}

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
