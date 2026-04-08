import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 virtual users
  duration: '30s', // run for 30 seconds
  thresholds: {
      http_req_duration: ['p(95)<500'],
      http_req_failed: ['rate<0.01'],
    },
};

export default function () {
  // Make GET request to the Ndosi Automation API
  const response = http.get('https://www.ndosiautomation.co.za/APIDEV/testimonials?limit=50&offset=0');

  // Check that the response is successful
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'response contains data': (r) => r.json('data') !== undefined,
  });

  // Sleep for 1 second between requests
  sleep(1);
}

import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    "summary.html": textSummary(data, { indent: " ", enableColors: false }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
