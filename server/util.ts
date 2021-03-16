import crypto from 'crypto';
import { House } from './models';

export function md5(value: string) {
  const hash = crypto.createHash('md5');
  return hash.update(value).digest('base64');
}

export function delay(num: number) {
  return new Promise((resolve) => setTimeout(resolve, num));
}

export function composeContent({
  region,
  name,
  details,
  number,
  starts_at,
  ends_at,
  status,
}: House) {
  return (
    `${region} ${name} ${status}\n\n` +
    `${starts_at} ~ ${ends_at}\n\n` +
    `${details}\n\n${number}套`
  );
}
