import { Card, Col, Row } from 'antd';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import TableCard from '../components/TableCard';
import { useDataSource, useMetrics } from '../hooks';
import { House } from '../types';

const ChartCard = dynamic(() => import('../components/ChartCard'), {
  ssr: false,
});

export const getStaticProps = async () => {
  const result = await fetch('https://chengducity.herokuapp.com/api/v1/houses');

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

export default function Home({
  houses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { houses: dataSource } = useDataSource(houses);

  const {
    currentMonthData,
    currentQuarterData,
    currentYearData,
    prevMonthData,
    prevQuarterData,
    prevYearData,
    monthOfData,
    regionOfData,
  } = useMetrics(dataSource);

  const boxList = [
    {
      title: '本月',
      extra: '相比上月',
      current: currentMonthData,
      prev: prevMonthData,
    },
    {
      title: '本季',
      extra: '相比上季',
      current: currentQuarterData,
      prev: prevQuarterData,
    },
    {
      title: '本年',
      extra: '相比上年',
      current: currentYearData,
      prev: prevYearData,
    },
  ];

  return (
    <Layout className="bg-gray-100">
      <main>
        <div className="m-5">
          <Row gutter={16}>
            {boxList.map((item) => {
              const currentNum = item.current.length;
              const prevNum = item.prev.length;
              const diffNum = currentNum - prevNum;

              const currentData = item.current.reduce(
                (acc, cur) => acc + Number(cur.number),
                0,
              );
              const prevData = item.prev.reduce(
                (acc, cur) => acc + Number(cur.number),
                0,
              );
              const diffData = currentData - prevData;
              return (
                <Col key={item.title} span={6}>
                  <Card title={item.title} extra={item.extra}>
                    <div className="flex justify-between">
                      <span>楼盘数：{currentNum}</span>

                      <span
                        className={
                          diffNum < 0 ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {diffNum}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>
                        房源数：
                        {currentData}
                      </span>

                      <span
                        className={
                          diffData < 0 ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {diffData}
                      </span>
                    </div>
                  </Card>
                </Col>
              );
            })}

            <Col span={6}>
              <Card title="汇总">
                <div>楼盘数：{dataSource.length}</div>
                <div>
                  房源数：
                  {dataSource.reduce((acc, cur) => acc + Number(cur.number), 0)}
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <ChartCard
          className="mx-5 mb-5"
          monthOfData={monthOfData}
          regionOfData={regionOfData}
        ></ChartCard>

        <TableCard className="mx-5" dataSource={dataSource}></TableCard>
      </main>
    </Layout>
  );
}
