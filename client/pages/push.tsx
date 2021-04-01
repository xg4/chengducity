import { Button, Form, Input, message } from 'antd';

export default function Push() {
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    const result = await fetch('/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      const msg = await result.json();
      message.error(msg);
      return;
    }
    form.resetFields();
    message.success('发送成功');
  };
  return (
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
          If you want to push messages for yourself, use `/token` command to get
          the token on Telegram bot.
        </p>
      </div>
      <Form className="w-5/6" layout="vertical" form={form} onFinish={onSubmit}>
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
          <Button type="primary" htmlType="submit">
            发送
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
