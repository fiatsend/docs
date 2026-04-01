---
sidebar_position: 10
title: "Pagination"
description: "Navigate large result sets with cursor-based pagination on Fiatsend API list endpoints."
---

# Pagination

Fiatsend uses **cursor-based pagination** for all list endpoints that can return large result sets. Cursor-based pagination provides stable, consistent results even when new records are being created between page requests — unlike offset-based pagination, which can skip or duplicate records when the underlying data changes.

## Query Parameters

All paginated endpoints accept the following query parameters:

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `20` | Number of records to return per page. Minimum: `1`, maximum: `100`. |
| `cursor` | string | — | Opaque cursor string from a previous response. Omit for the first page. |
| `order` | string | `desc` | Sort order by creation date: `asc` (oldest first) or `desc` (newest first). |

## Response Format

Every paginated response includes a `pagination` object alongside the `data` array:

```json
{
  "status": 1,
  "code": "success",
  "message": "Results retrieved",
  "data": [
    { "id": "item_001", "..." : "..." },
    { "id": "item_002", "..." : "..." },
    { "id": "item_003", "..." : "..." }
  ],
  "pagination": {
    "cursor": "eyJpZCI6Iml0ZW1fMDAzIiwiY3JlYXRlZEF0IjoiMjAyNi0wMy0xN1QwODozMDowMFoifQ",
    "hasMore": true,
    "total": 247
  }
}
```

### Pagination Fields

| Field | Type | Description |
|---|---|---|
| `cursor` | string \| null | Opaque cursor to pass as the `cursor` query parameter for the next page. `null` when there are no more results. |
| `hasMore` | boolean | `true` if there are more results beyond this page, `false` if this is the last page. |
| `total` | integer | Total number of records matching the query (across all pages). |

:::note
The `cursor` value is an opaque string — do not attempt to parse or construct it manually. Its internal format may change without notice. Always use the cursor returned by a previous response.
:::

## Paginated Endpoints

The following endpoints support cursor-based pagination:

| Endpoint | Description | Default Order |
|---|---|---|
| `GET /api/transactions` | List all transactions (conversions and payouts) | `desc` (newest first) |
| `GET /api/beneficiaries` | List verified beneficiaries | `desc` (newest first) |

## Code Examples

### Fetching a Single Page

#### cURL

```bash
# First page — 10 most recent transactions
curl "https://api.fiatsend.com/api/transactions?limit=10&order=desc" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Next page — pass the cursor from the previous response
curl "https://api.fiatsend.com/api/transactions?limit=10&order=desc&cursor=eyJpZCI6Iml0ZW1fMDEwIn0" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### JavaScript (fetch)

```javascript
async function fetchTransactions(token, limit = 20, cursor = null) {
  const params = new URLSearchParams({ limit: String(limit), order: "desc" });

  if (cursor) {
    params.set("cursor", cursor);
  }

  const response = await fetch(
    `https://api.fiatsend.com/api/transactions?${params}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  return response.json();
}

// Fetch the first page
const firstPage = await fetchTransactions(token, 10);
console.log("Transactions:", firstPage.data);
console.log("Total:", firstPage.pagination.total);

// Fetch the next page if available
if (firstPage.pagination.hasMore) {
  const secondPage = await fetchTransactions(token, 10, firstPage.pagination.cursor);
  console.log("Next page:", secondPage.data);
}
```

### Paginating Through All Results

To iterate through all records, continue fetching pages until `hasMore` is `false`:

#### JavaScript (fetch)

```javascript
/**
 * Fetch all transactions by paginating through every page.
 *
 * @param {string} token - JWT authentication token
 * @param {number} pageSize - Records per page (max 100)
 * @returns {Array} All transactions
 */
async function fetchAllTransactions(token, pageSize = 50) {
  const allTransactions = [];
  let cursor = null;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      limit: String(pageSize),
      order: "desc",
    });

    if (cursor) {
      params.set("cursor", cursor);
    }

    const response = await fetch(
      `https://api.fiatsend.com/api/transactions?${params}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (result.status !== 1) {
      throw new Error(`API error: ${result.message}`);
    }

    allTransactions.push(...result.data);
    cursor = result.pagination.cursor;
    hasMore = result.pagination.hasMore;

    console.log(
      `Fetched ${allTransactions.length} of ${result.pagination.total} transactions`
    );
  }

  return allTransactions;
}

