export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : undefined;
};