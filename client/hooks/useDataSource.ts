import { useDispatch, useSelector } from 'react-redux';
import { useHousesQuery } from '../generated/graphql';
import { selectHouses } from '../store';

export function useDataSource(initialData?: House[]) {
  const dispatch = useDispatch();

  // const { data } = useSWR<House[], Error>('/api/v1/houses', {
  //   initialData,
  // });

  // const list = data ?? [];

  const { data } = useHousesQuery();

  const list = data?.houses ?? [];

  const item = list[0];
  console.log(item);

  // useEffect(() => {
  //   dispatch(addHouses({ houses: list }));
  // }, [list.map((i) => i.uuid).join(',')]);

  const { houses } = useSelector(selectHouses);

  return {
    houses,
  };
}
