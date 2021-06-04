import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { useMemo } from 'react';
import { House, useHousesQuery } from '../generated/graphql';

export function useMetrics() {
  const { data: dataSource, loading } = useHousesQuery();
  const data = (dataSource?.houses ?? []) as House[];
  const key = data.map((item) => item.uuid).join();

  return useMemo(() => {
    const yearOfData = groupBy(data, (item) =>
      dayjs(item.finishedAt).get('year'),
    );
    const monthOfData = groupBy(data, (item) =>
      dayjs(item.finishedAt).format('YYYY-MM'),
    );
    const quarterOfData = groupBy(data, (item) => {
      const d = dayjs(item.finishedAt);
      return `${d.get('year')}-${d.quarter()}`;
    });

    const weekOfData = groupBy(data, (item) => {
      const d = dayjs(item.finishedAt);
      return `${d.weekYear()}-${d.week()}`;
    });

    const currentDate = dayjs();

    const prevWeek = currentDate.subtract(1, 'week');
    const currentWeekData =
      weekOfData[`${currentDate.weekYear()}-${currentDate.week()}`] ?? [];
    const prevWeekData =
      weekOfData[`${prevWeek.weekYear()}-${prevWeek.week()}`] ?? [];

    const prevYear = currentDate.subtract(1, 'year');
    const currentYearData = yearOfData[currentDate.format('YYYY')] ?? [];
    const prevYearData = yearOfData[prevYear.format('YYYY')] ?? [];

    const prevQuarter = currentDate.subtract(1, 'quarter');
    const currentQuarterData =
      quarterOfData[`${currentDate.get('year')}-${currentDate.quarter()}`] ??
      [];
    const prevQuarterData =
      quarterOfData[`${prevQuarter.get('year')}-${prevQuarter.quarter()}`] ??
      [];

    const prevMonth = currentDate.subtract(1, 'month');
    const currentMonthData = monthOfData[currentDate.format('YYYY-MM')] ?? [];
    const prevMonthData = monthOfData[prevMonth.format('YYYY-MM')] ?? [];

    const regionOfData = groupBy(data, 'region');
    return {
      dataSource: data,
      loading,
      currentWeekData,
      prevWeekData,
      currentYearData,
      prevYearData,
      currentQuarterData,
      prevQuarterData,
      currentMonthData,
      prevMonthData,
      yearOfData,
      monthOfData,
      quarterOfData,
      regionOfData,
    };
  }, [key]);
}
