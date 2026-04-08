# Ndosi Automation Load Testing

This project contains k6 load tests for the **Ndosi Automation API**.

## Prerequisites

Make sure you have [k6](https://k6.io/) installed on your system.

### Installation Options
- **macOS**: `brew install k6`
- **Windows**: `choco install k6` or download the MSI from [k6.io](https://k6.io/docs/get-started/installation/)
- **Linux**: See official [installation guide](https://k6.io/docs/get-started/installation/#linux)
- **Node/npm**: `npm install -g k6` (though native installation is recommended)

## Test Configuration

The load test (`load-test.js`) is configured with the following defaults:
- **Virtual Users (VUs)**: 10
- **Duration**: 30 seconds
- **Target Endpoint**: `https://www.ndosiautomation.co.za/APIDEV/testimonials?limit=50&offset=0`

### Performance Thresholds
The test will fail if:
- **95% of requests** (p95) take longer than **500ms**.
- **Error rate** is greater than **1%**.

## Running the Tests

### Using npm scripts
```bash
# Basic run
npm test

# Run with JSON results output
npm run test-with-output
```

### Using k6 CLI directly
```bash
k6 run load-test.js

# Override configuration
k6 run --vus 20 --duration 1m load-test.js
```

## Test Validations (Checks)

The script performs the following checks for every request:
- `status is 200`: Verifies the API returned a successful response.
- `response time < 500ms`: Verifies the individual request was fast.
- `response contains data`: Ensures the response body has the expected 'data' field.

## Reporting

After the test completes, the following reports are generated:
- **Console Output**: A text summary of all metrics.
- **HTML Summary**: A `summary.html` file containing the performance results (rendered via `handleSummary`).
