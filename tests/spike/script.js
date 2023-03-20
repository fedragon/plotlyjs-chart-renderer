import http from 'k6/http';
import { check } from 'k6';

const url = 'http://imggen.default.svc.cluster.local:3000';
const data = '{"test": 1}';
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default () => {
  const res = http.post(url, data, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'Content-Type header': (r) => res.headers['Content-Type'] === 'application/octet-stream',
  });
};
