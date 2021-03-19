import { Button, Form, Input, message } from 'antd';

export default function Push() {
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
    message.success('发送成功');
  };
  return (
    <div style={{ width: 400, margin: '0 auto' }}>
      <Form onFinish={onSubmit}>
        <Form.Item label="token" name="token">
          <Input></Input>
        </Form.Item>
        <Form.Item label="内容" name="content">
          <Input.TextArea></Input.TextArea>
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
