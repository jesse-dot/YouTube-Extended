/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import useFetchVideosData from '@/Hooks/useFetchVideosData';
import Spinner from '@/loading';
import VideoCard from '@components/Homepage/VideoCard';
import { useAppSelector } from '@store/hooks';
import { RootState } from '@store/store';
import { SERVER_URL, API_KEY } from '@/utils/constants';

const VideoContainer = () => {
  const searchTerm: string = useAppSelector(
    (store: RootState) => store.filterApp.data,
  );

  const FilterSearchAPI: string = `${SERVER_URL}/videos?search=${searchTerm}&apiKey=${API_KEY}`;

  // ? useFetchVideosData is the custom Hook(Purpose is to fetch Data)
  const { data, isLoading, isError, error, refetch } = useFetchVideosData(
    'HomePage Videos',
    searchTerm === '' ? `${SERVER_URL}/videos?apiKey=${API_KEY}` : FilterSearchAPI,
    true,
  );

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  //* Handling Errors
  if (isLoading) return <Spinner />;

  if (data?.error?.code === 403) {
    return (
      <div className="grid h-screen place-items-center">
        <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent">
          Search API Limit Exceeded. Please try after sometime.
        </h1>
      </div>
    );
  }

  if (isError) return `Error: ${(error as Error).message}`;

  return (
    <div className="ml-10 flex flex-wrap gap-4">
      {data?.items?.map((item: any) => (
        <Link
          href={`/watch?v=${item.id}`}
          key={item.id}
        >
          <VideoCard info={item} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
