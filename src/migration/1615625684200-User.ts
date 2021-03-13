import {MigrationInterface, QueryRunner} from "typeorm";

export class User1615625684200 implements MigrationInterface {
    name = 'User1615625684200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "telegram_chat_id" integer NOT NULL,
                "token" character varying NOT NULL,
                CONSTRAINT "UQ_e6c7ee51a169a86a80bf1b6fde8" UNIQUE ("telegram_chat_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
