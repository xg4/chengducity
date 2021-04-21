import { Card } from 'antd';
import {
  Chart,
  DonutChart,
  Interaction,
  Interval,
  Line,
  Point,
  Tooltip,
} from 'bizcharts';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { groupBy, orderBy } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import Rank from '../../components/Rank';
import TableCard from '../../components/TableCard';
import { House } from '../../generated/graphql';
import { useMetrics } from '../../hooks';

interface RegionCardProps {
  className?: string;
  houses: House[];
}

const colors = ['#6394f9', '#62daaa'];
const scale = {
  number: {
    alias: '房源数',
  },
  length: {
    alias: '楼盘数',
  },
};

function RegionCard({ houses, className }: RegionCardProps) {
  const regionsOfData = groupBy(houses, 'region');
  const regions = Object.keys(regionsOfData);

  const [tab, setTab] = useState('全部');
  houses = regions.includes(tab) ? regionsOfData[tab] : houses;
  const tabs = [{ key: '全部', tab: '全部' }].concat(
    regions.map((tab) => ({ key: tab, tab })),
  );

  const months = groupBy(
    houses,
    (item) => dayjs(item.ends_at).month() + 1 + '月',
  );

  const data = Object.entries(months).map(([key, houses]) => ({
    month: key,
    length: houses.length,
    number: houses.reduce((acc, cur) => acc + Number(cur.number), 0),
  }));

  return (
    <Card
      tabList={tabs}
      activeTabKey={tab}
      onTabChange={setTab}
      className={clsx(className)}
    >
      <div className="flex justify-between h-80">
        <div className="w-1/2">
          <Chart scale={scale} autoFit data={data}>
            <Tooltip shared />
            <Interval position="month*number" color={colors[0]} />
            <Line
              position="month*length"
              color={colors[1]}
              size={3}
              shape="smooth"
            />
            <Point
              position="month*length"
              color={colors[1]}
              size={3}
              shape="circle"
            />
            <Interaction type="active-region" />
          </Chart>
        </div>
        <div className="w-1/4">
          <DonutChart
            data={data}
            autoFit
            radius={0.8}
            padding="auto"
            angleField="number"
            colorField="month"
            pieStyle={{ stroke: 'white', lineWidth: 5 }}
          />
        </div>
        <Rank
          className="w-1/5"
          dataSource={houses.map((item, index) => ({
            key: item.name + index,
            name: item.name,
            value: +item.number,
          }))}
        ></Rank>
      </div>
    </Card>
  );
}

function Summary({
  houses,
  className,
}: {
  houses: House[];
  className?: string;
}) {
  const regionsOfData = groupBy(houses, 'region');
  const _regionsChart = Object.entries(regionsOfData).map(
    ([region, houses]) => ({
      region,
      length: houses.length,
      number: houses.reduce((acc, cur) => acc + Number(cur.number), 0),
    }),
  );
  const regionsChart = orderBy(
    _regionsChart,
    ['number', 'length'],
    ['desc', 'desc'],
  );

  return (
    <Card title="区域汇总" className={className}>
      <Chart scale={scale} autoFit height={400} data={regionsChart}>
        <Tooltip shared />
        <Interval position="region*number" color={colors[0]} />
        <Line
          position="region*length"
          color={colors[1]}
          size={3}
          shape="smooth"
        />
        <Point
          position="region*length"
          color={colors[1]}
          size={3}
          shape="circle"
        />
        <Interaction type="active-region" />
      </Chart>
    </Card>
  );
}

export default function Years() {
  const { query } = useRouter();
  const year = query.year as string;
  const { yearOfData } = useMetrics();
  const houses = orderBy(
    yearOfData[year] ?? [],
    ['ends_at', 'starts_at', 'uuid'],
    ['asc', 'asc', 'asc'],
  );

  return (
    <Layout className="bg-gray-100">
      <Head>
        <title>{year}年成都房源信息 - Chengdu City</title>
      </Head>

      <RegionCard className="m-5" houses={houses}></RegionCard>
      <Summary className="mx-5 mb-5" houses={houses}></Summary>
      <TableCard className="mx-5" dataSource={houses}></TableCard>
    </Layout>
  );
}
