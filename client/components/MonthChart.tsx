import { Chart, LineAdvance } from 'bizcharts';
import { Dictionary, flatten, reverse } from 'lodash';
import { House } from '../types';

interface MonthChartProps {
  monthOfData: Dictionary<House[]>;
}

export default function MonthChart({ monthOfData }: MonthChartProps) {
  const _data = Object.entries(monthOfData).map(([key, houses]) => [
    {
      name: '房源数',
      month: key,
      value: houses.reduce((acc, cur) => acc + Number(cur.number), 0),
    },
    {
      name: '楼盘数',
      month: key,
      value: houses.length,
    },
  ]);

  const data = reverse(flatten(_data));

  return (
    <div>
      <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>月统计图</div>
      <Chart autoFit height={300} data={data}>
        <LineAdvance
          shape="smooth"
          point
          area
          position="month*value"
          color="name"
        />
      </Chart>
    </div>
  );
}
