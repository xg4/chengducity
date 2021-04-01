import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Chart, LineAdvance } from 'bizcharts';
import clsx from 'clsx';
import { Dictionary, orderBy, sortBy } from 'lodash';
import { useState } from 'react';
import { House } from '../types';

interface MonthChartProps {
  monthOfData: Dictionary<House[]>;
  tabKey: string;
}

interface RankProps {
  className?: string;
  dataSource: {
    name: string;
    month: string;
    value: number;
  }[];
}

function Rank({ dataSource, className }: RankProps) {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');

  return (
    <div className={clsx(className, 'flex flex-col')}>
      <div className="mb-2 flex justify-between items-center">
        <span>排名：月份</span>

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
            key={item.month}
            className="flex justify-between items-center mb-4 text-base"
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
              {item.month}
            </span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MonthChart({ monthOfData, tabKey }: MonthChartProps) {
  const _data = Object.entries(monthOfData).map(([key, houses]) => [
    {
      name: '房源数',
      month: key,
      value: houses.reduce((acc, cur) => acc + Number(cur.number), 0),
    },
    {
      name: '楼盘数',
      month: key,
      value: houses.length,
    },
  ]);
  const data = sortBy(
    _data.flat().filter((i) => i.name === tabKey),
    'month',
  );

  return (
    <div>
      <div className="text-center font-bold">{tabKey} - 月份 - 统计图</div>
      <div className="flex justify-between h-80 overflow-hidden">
        <div className="w-3/4">
          <Chart autoFit data={data}>
            <LineAdvance
              shape="smooth"
              point
              area
              position="month*value"
              color="name"
            />
          </Chart>
        </div>

        <Rank className="w-1/5" dataSource={data}></Rank>
      </div>
    </div>
  );
}
