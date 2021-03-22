import { Chart, Interval, Line, Point, Tooltip } from 'bizcharts';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { House } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetch('https://chengducity.herokuapp.com/houses');
  const data: House[] = await result.json();
  const yearOfData = groupBy(data, (item) => dayjs(item.ends_at).year());

  const paths = Object.keys(yearOfData).map((key) => ({
    params: { years: key },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const result = await fetch('https://chengducity.herokuapp.com/houses');
  const data: House[] = await result.json();
  const yearOfData = groupBy(data, (item) => dayjs(item.ends_at).year());

  const year = params?.years as string;

  const houses = yearOfData[year];
  return {
    props: {
      houses,
    },
  };
};

function YearlyChart({ houses }: { houses: House[] }) {
  const colors = ['#6394f9', '#62daaa'];
  const scale = {
    number: {
      alias: '房源数',
    },
    length: {
      alias: '楼盘数',
    },
  };

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
    <Chart scale={scale} autoFit height={400} data={data}>
      {/*  如需使用单轴 
  <Axis name="waiting" visible={true} />
  <Axis name="people" visible={false} /> 
  */}

      <Tooltip shared />
      <Interval position="month*number" color={colors[0]} />
      <Line position="month*length" color={colors[1]} size={3} shape="smooth" />
      <Point
        position="month*length"
        color={colors[1]}
        size={3}
        shape="circle"
      />
    </Chart>
  );
}

export default function Years({
  houses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(houses);
  return (
    <div>
      Yearly Summary
      <YearlyChart houses={houses}></YearlyChart>
    </div>
  );
}