// Usage
const transactions = await fetchAllTransactions(token);
console.log(`Retrieved ${transactions.length} total transactions`);
```

#### cURL (scripted)

```bash
#!/bin/bash
# Paginate through all transactions using cURL and jq

TOKEN="YOUR_JWT_TOKEN"
BASE_URL="https://api.fiatsend.com/api/transactions"
LIMIT=50
CURSOR=""
PAGE=1

while true; do
  if [ -z "$CURSOR" ]; then
    URL="${BASE_URL}?limit=${LIMIT}&order=desc"
  else
    URL="${BASE_URL}?limit=${LIMIT}&order=desc&cursor=${CURSOR}"
  fi

  RESPONSE=$(curl -s "$URL" -H "Authorization: Bearer $TOKEN")

  # Extract data (process as needed)
  echo "$RESPONSE" | jq -r '.data[] | "\(.transactionId)\t\(.type)\t\(.status)\t\(.amount) \(.currency)"'

  # Check if there are more pages
  HAS_MORE=$(echo "$RESPONSE" | jq -r '.pagination.hasMore')

  if [ "$HAS_MORE" != "true" ]; then
    echo "Done — all pages retrieved."
    break
  fi

  # Get the next cursor
  CURSOR=$(echo "$RESPONSE" | jq -r '.pagination.cursor')
  PAGE=$((PAGE + 1))
  echo "--- Page $PAGE ---"
done
```

### Filtering with Pagination

Filters can be combined with pagination. Filters reduce the total result set, and pagination navigates within the filtered results:

```javascript
// Fetch only completed payouts, 10 at a time
const params = new URLSearchParams({
  limit: "10",
  order: "desc",
  type: "payout",
  status: "completed",
});

const response = await fetch(
  `https://api.fiatsend.com/api/transactions?${params}`,
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }
);

const result = await response.json();
console.log(`${result.pagination.total} completed payouts total`);
```

```bash
# cURL: fetch completed payouts
curl "https://api.fiatsend.com/api/transactions?limit=10&type=payout&status=completed" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Best Practices

:::tip
**Use reasonable page sizes.** The default of 20 works well for most UI use cases. For batch processing or data export, use the maximum of 100 to minimize the number of API calls. Remember that each page counts toward your [rate limit](/docs/integration/errors-rate-limits).
:::

1. **Always check `hasMore`** before making another request. Do not assume there are more pages — if `hasMore` is `false`, you have reached the end.

2. **Do not cache cursors for long periods.** Cursors are designed for sequential pagination within a single session. If you need to resume pagination later, start from the first page again.

3. **Handle empty pages gracefully.** If `data` is an empty array and `hasMore` is `false`, there are no results matching your query. This is not an error.

4. **Respect rate limits.** When paginating through large result sets, monitor the `X-RateLimit-Remaining` header and slow down if you are approaching the limit. See [Errors & Rate Limits](/docs/integration/errors-rate-limits).

5. **Use filters to reduce result sets.** If you only need specific transaction types or statuses, use the `type` and `status` query parameters to reduce the number of pages you need to fetch.

## Related Pages

- [Operations](/docs/integration/operations) — Transaction list endpoint that uses pagination
- [Beneficiaries](/docs/integration/beneficiaries) — Beneficiary list endpoint that uses pagination
- [Errors & Rate Limits](/docs/integration/errors-rate-limits) — Rate limits that apply to paginated requests
