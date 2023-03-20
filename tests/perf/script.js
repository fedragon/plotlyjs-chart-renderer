import { check } from 'k6';
import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const charts = new SharedArray('charts', function () {
  return JSON.parse(open('./charts.json'));
});

export const options = {
  scenarios: {
    performance: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 500,
    },
  },
};

const url = 'http://imggen.default.svc.cluster.local:3000';
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default () => {
  const data = randomItem(charts);
  const res = http.post(url, JSON.stringify(data), params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'Content-Type header': (r) => res.headers['Content-Type'] === 'application/octet-stream',
  });
};
