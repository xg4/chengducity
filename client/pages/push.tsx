import { Button, Form, Input, message, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Head from 'next/head';
import { useState } from 'react';
import { v4 } from 'uuid';
import { usePushMessageMutation } from '../generated/graphql';

interface Record {
  id: string;
  token: string;
  content: string;
  createdAt: Dayjs;
}

const columns = [
  {
    title: 'Token',
    dataIndex: 'token',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '推送时间',
    dataIndex: 'createdAt',
    render(createdAt: Dayjs) {
      return createdAt.format('YYYY-MM-DD HH:mm:ss');
    },
  },
];

export default function Push() {
  const [form] = Form.useForm();

  const [records, setRecords] = useState<Record[]>([]);

  const [push, { loading }] = usePushMessageMutation();

  const onSubmit = async (data: any) => {
    const result = await push({ variables: { data } });

    if (result.errors) {
      const error = result.errors[0];
      message.error(error.message);
      return;
    }

    if (!result.data?.pushMessage) {
      message.error('发送失败');
      return;
    }

    setRecords([{ ...data, createdAt: dayjs(), id: v4() }, ...records]);
    form.setFields([{ name: 'content', value: '' }]);
    message.success('发送成功');
  };

  return (
    <>
      <Head>
        <title>Telegram Bot Push - Chengdu City</title>
      </Head>
      <div className="mx-auto max-w-2xl flex">
        <div className="shadow bg-gray-100 p-4 mr-5">
          <p className="text-red-600">
            Hello Everyone, welcome to{' '}
            <span className="font-bold">Chengdu City Bot</span>
          </p>
          <p>
            Now you can jump{' '}
            <a
              className="underline text-blue-400"
              href="https://t.me/chengducitybot"
            >
              t.me/chengducitybot
            </a>{' '}
            to get Telegram bot
          </p>
          <p>
            If you want to push messages for yourself, use `/token` command to
            get the token on Telegram bot.
          </p>
        </div>
        <Form
          className="w-5/6"
          layout="vertical"
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            label="token"
            name="token"
            rules={[{ required: true, message: '请输入token' }]}
          >
            <Input placeholder="请输入token"></Input>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Input.TextArea placeholder="请输入内容"></Input.TextArea>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
      </div>

      {records.length ? (
        <Table
          className="m-5"
          rowKey="id"
          columns={columns}
          dataSource={records}
        ></Table>
      ) : null}
    </>
  );
}
