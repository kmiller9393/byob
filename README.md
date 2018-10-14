**`GET /jobs`**

- Returns JSON data for all available jobs.
- You should receive an array of Type JSON objects.

```json
[
	{
		"id": 1,
		"description": "A good job",
		"company": "DHI GROUP, INC.",
		"location": "GREATER DENVER AREA",
		"status": "none",
		"job_title_id": 1,
	},
	{
		"id": 2,
		"description": "A good job",
		"company": "TRAVELERS HAVEN",
		"location": "GREATER DENVER AREA",
		"status": "none",
		"job_title_id": 2
	},
	{
		"id": 3,
		"description": "A good job",
		"company": "WOWZA MEDIA SYSTEMS",
		"location": "GREATER DENVER AREA",
		"status": "none",
		"job_title_id": 2
	}
	...
]
```

**`GET /job-types`**

- Returns JSON data for all available job types.
- You should receive an array of Type JSON objects.

```json
[
	{
		"id": 3,
		"job_title": "Software Engineer",
		"average_salary": 72000
	},
	{
		"id": 4,
		"job_title": "Full Stack Developer",
		"average_salary": 85000
	},
	{
		"id": 5,
		"job_title": "Front End Developer",
		"average_salary": 77000
	},
    ...
]
```

**`GET /jobs/:id`**

- Returns JSON data for a specific job based on its `id`.
- You should receive an array with a single Type JSON object.

```json
[
  {
    "id": 3,
    "description": "We are looking for an experienced developer...",
    "company": "FOUR WINDS INTERACTIVE",
    "location": "GREATER DENVER AREA",
    "status": "none",
    "job_title_id": 4
  }
]
```

**`GET /jobs-types/:id`**

- Returns JSON data for a specific job type based on its `id`.
- You should receive an array with a single Type JSON object.

```json
[
  {
    "id": 3,
    "job_title": "Software Engineer",
    "average_salary": 72000
  }
]
```

**`POST /jobs`**

- Adds a new job.
- The response should be a Type JSON object with the new job's `id`.

Request:

```json
{
  "description": "We're looking for talented and motivated engineers...",
  "company": "Gusto",
  "location": "GREATER DENVER AREA",
  "status": "none"
}
```

Response:

```json
{
  "id": 20
}
```

**`POST /job-types`**

- Adds a new job type.
- The response should be a Type JSON object with the new job type's `id`.

Request:

```json
{
  "description": "We're looking for talented and motivated engineers...",
  "company": "Gusto",
  "location": "GREATER DENVER AREA",
  "status": "none"
}
```

Response:

```json
{
  "id": 20
}
```

**`PATCH /api/v1/jobs/:id`**

- Updates a job's status based on its `id`.
- The response should be a Type JSON object with the new job's `status`.

Request:

```json
{
  "status": "saved"
}
```

Response:

```json
{
  "id": 25
}
```

**`PATCH /api/v1/jobs/:id/edit`**

- Updates a job's description, company and location based on its `id`.
- The response should be a Type JSON object with the new job's `id`.

Request:

```json
{
  "description": "We're looking for a front-end developer at our new Boulder office...",
  "company": "Bitsbox",
  "location": "Boulder, CO"
}
```

Response:

```json
{
  "id": 25
}
```

**`DELETE /api/v1/jobs/:id`**

- Deletes a job based on its `id`.
- The response should be a Type JSON object with the deleted job's `id`.

```json
{
  "id": 50
}
```

**`DELETE /api/v1/job-types/:id`**

- Deletes a job-type based on its `id`.
- The response should be a Type JSON object with the deleted job type's `id`.

```json
{
  "id": 20
}
```
