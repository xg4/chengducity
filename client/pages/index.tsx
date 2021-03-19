import { Card, Col, Row, Table } from 'antd';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import useSWR from 'swr';
import { useMetrics } from '../hooks';
import { House } from '../types';

const MonthChart = dynamic(() => import('../components/MonthChart'));
const RegionChart = dynamic(() => import('../components/RegionChart'));

export async function getStaticProps() {
  const result = await fetch('https://chengducity.herokuapp.com/houses');

  const data: House[] = await result.json();

  return {
    props: {
      houses: data,
    },
  };
}

export default function Home({
  houses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, error } = useSWR<House[], Error>('/houses', {
    initialData: houses,
  });

  const loading = !data && !error;

  const dataSource = data ?? [];

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '住房套数',
      dataIndex: 'number',
    },
    {
      title: '登记开始时间',
      dataIndex: 'starts_at',
    },
    {
      title: '登记结束时间',
      dataIndex: 'ends_at',
    },
    {
      title: '报名状态',
      dataIndex: 'status',
    },
  ];

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

  const list = [
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
    <div>
      <Head>
        <title>成都房源信息 - Chengdu City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ backgroundColor: '#f0f2f5' }}>
        {/* <div className="mx-auto max-w-md shadow mt-32 bg-gray-100 p-4">
          <p className="text-red-600">
            Hello Everyone, welcome to{' '}
            <span className="font-bold">Chengdu City</span>
          </p>
          <p>Web page, coming soon.</p>
          <p>
            Now you can talk to{' '}
            <a
              className="underline text-blue-400"
              href="https://t.me/chengducitybot"
            >
              t.me/chengducitybot
            </a>
            , using Telegram.
          </p>
        </div> */}

        <div style={{ padding: 20 }}>
          <Row gutter={16}>
            {list.map((item) => {
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>楼盘数：{currentNum}</span>

                      <span
                        style={
                          diffNum < 0
                            ? {
                                color: 'green',
                              }
                            : {
                                color: 'red',
                              }
                        }
                      >
                        {diffNum}
                      </span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>
                        房源数：
                        {currentData}
                      </span>

                      <span
                        style={
                          diffData < 0
                            ? {
                                color: 'green',
                              }
                            : {
                                color: 'red',
                              }
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

        <div style={{ padding: 20 }}>
          <div style={{ padding: 20, backgroundColor: '#fff' }}>
            <MonthChart monthOfData={monthOfData}></MonthChart>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ padding: 20, backgroundColor: '#fff' }}>
            <RegionChart regionOfData={regionOfData}></RegionChart>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          <Table
            loading={loading}
            rowKey="uuid"
            columns={columns}
            dataSource={dataSource}
            pagination={{
              showSizeChanger: true,
            }}
          ></Table>
        </div>
      </main>
    </div>
  );
}
