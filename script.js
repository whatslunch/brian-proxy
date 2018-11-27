import { check, sleep } from 'k6';
import http from 'k6/http';

const randomInt = max => Math.floor(Math.random() * max);

const randId = [8800000, 8700005, 8900000, 9100000, 8805000, 8700000];

export const options = {
  vus: 300,
  duration: '30s',
  rps: 1000
};

export default function() {
  const res = http.get(`http://localhost:3000/api/${randId[randomInt(randId.length)]}`);
    check(res, {
      'is status 200': r => r.status === 200,
      'transaction time < 200ms': r => r.timings.duration < 200,
      'transaction time < 500ms': r => r.timings.duration < 500,
      'transaction time < 1000ms': r => r.timings.duration < 1000,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
    });
    sleep(1);
}
