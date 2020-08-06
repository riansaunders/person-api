
# Express API CRUD demonstration
bootstrapped with [create-express-api](https://www.npmjs.com/package/create-express-api)

Routes: 
  * GET /api/v1/person/
    * List of persons in the database
  * GET /api/v1/person/[id]
    * Specific person by ID
  * POST /api/v1/person
    * Add a person to the database
  * PUT /api/v1/person/[id]
    * Update a person in the database by ID
  * DELETE /api/v1/person[id]
    * Delete a person in the database by ID


Other features: 
* [node-postgres](https://node-postgres.com/)
  * PostgreSQL for NodeJS
* [Joi](https://www.npmjs.com/package/joi)
  * Object Schema Validation for request body

## Setup

[Default Environmental variables](https://node-postgres.com/features/connecting)
```
PGHOST='localhost'
PGUSER=
PGDATABASE=
PGPASSWORD=null
PGPORT=5432
```

```
npm run migration
```

## Development

```
npm run dev
```
