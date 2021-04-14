import { GithubOutlined, SyncOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useCallback } from 'react';
import {
  HousesDocument,
  usePullHousesMutation,
  useRecordsCountQuery,
} from '../generated/graphql';
import ActiveLink from './ActiveLink';

interface NavProps {
  links: { name: string; path: string }[];
}

export default function Nav({ links }: NavProps) {
  const [pull, { loading }] = usePullHousesMutation({
    refetchQueries: [{ query: HousesDocument }],
  });

  const { data } = useRecordsCountQuery();

  const pullHouses = useCallback(() => {
    pull();
  }, [pull]);

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
        {data ? (
          <span className="mr-2">累计查询：{data.recordsCount}次</span>
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
