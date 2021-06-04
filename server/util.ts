import crypto from 'crypto';
import { House } from './models';

export function md5(value: string) {
  const hash = crypto.createHash('md5');
  return hash.update(value).digest('hex');
}

export function delay(num: number) {
  return new Promise((resolve) => setTimeout(resolve, num));
}

export function composeContent({
  region,
  name,
  details,
  quantity,
  startedAt,
  finishedAt,
  status,
}: House) {
  return (
    `${region} ${name} ${status}\n\n` +
    `${startedAt} ~ ${finishedAt}\n\n` +
    `${details}\n\n${quantity}套`
  );
}
