import crypto from 'crypto';

export function md5(value: string) {
  const hash = crypto.createHash('md5');
  return hash.update(value).digest('base64');
}

export function delay(num: number) {
  return new Promise((resolve) => setTimeout(resolve, num));
}
