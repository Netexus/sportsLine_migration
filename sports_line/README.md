# Riwi Sportsline - Backend

## Description.
This is the backend of the Riwi Sportsline application, developed with **NestJS** and using **TypeORM** to connect to **PostgreSQL**.

## Prerequisites.

- Node.js >= 14.x
- PostgreSQL

## Installation.

1. Clone the repository:

    ```bash
    git clone https://github.com/EsstebanG/nestjs-SportsLine-us
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the environment variables according to your data in the `.env` file located in the project root directory.:

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=myuser
    DB_PASSWORD=mypassword
    DB_DATABASE=riwi_sportsline
    ```

4. Run the project:

    ```bash
    npm run start:dev
    ```

## Project structure.

- `src/` - Project source code.
    - `user/` - User module (example of entity).
    - `app.module.ts` - Principal module.
    - `main.ts` - Point of entry.