import { GithubOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, message, notification } from 'antd';
import { uniqBy } from 'lodash';
import { useCallback } from 'react';
import { client } from '../apollo';
import {
  HousesDocument,
  RecordsCountDocument,
  useHousesQuery,
  usePullHousesMutation,
  useRecordsCountQuery,
} from '../generated/graphql';
import ActiveLink from './ActiveLink';

interface NavProps {
  links: { name: string; path: string }[];
}

export default function Nav({ links }: NavProps) {
  const [pull, { loading }] = usePullHousesMutation();

  const { data: housesData } = useHousesQuery();
  const { data: recordsData } = useRecordsCountQuery();

  const pullHouses = useCallback(async () => {
    try {
      const { data } = await pull();
      if (data) {
        client.writeQuery({
          query: RecordsCountDocument,
          data: {
            recordsCount: recordsData ? recordsData.recordsCount + 1 : 1,
          },
        });
        if (data.pullHouses.length) {
          const oldHouses = housesData?.houses ?? [];
          const newHouses = data.pullHouses;
          client.writeQuery({
            query: HousesDocument,
            data: {
              houses: uniqBy([...newHouses, ...oldHouses], 'uuid'),
            },
          });
          notification.success({
            message: '拉取成功',
            description: `新数据${data.pullHouses.length}条`,
          });
        }
      }
    } catch (err) {
      message.error(err.message);
    }
  }, [pull, housesData, recordsData]);

  return (
    <nav className="bg-white flex justify-between items-center">
      <ul className="flex list-none p-0 m-0">
        {links.map((link) => (
          <li className="p-4" key={link.name}>
            <ActiveLink activeClassName="text-blue-500" href={link.path}>
              <a className="text-gray-800">{link.name}</a>
            </ActiveLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center">
        {recordsData ? (
          <span className="mr-2">累计查询：{recordsData.recordsCount}次</span>
        ) : null}
        <Button
          className="mr-2"
          type="link"
          icon={<SyncOutlined className="text-gray-800 text-xl" />}
          onClick={pullHouses}
          loading={loading}
        ></Button>
        <Button
          href="https://github.com/xg4/chengducity"
          target="_blank"
          type="link"
          icon={
            <GithubOutlined className="text-gray-800 text-xl"></GithubOutlined>
          }
        ></Button>
      </div>
    </nav>
  );
}
