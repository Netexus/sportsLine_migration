import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1710090000000 implements MigrationInterface {
  name = 'InitialSchema1710090000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM ('ADMIN', 'COACH', 'SUPPORT')`,
    );

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "first_name" character varying NOT NULL,
        "last_name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'SUPPORT',
        "is_active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TYPE "public"."orders_status_enum" AS ENUM ('PENDING', 'PAID', 'SHIPPED', 'CANCELLED')
    `);

    await queryRunner.query(`
      CREATE TABLE "clients" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "full_name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "phone" character varying,
        "address" character varying,
        CONSTRAINT "PK_clients_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_clients_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "name" character varying NOT NULL,
        "description" text,
        "price" numeric(10,2) NOT NULL,
        "stock" integer NOT NULL DEFAULT 0,
        CONSTRAINT "PK_products_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "status" "public"."orders_status_enum" NOT NULL DEFAULT 'PENDING',
        "total" numeric(10,2) NOT NULL,
        "client_id" uuid NOT NULL,
        CONSTRAINT "PK_orders_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "orders_products" (
        "order_id" uuid NOT NULL,
        "product_id" uuid NOT NULL,
        CONSTRAINT "PK_orders_products" PRIMARY KEY ("order_id", "product_id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD CONSTRAINT "FK_orders_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "orders_products"
      ADD CONSTRAINT "FK_orders_products_order" FOREIGN KEY ("order_id") REFERENCES "orders"("id")
      ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "orders_products"
      ADD CONSTRAINT "FK_orders_products_product" FOREIGN KEY ("product_id") REFERENCES "products"("id")
      ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "orders_products" DROP CONSTRAINT "FK_orders_products_product"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders_products" DROP CONSTRAINT "FK_orders_products_order"',
    );
    await queryRunner.query(
      'ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_client"',
    );
    await queryRunner.query('DROP TABLE "orders_products"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "products"');
    await queryRunner.query('DROP TABLE "clients"');
    await queryRunner.query('DROP TYPE "public"."orders_status_enum"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "public"."users_role_enum"');
  }
}
