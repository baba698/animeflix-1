import { getSingleAnime } from "../../network/requests"
import Image from 'next/image'
import Banner from '../../components/Banner';
import { AnimePropItem } from "../../components/utils";
import { HeartIcon, StarIcon } from "@heroicons/react/solid";

// Episodes preview (first 10) for Consumet API
const EpisodesPreview = ({ episodes = [] }) => (
    <div className='p-2 mt-4 rounded-md bg-[#152232]/80'>
        <h2 className='text-2xl text-white mb-4'>Episodes</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            {(episodes.slice(0, 10)).map((ep) => (
                <div key={ep?.id || ep?.number} className='text-white opacity-90'>
                    Episode {ep?.number ?? '-'}{ep?.title ? `: ${ep.title}` : ''}
                </div>
            ))}
        </div>
    </div>
)
const AnimeDetail = ({ anime: { anime } }) => {
    return (
        <div>
            <Banner anime={anime} />

            <div className="px-[12px] md:px-[40px] grid grid-cols-1 justify-items-center gap-[70px] md:grid-cols-[250px_1fr] md:gap-[18px]">
                <div className='transition duration-200 min-w-[230px] w-[230px] h-[300px] block mt-[-98px] md:mt-[-60px] sm:hover:scale-105'>
                    <Image
                        className='object-fill rounded-md h-full w-full'
                        objectFit={true}
                        layout='responsive'
                        src={anime?.images?.jpg?.large_image_url || anime?.image || '/android-chrome-512x512.png'}
                        alt={anime?.title || 'Anime'}
                        height={300}
                        width={230} />
                </div>

                <div className='grid auto-rows-min text-white py-4 px-6'>
                    <span className='opacity-80 text-xl'>
                        Released {anime?.releaseDate ?? 'N/A'}
                    </span>
                    <p className="italic text-sm text-white opacity-80">
                        {anime?.status ?? "N/A"}
                    </p>
                    <h1 className='my-4 text-3xl md:text-4xl'>
                        {anime?.title ?? "N/A"}
                    </h1>
                    <span>Sypnosis</span>
                    <p className="text-white opacity-80 md:text-xl text-base">
                        {anime?.description ?? anime?.synopsis ?? "N/A"}
                    </p>
                </div>
            </div>

            <div className="px-[12px] md:px-[40px] grid grid-cols-none md:grid-cols-[250px_auto] md:mt-[50px] md:gap-[18px]">
                <aside>
                    <div className='space-y-4'>
                        <div className='p-2 rounded-md bg-[#152232]/80'>
                            <AnimePropItem label='Episodes' text={anime?.totalEpisodes ?? '-'} >
                                <StarIcon className='text-yellow-500 w-5' />
                            </AnimePropItem>
                        </div>
                        <div className='p-2 rounded-md bg-[#152232]/80'>
                            <AnimePropItem label='Type' text={anime?.type ?? '-'} >
                                <HeartIcon className='text-red-500 w-5' />
                            </AnimePropItem>
                        </div>
                    </div>

                    <div className='p-2 mt-4 rounded-md bg-[#152232]/80'>
                        {
                            Array.isArray(anime?.genres) && anime.genres.length > 0 && (
                                <AnimePropItem label='Genres' text={anime.genres.join(', ')} />
                            )
                        }
                    </div>
                </aside>

                <EpisodesPreview episodes={anime?.episodes || []} />
            </div>
        </div>
    )
}

export default AnimeDetail


export async function getServerSideProps(context) {
    const { id } = context.query;
    const animeRes = await getSingleAnime(id)

    return {
        props: {
            anime: {
                anime: animeRes?.data ?? {}
            }
        }
    }
}
