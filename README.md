# Riwi Sportsline API

Backend del ecommerce Sportsline migrado a NestJS. Este proyecto reemplaza el setup inicial en Express, incorpora arquitectura modular, ConfigModule para manejar variables de entorno y TypeORM como ORM principal sobre PostgreSQL.

## Stack principal
- [NestJS 11](https://docs.nestjs.com) con TypeScript estricto.
- [TypeORM 0.3](https://typeorm.io/) + PostgreSQL.
- Configuración profesional de ESLint, Prettier y pipes globales de validación (`class-validator` / `class-transformer`).
- Módulos funcionales: Usuarios, Clientes, Productos y Pedidos.

## Requisitos previos
1. Node.js >= 20 y npm.
2. PostgreSQL 14+ con una base creada (por defecto `riwi_sportsline`).
3. Nest CLI (`npm i -g @nestjs/cli`) solo si deseas usar los generators localmente.

## Puesta en marcha
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Copia el archivo de variables y actualiza los valores del backend Express original:
   ```bash
   cp .env.example .env
   # edita DB_HOST (usa "db" si corres con Docker), DB_USER, DB_PASSWORD, etc.
   ```
3. Ejecuta las migraciones iniciales:
   ```bash
   npm run migration:run
   ```
4. (Opcional) Carga datos de referencia:
   ```bash
   npm run seed
   ```
5. Levanta la API:
   ```bash
   npm run start:dev
   ```
   El servidor lee `APP_PORT` (3000 por defecto) y expone `GET /health` para verificar el estado.

## Scripts relevantes
| Script | Descripción |
| --- | --- |
| `npm run start:dev` | Levanta el servidor con recarga automática. |
| `npm run lint` | Ejecuta ESLint con las reglas de estilo compartidas. |
| `npm run migration:run` / `npm run migration:revert` | Aplica o revierte migraciones con TypeORM CLI. |
| `npm run migration:generate -- -n <Nombre>` | Genera una nueva migración apuntando al `DataSource` configurado. |
| `npm run seed` | Inicializa datos básicos (usuarios, clientes, productos y pedidos). |

## Uso con Docker
1. Revisa/ajusta las variables de `.env.docker` (por defecto usa usuario/clave `riwi`).
2. Construye y levanta la base de datos + API:
   ```bash
   docker compose up --build
   ```
3. La API quedará accesible en `http://localhost:3000/health` y PostgreSQL en `localhost:5432` con las credenciales definidas.
4. Para detener los servicios:
   ```bash
   docker compose down
   ```

> Nota: si deseas correr migraciones o seeds dentro del contenedor puedes ejecutar `docker compose exec api npm run migration:run` o `docker compose exec api npm run seed`.

## Arquitectura y módulos
- **ConfigModule global**: carga `app.config.ts` y `database.config.ts`, valida variables con Joi y expone `ConfigService` en toda la app.
- **TypeORMModule**: conexión asíncrona a PostgreSQL, `autoLoadEntities` y migraciones localizadas en `src/database/migrations`.
- **Usuarios** (`src/modules/users`): entidad `User`, roles (`ADMIN`, `COACH`, `SUPPORT`), servicio CRUD básico y controlador REST para altas/consultas.
- **Clientes** (`src/modules/clients`): entidad `Client` con relación 1:N hacia Pedidos, servicios para lectura puntual o listado con las órdenes relacionadas.
- **Productos** (`src/modules/products`): entidad `Product`, repositorio para creación y consulta y controlador mínimo.
- **Pedidos** (`src/modules/orders`): entidad `Order` con estado (`PENDING`, `PAID`, `SHIPPED`, `CANCELLED`), relación N:N con productos (tabla `orders_products`) y servicio que valida cliente/productos antes de persistir.

## Migraciones y seeds
- Migración inicial: `src/database/migrations/1710090000000-InitialSchema.ts` crea tablas de Usuarios, Clientes, Productos, Pedidos y la tabla pivote.
- Seeder: `src/database/seeds/seed.ts` purga datos y registra un usuario admin, cliente de prueba, catálogo mínimo y un pedido pagado para validar las relaciones.

## Buenas prácticas adoptadas
- Pipes globales de validación/sanitización (`ValidationPipe`) y CORS habilitado.
- Entidad base (`BaseEntity`) con columnas de auditoría estandarizadas.
- Configuración centralizada del DataSource para reutilizar el CLI de TypeORM (`src/database/typeorm.config.ts`).
- DTOs con `class-validator` para asegurar contratos en los controladores.
- Ejemplos de consultas desde servicios (`UsersService`, `ClientsService`, `OrdersService`) para validar las operaciones CRUD tras la migración de Sequelize a TypeORM.

## Próximos pasos sugeridos
1. Conectar el repositorio con tu fork en GitHub (`git remote add origin <url-del-fork>` y realizar el primer push).
2. Implementar autenticación/autorization sobre la entidad `User` (JWT/Passport).
3. Agregar pruebas e2e específicas para cada módulo y coverage sobre los servicios de TypeORM.
