import { Chart, Interval, Tooltip } from 'bizcharts';
import { Dictionary, flatten, reverse, sortBy } from 'lodash';
import { House } from '../types';

interface RegionChartProps {
  regionOfData: Dictionary<House[]>;
}

export default function RegionChart({ regionOfData }: RegionChartProps) {
  const _data = Object.entries(regionOfData).map(([region, houses]) => {
    return [
      {
        region: region,
        value: houses.reduce((acc, cur) => acc + Number(cur.number), 0),
        name: '房源数',
      },
      {
        region: region,
        name: '楼盘数',
        value: houses.length,
      },
    ];
  });

  const data = reverse(sortBy(flatten(_data), 'value'));
  return (
    <div>
      <div style={{ textAlign: 'center', fontWeight: 'bolder' }}>
        区域统计图
      </div>
      <Chart height={300} padding="auto" data={data} autoFit>
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          position="region*value"
          color="name"
        />
        <Tooltip shared />
      </Chart>
    </div>
  );
}
