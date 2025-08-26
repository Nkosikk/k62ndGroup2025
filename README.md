# k6 Load Testing Project

This project contains k6 load tests for the reqres.in API.

## Prerequisites

Make sure you have k6 installed on your system:

### macOS Installation
```bash
brew install k6
```

### Alternative Installation Methods
- Download from: https://k6.io/docs/get-started/installation/
- Or use npm: `npm install -g k6`

## Test Configuration

The load test is configured with:
- **10 virtual users** (concurrent users)
- **30 seconds duration**
- **Target endpoint**: https://reqres.in/api/users?page=2

## Running the Tests

### Basic Test Run
```bash
k6 run load-test.js
```

### Run with JSON Output
```bash
npm run test-with-output
```

### Custom Configuration
You can override the test configuration using command line options:

```bash
# Run with 20 users for 60 seconds
k6 run --vus 20 --duration 60s load-test.js

# Run with different stages
k6 run --stage 10s:5 --stage 20s:10 --stage 10s:0 load-test.js
```

## Test Checks

The test includes the following validations:
- Response status is 200
- Response time is under 500ms
- Response contains data
- Response has correct page number (2)

## Results

After running the test, you'll see:
- HTTP request metrics (response times, throughput)
- Check pass/fail rates
- Virtual user activity
- Overall test summary
