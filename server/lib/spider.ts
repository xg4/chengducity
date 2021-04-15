import cheerio from 'cheerio';
import dayjs from 'dayjs';
import fetch from 'node-fetch';
import { Record } from '../models';
import { delay } from '../util';

const pageSize = 10;

export interface HouseSource {
  uuid: string;
  region: string;
  name: string;
  details: string;
  number: string;
  starts_at: string;
  ends_at: string;
  status: string;
  source: string;
}

type PullType = 'first' | 'recent' | 'all';

async function _pull(page = 1, type: PullType = 'recent') {
  console.log('[spider] page ', page);
  const dataSource = await spider(page);

  const currentList = dataSource.map(filterData);

  const isRecent = currentList.every(
    (item) => dayjs().diff(item.ends_at, 'month') === 0,
  );

  if (type === 'first') {
    return currentList;
  }

  let list: HouseSource[] = [];

  if (isRecent && type === 'recent') {
    await delay(1 * 1e3);
    const nextList = await _pull(page + 1, type);
    list = [...currentList, ...nextList];
  }

  if (currentList.length === pageSize && type === 'all') {
    await delay(1 * 1e3);
    const nextList = await _pull(page + 1, type);
    list = [...currentList, ...nextList];
  }

  return list;
}

export async function pull(page = 1, type: PullType = 'recent') {
  const record = await Record.findOne({
    where: {
      type,
    },
    order: {
      id: 'DESC',
    },
  });

  if (record) {
    if (type === 'first' && dayjs().diff(record.created_at, 'minute') === 0) {
      throw new Error(`pull houses too fast, ${type}`);
    }
    if (type === 'recent' && dayjs().diff(record.created_at, 'hour') === 0) {
      throw new Error(`pull houses too fast, ${type}`);
    }
    if (type === 'all' && dayjs().diff(record.created_at, 'day') === 0) {
      throw new Error(`pull houses too fast, ${type}`);
    }
  }

  const houses = await _pull(page, type);

  const newRecord = Record.create({ type });
  await newRecord.save();

  return houses;
}

export async function spider(pageNo: number) {
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
    console.log('[spider]: Source data has changed');
    throw new Error('Source data has changed');
  }

  return trList;
}

export function filterData(data: string[]) {
  const [
    uuid,
    _,
    region,
    name,
    license_number,
    details,
    number,
    __,
    starts_at,
    ends_at,
    ___,
    ____,
    _____,
    status,
  ] = data;
  const source = data.join('|');
  return {
    uuid,
    region,
    name,
    details,
    number,
    starts_at,
    ends_at,
    status,
    source,
  };
}
