import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 virtual users
  duration: '30s', // run for 30 seconds
};

export default function () {
  // Make GET request to the reqres.in API
  const response = http.get('https://reqres.in/api/users?page=2');

  // Check that the response is successful
  check(response, {
    'status is 200': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'response contains data': (r) => r.json('data') !== undefined,
    'response has correct page': (r) => r.json('page') === 2,
  });

  // Sleep for 1 second between requests
  sleep(1);
}
