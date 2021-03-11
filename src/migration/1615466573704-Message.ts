import {MigrationInterface, QueryRunner} from "typeorm";

export class Message1615466573704 implements MigrationInterface {
    name = 'Message1615466573704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "message" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "telegram_chat_id" integer NOT NULL,
                "content" varchar NOT NULL,
                "type" varchar NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "message"
        `);
    }

}
