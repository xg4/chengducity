import {MigrationInterface, QueryRunner} from "typeorm";

export class User1615466450985 implements MigrationInterface {
    name = 'User1615466450985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "telegram_chat_id" integer NOT NULL,
                "token" varchar NOT NULL,
                CONSTRAINT "UQ_e6c7ee51a169a86a80bf1b6fde8" UNIQUE ("telegram_chat_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
