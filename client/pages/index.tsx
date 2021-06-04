import { Col, Row } from 'antd';
import { orderBy } from 'lodash';
import dynamic from 'next/dynamic';
import DiffCard from '../components/DiffCard';
import Layout from '../components/Layout';
import TableCard from '../components/TableCard';
import { useMetrics } from '../hooks';

const ChartCard = dynamic(() => import('../components/ChartCard'), {
  ssr: false,
});

export default function Home() {
  const {
    dataSource: houses,
    currentMonthData,
    currentQuarterData,
    currentWeekData,
    prevMonthData,
    prevQuarterData,
    prevWeekData,
    monthOfData,
    regionOfData,
  } = useMetrics();

  const dataSource = orderBy(
    houses,
    ['finishedAt', 'startedAt', 'uuid'],
    ['desc', 'desc', 'desc'],
  );

  const cardList = [
    {
      title: '本周',
      extra: '相比上周',
      currentData: currentWeekData,
      prevData: prevWeekData,
    },
    {
      title: '本月',
      extra: '相比上月',
      currentData: currentMonthData,
      prevData: prevMonthData,
    },
    {
      title: '本季',
      extra: '相比上季',
      currentData: currentQuarterData,
      prevData: prevQuarterData,
    },
    {
      title: '汇总',
      currentData: dataSource,
      prevData: dataSource,
    },
  ];

  return (
    <Layout className="bg-gray-100">
      <main>
        <div className="m-5">
          <Row gutter={16}>
            {cardList.map((item) => {
              return (
                <Col key={item.title} span={6}>
                  <DiffCard {...item}></DiffCard>
                </Col>
              );
            })}
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
