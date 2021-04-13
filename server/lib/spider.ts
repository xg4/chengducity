import cheerio from 'cheerio';
import dayjs from 'dayjs';
import fetch from 'node-fetch';
import { House, User } from '../models';
import { composeContent, delay } from '../util';
import { bot } from './bot';

const pageSize = 10;

export async function pull(page = 1) {
  console.log('[spider] page ', page);
  const dataSource = await spider(page);

  let list = dataSource.map(filterData);

  const isRecent = list.every(
    (item) => dayjs().diff(item.ends_at, 'month') === 0,
  );

  if (isRecent) {
    const nextList = await pull(page + 1);
    list = list.concat(nextList);
  }

  return list;
}

// 定时任务
export async function task(page = 1, isAll = false) {
  console.log('[spider] page ', page);
  const dataSource = await spider(page);

  const list = dataSource.map(filterData);
  const users = await User.find();

  await Promise.all(
    list.map(async (item) => {
      const savedHouses = await House.findOne({
        uuid: item.uuid,
      });

      const house = House.create(item);

      if (savedHouses?.status !== house.status) {
        await Promise.all(
          users.map((user) =>
            bot.telegram.sendMessage(
              user.telegram_chat_id,
              composeContent(house),
            ),
          ),
        );
      }

      await house.save();
    }),
  );

  if (list.length < pageSize || !isAll) {
    return;
  }

  await delay(1 * 1e3);
  await task(page + 1, isAll);
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
