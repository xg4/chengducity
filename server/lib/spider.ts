import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { House } from '../models';
import { delay } from '../util';

const pageSize = 10;

// 定时任务
export async function task(page = 1, isAll = false) {
  const list = await take(page);

  await Promise.all(
    list.map(async (item) => {
      const savedHouses = await House.findOne({
        uuid: item.uuid,
      });

      const house = House.create(item);

      if (savedHouses?.status !== house.status) {
        // TODO: push telegram message
      }

      await house.save();
    }),
  );

  if (list.length < pageSize || !isAll) {
    return;
  }

  await delay(1 * 1e3);
  await task(page + 1);
}

export async function take(page: number) {
  const dataSource = await spider(page);

  const list = dataSource.map(filterData);

  return list;
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

  if (trList[0][14] !== '查看') {
    throw new Error('[spider]: Source data has changed');
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
