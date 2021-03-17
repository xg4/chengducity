import dayjs from 'dayjs';
import { useMemo } from 'react';
import { House } from '../types';

export function useMetrics(data: House[]) {
  const key = data.map((item) => item.uuid).join();

  return useMemo(() => {
    const quarterOfData = new Map<string, House[]>();
    const yearOfData = new Map<string, House[]>();
    const monthOfData = new Map<string, House[]>();

    for (const item of data) {
      const date = dayjs(item.ends_at);

      // 年度
      const yearKey = date.format('YYYY');
      const yearData = yearOfData.get(yearKey);
      if (yearData) {
        yearOfData.set(yearKey, [...yearData, item]);
      } else {
        yearOfData.set(yearKey, [item]);
      }

      // 季度
      const quarterKey = `${yearKey}-${date.quarter()}`;
      const quarterData = quarterOfData.get(quarterKey);
      if (quarterData) {
        quarterOfData.set(quarterKey, [...quarterData, item]);
      } else {
        quarterOfData.set(quarterKey, [item]);
      }

      // 月度
      const monthKey = date.format('YYYY-MM');
      const monthData = monthOfData.get(monthKey);
      if (monthData) {
        monthOfData.set(monthKey, [...monthData, item]);
      } else {
        monthOfData.set(monthKey, [item]);
      }
    }

    const currentDate = dayjs();

    const prevYear = currentDate.subtract(1, 'year');
    const currentYearData = yearOfData.get(currentDate.format('YYYY')) ?? [];
    const prevYearData = yearOfData.get(prevYear.format('YYYY')) ?? [];

    const prevQuarter = currentDate.subtract(1, 'quarter');
    const currentQuarterData =
      quarterOfData.get(
        `${currentDate.get('year')}-${currentDate.quarter()}`,
      ) ?? [];
    const prevQuarterData =
      quarterOfData.get(
        `${prevQuarter.get('year')}-${prevQuarter.quarter()}`,
      ) ?? [];

    const prevMonth = currentDate.subtract(1, 'month');
    const currentMonthData =
      monthOfData.get(currentDate.format('YYYY-MM')) ?? [];
    const prevMonthData = monthOfData.get(prevMonth.format('YYYY-MM')) ?? [];
    return {
      currentYearData,
      prevYearData,
      currentQuarterData,
      prevQuarterData,
      currentMonthData,
      prevMonthData,
      yearOfData,
      monthOfData,
      quarterOfData,
    };
  }, [key]);
}
