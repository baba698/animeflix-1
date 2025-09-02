
import AnimeByGenresList from '../components/AnimeByGenreList';
import Banner from '../components/Banner';

import { getAnimes, getAnimeGenres, getRandomAnime } from '../network/requests';

export default function Home({ animes, animesByGenre, randomAnime }) {
  return (
    <>
      <Banner anime={randomAnime} />
      <AnimeByGenresList data={animesByGenre} />
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const genresData = await getAnimeGenres();
    const animesData = await getAnimes()
    const randomAnimeData = await getRandomAnime();

    // Handle different possible response structures from Consumet API
    const genreNames = Array.isArray(genresData?.data) ? genresData.data.map(genre => genre?.name || genre).filter(Boolean) : [];
    const animeList = Array.isArray(animesData?.data) ? animesData.data : 
                      Array.isArray(animesData?.results) ? animesData.results : [];

    //get all the anime whose genres name property are in the genreNames array in a new array of objects with a genre property and animes property
    const animesByGenre = genreNames.map(genre => {
      const animes = animeList.filter(anime => {
        if (!anime || !Array.isArray(anime.genres)) return false;
        return anime.genres.some(animeGenre => {
          const genreName = animeGenre?.name || animeGenre;
          return genreName && typeof genreName === 'string' && genreName.toLowerCase().includes(genre.toLowerCase());
        });
      });
      return { genre, animes }
    }).filter(item => item.animes.length > 0);

    // console.log('ANIME BY GENRES', animesByGenre)

    return {
      props: {
        animes: animesData?.data || animesData?.results || [],
        animesByGenre: animesByGenre.slice(0, 15),
        randomAnime: randomAnimeData?.data || randomAnimeData || {},
      }
    }
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        animes: [],
        animesByGenre: [],
        randomAnime: {},
      }
    }
  }
}

