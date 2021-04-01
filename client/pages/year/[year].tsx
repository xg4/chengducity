import { Chart, Interaction, Interval, Line, Point, Tooltip } from 'bizcharts';
import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Layout from '../../components/Layout';
import { House } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetch('https://chengducity.herokuapp.com/api/v1/years');

  if (!result.ok) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const years: string[] = await result.json();

  const paths = years.map((year) => ({
    params: { year },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  const result = await fetch(
    `https://chengducity.herokuapp.com/api/v1/year/${year}`,
  );

  if (!result.ok) {
    return {
      props: {
        houses: [],
      },
    };
  }

  const houses: House[] = await result.json();

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
      <Tooltip shared />
      <Interval position="month*number" color={colors[0]} />
      <Line position="month*length" color={colors[1]} size={3} shape="smooth" />
      <Point
        position="month*length"
        color={colors[1]}
        size={3}
        shape="circle"
      />
      <Interaction type="active-region" />
    </Chart>
  );
}

export default function Years({
  houses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <YearlyChart houses={houses}></YearlyChart>
    </Layout>
  );
}
