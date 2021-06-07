import cheerio from 'cheerio';
import dayjs from 'dayjs';
import fetch from 'node-fetch';
import { delay, md5 } from 'server/util';

const debug = require('debug')('lib:spider');

const pageSize = 10;

export interface RemoteHouses {
  uuid: string;
  region: string;
  name: string;
  details: string;
  quantity: number;
  startedAt: Date;
  finishedAt: Date;
  status: string;
  hash: string;
}

type PullType = 'day' | 'week' | 'month' | 'all';

export async function pull(
  page = 1,
  type: PullType = 'day',
): Promise<RemoteHouses[]> {
  debug(`type:${type} page:${page}`);
  const dataSource = await spider(page);

  const currentList = dataSource.map(filterData);

  if (type === 'day') {
    const isLatestDay = currentList.every(
      (item) => dayjs().diff(item.finishedAt, 'day') === 0,
    );
    if (isLatestDay) {
      await delay(1 * 1e3);
      const nextList = await pull(page + 1, type);
      return [...currentList, ...nextList];
    }
  }

  if (type === 'week') {
    const isLatestWeek = currentList.every(
      (item) => dayjs().diff(item.finishedAt, 'week') === 0,
    );
    if (isLatestWeek) {
      await delay(1 * 1e3);
      const nextList = await pull(page + 1, type);
      return [...currentList, ...nextList];
    }
  }

  if (type === 'month') {
    const isLatestMonth = currentList.every(
      (item) => dayjs().diff(item.finishedAt, 'month') === 0,
    );
    if (isLatestMonth) {
      await delay(1 * 1e3);
      const nextList = await pull(page + 1, type);
      return [...currentList, ...nextList];
    }
  }

  if (type === 'all' && currentList.length === pageSize) {
    await delay(1 * 1e3);
    const nextList = await pull(page + 1, type);
    return [...currentList, ...nextList];
  }

  return currentList;
}

async function spider(pageNo: number) {
  const result = await fetch(
    `https://zw.cdzj.chengdu.gov.cn/lottery/accept/projectList?pageNo=${pageNo}`,
    {
      method: 'post',
    },
  ).then((res) => res.text());

  const $ = cheerio.load(result);

  const trList: string[][] = [];
  $('#_projectInfo > tr').each((_, tr) => {
    const tdList: string[] = [];
    $(tr)
      .find('td')
      .each((_, td) => {
        tdList.push($(td).text());
      });

    trList.push(tdList);
  });

  // 数据可能发生改变
  if (trList[0] && trList[0][14] !== '查看') {
    debug('Source data has changed');
    throw new Error('Source data has changed');
  }

  return trList;
}

function filterData(data: string[]) {
  const [
    uuid,
    _,
    region,
    name,
    ______,
    details,
    quantity,
    __,
    startedAt,
    finishedAt,
    ___,
    ____,
    _____,
    status,
  ] = data;
  const hash = md5(data.join());
  return {
    uuid,
    region,
    name,
    details,
    quantity: Number(quantity),
    startedAt: dayjs.tz(startedAt, 'Asia/Shanghai').toDate(),
    finishedAt: dayjs.tz(finishedAt, 'Asia/Shanghai').toDate(),
    status,
    hash,
  };
}
