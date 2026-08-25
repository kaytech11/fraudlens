# FraudLens

FraudLens is a fraud investigation application that helps investigators explore relationships between accounts and transactions through a graph-based data model.

The application uses a React + TypeScript frontend, an Express.js backend, and CognoDB Cloud as the graph database. The backend communicates with the graph database using the Neo4j driver and Cypher/openCypher queries.

## Features

* Account investigation
* Transaction relationship exploration
* Connected-account discovery
* Multi-hop graph traversal
* Fraud relationship visualization
* REST API for investigation data
* Investigator-focused interface
* Loading, empty, error, and connection states

## Architecture

```text
React + TypeScript Client
          │
          │ HTTP
          ▼
Express.js API Server
          │
          │ Neo4j Driver
          ▼
CognoDB Cloud Graph Database
```

The frontend handles the investigation interface and graph visualization. The backend handles API requests, application logic, database access, and Cypher queries. CognoDB Cloud stores the connected account and transaction data.

## Project Structure

```text
fraudlens/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConnectionList.tsx
│   │   │   └── FraudGraph.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   └── package.json
│
├── server/
│   ├── scripts/
│   │   ├── seed.js
│   │   ├── setupDatabase.js
│   │   ├── testQueries.js
│   │   └── verifyGraph.js
│   └── src/
│       ├── config/database.js
│       ├── controllers/
│       ├── queries/
│       ├── routes/
│       ├── services/
│       ├── app.js
│       └── server.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Graph Model

FraudLens uses a graph model because fraud investigation depends heavily on relationships between entities.

A simplified account/transaction relationship is:

```text
(Account)
    │
    │ performs / sends
    ▼
(Transaction)
    │
    │ involves / receives
    ▼
(Account)
```

This allows an investigator to move through connected data instead of treating each account or transaction as an isolated record.

For example:

```text
Account A
   │
   ▼
Transaction
   │
   ▼
Account B
   │
   ▼
Transaction
   │
   ▼
Account C
```

The graph structure makes multi-hop relationship analysis suitable for identifying potentially connected fraud activity.

## Queries

Cypher queries are separated from controllers and services under:

```text
server/src/queries/
├── account.queries.js
├── investigation.queries.js
└── transaction.queries.js
```

This separation keeps database operations independent from HTTP request handling and application logic.

The investigation queries are used to retrieve connected entities and traverse relationships across multiple hops.

## Backend Architecture

The backend follows a simple layered structure:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Cypher Queries
  ↓
CognoDB Cloud
```

### Routes

```text
server/src/routes/account.routes.js
server/src/routes/investigation.routes.js
```

### Controllers

```text
server/src/controllers/account.controller.js
server/src/controllers/investigation.controller.js
```

### Services

```text
server/src/services/account.service.js
server/src/services/investigation.service.js
```

The services contain the application logic while the query modules contain the database operations.

## Database Scripts

The backend includes scripts for preparing and validating the graph database.

### Setup database

```bash
node server/scripts/setupDatabase.js
```

### Seed data

```bash
node server/scripts/seed.js
```

### Test queries

```bash
node server/scripts/testQueries.js
```

### Verify graph

```bash
node server/scripts/verifyGraph.js
```

## Running Locally

### Prerequisites

* Node.js
* npm
* CognoDB Cloud database access
* Database credentials

### Install dependencies

From the project root:

```bash
npm install
```

Then install the frontend dependencies:

```bash
cd client
npm install
cd ..
```

### Environment variables

Create the required `.env` file in the project root and provide the database connection values required by the backend.

Example:

```env
NEO4J_URI=your_database_uri
NEO4J_USERNAME=your_database_username
NEO4J_PASSWORD=your_database_password
PORT=your_server_port
```

Do not commit `.env` or database credentials to the repository.

### Start the backend

From the project root, run the backend command defined in the root `package.json`.

### Start the frontend

```bash
cd client
npm run dev
```

The frontend communicates with the Express API through `client/src/services/api.ts`.

## Frontend

The frontend is built with React, TypeScript, and Vite.

### `FraudGraph.tsx`

Displays the connected fraud-investigation graph.

### `ConnectionList.tsx`

Displays connected entities and investigation relationships.

### `api.ts`

Provides the frontend API communication layer.

## Error Handling

The application handles important UI states including:

* Loading data
* Empty results
* API errors
* Database connection failures

This ensures the investigator receives useful feedback instead of an unexplained blank interface.

## Security

* Database credentials are stored in environment variables.
* `.env` is excluded from Git through `.gitignore`.
* Database queries use parameters rather than directly interpolating user-controlled values.

## Screenshots

Add screenshots from the completed application here.

Recommended screenshots:

1. Main investigation dashboard
2. Fraud graph / relationship visualization
3. Investigation results or connected accounts

Example:

```text
screenshots/dashboard.png
screenshots/fraud-graph.png
screenshots/investigation.png
```

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Backend

* Node.js
* Express.js
* JavaScript
* Neo4j Driver

### Database

* CognoDB Cloud
* Cypher / openCypher

### Development

* Git
* GitHub
* npm

## Design Decisions

### Why a graph database?

Fraud investigations are relationship-heavy. A graph database represents entities and their relationships directly, making connected-data and multi-hop traversal easier to query and visualize.

### Why separate queries from services?

Keeping Cypher queries separate from application logic makes the backend easier to maintain, test, and extend.

### Why separate the frontend and backend?

The frontend can focus on the investigator experience while the backend is responsible for API handling, application logic, and database communication.

## Assessment Requirements Covered

FraudLens demonstrates:

* Graph-based fraud investigation
* Account and transaction relationships
* Multi-hop graph traversal
* Cypher/openCypher queries
* REST API design
* React investigator interface
* Fraud graph visualization
* Database setup and seed scripts
* Query verification scripts
* Separation of frontend and backend responsibilities
* Loading and error states
* Environment-based configuration
* Architecture documentation
* Graph model and query documentation
* Screenshot documentation section

## Repository

The complete application is contained in one repository:

```text
fraudlens/
├── client/
└── server/
```

The frontend and backend can therefore be reviewed together as one complete application.
