import { Table } from 'antd';
import Head from 'next/head';
import useSWR from 'swr';

interface House {
  name: string;
}

export default function Home() {
  const { data } = useSWR<{ code: number; data: House[] }>('/houses');

  const loading = !data;

  const dataSource = data ? data.data : [];

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

  return (
    <div>
      <Head>
        <title>成都房源信息 - Chengdu City</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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

        <Table
          loading={loading}
          rowKey="uuid"
          columns={columns}
          dataSource={dataSource}
          pagination={{
            showSizeChanger: true,
          }}
        ></Table>
      </main>
    </div>
  );
}
