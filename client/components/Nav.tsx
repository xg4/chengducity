import { GithubOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, message, notification, Tooltip } from 'antd';
import { uniqBy } from 'lodash';
import { useCallback } from 'react';
import {
  usePullHousesMutation,
  useRecordsCountQuery,
} from '../generated/graphql';
import ActiveLink from './ActiveLink';

interface NavProps {
  links: { name: string; path: string }[];
}

export default function Nav({ links }: NavProps) {
  const [pull, { loading }] = usePullHousesMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          houses(existingHouses) {
            const newHouses = data?.pullHouses ?? [];
            if (!newHouses.length) {
              return existingHouses;
            }
            return uniqBy([...newHouses, ...existingHouses], 'uuid');
          },
          recordsCount(oldRecords) {
            return oldRecords ? oldRecords + 1 : 1;
          },
        },
      });
    },
  });

  const { data: recordsData } = useRecordsCountQuery();

  const pullHouses = useCallback(async () => {
    try {
      const { data } = await pull();
      if (data && data.pullHouses.length) {
        notification.success({
          message: '拉取成功',
          description: `新数据${data.pullHouses.length}条`,
        });
      }
    } catch (err) {
      message.error(err.message);
    }
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
        {recordsData ? (
          <span className="mr-2">累计查询：{recordsData.recordsCount}次</span>
        ) : null}

        <Tooltip title="Telegram 订阅，有新房源或者房源状态发生变化时，进行推送">
          <Button
            className="mr-2"
            type="link"
            href="https://t.me/chengducitybot"
            target="_blank"
          >
            订阅
          </Button>
        </Tooltip>

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
