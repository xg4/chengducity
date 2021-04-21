import { Card, Table } from 'antd';
import { House } from '../generated/graphql';

interface TableCardProps {
  dataSource: House[];
  className?: string;
}

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

export default function TableCard({ dataSource, className }: TableCardProps) {
  return (
    <Card className={className}>
      <Table
        rowKey="uuid"
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: true,
        }}
      ></Table>
    </Card>
  );
}
