import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { addHouses, selectHouses } from '../store';
import { House } from '../types';

export function useDataSource(initialData?: House[]) {
  const dispatch = useDispatch();

  const { data } = useSWR<House[], Error>('/houses', {
    initialData,
  });

  const list = data ?? [];

  useEffect(() => {
    dispatch(addHouses({ houses: list }));
  }, [list.map((i) => i.uuid).join(',')]);

  const { houses } = useSelector(selectHouses);

  return {
    houses,
  };
}
