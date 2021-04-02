import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { orderBy } from 'lodash';
import { useState } from 'react';

interface RankProps {
  className?: string;
  title?: string;
  dataSource: {
    key: string;
    name: string;
    value: number;
  }[];
  rowKey?: string;
}

export default function Rank({
  dataSource,
  className,
  title,
  rowKey = 'key',
}: RankProps) {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div className="mb-2 flex justify-between items-center">
        <span>{title ?? '排名'}</span>

        <Button
          onClick={() => {
            if (order === 'desc') {
              setOrder('asc');
            } else {
              setOrder('desc');
            }
          }}
          type="link"
          icon={order === 'desc' ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
        ></Button>
      </div>
      <div className="overflow-auto pr-2">
        {orderBy(dataSource, 'value', order).map((item, index) => (
          <div
            key={(item as any)[rowKey]}
            className="flex justify-between items-center mb-4 text-sm"
          >
            <span>
              <span
                className={clsx(
                  'inline-flex justify-center items-center',
                  index < 3
                    ? 'bg-blue-500 text-gray-200'
                    : 'bg-gray-200 text-gray-800',
                  'rounded-full w-5 h-5 mr-4 text-sm',
                )}
              >
                {index + 1}
              </span>
              {item.name}
            </span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
