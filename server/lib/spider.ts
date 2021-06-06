import cheerio from 'cheerio';
import dayjs from 'dayjs';
import fetch from 'node-fetch';
import { PullRequest } from 'server/models';
import { delay, md5 } from 'server/util';

const debug = require('lib:spider');

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

type PullType = 'first' | 'recent' | 'all';

async function _pull(page = 1, type: PullType = 'recent') {
  debug(`type ${type} page ${page}`);
  const dataSource = await spider(page);

  const currentList = dataSource.map(filterData);

  const isRecent = currentList.every(
    (item) => dayjs().diff(item.finishedAt, 'month') === 0,
  );

  if (type === 'first') {
    return currentList;
  }

  let list: RemoteHouses[] = [];

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
  const record = await PullRequest.findOne({
    where: {
      type,
    },
    order: {
      id: 'DESC',
    },
  });

  if (record) {
    if (type === 'first' && dayjs().diff(record.createdAt, 'minute') === 0) {
      throw new Error(`pull houses too fast, ${type}`);
    }
    if (type === 'recent' && dayjs().diff(record.createdAt, 'hour') === 0) {
      throw new Error(`pull houses too fast, ${type}`);
    }
    if (type === 'all' && dayjs().diff(record.createdAt, 'day') === 0) {
      throw new Error(`pull houses too fast, ${type}`);
    }
  }

  const houses = await _pull(page, type);

  const newRecord = PullRequest.create({ type });
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
    debug('Source data has changed');
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
