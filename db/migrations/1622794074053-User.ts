import {MigrationInterface, QueryRunner} from "typeorm";

export class User1622794074053 implements MigrationInterface {
    name = 'User1622794074053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "telegram_chat_id" integer NOT NULL,
                "token" character varying,
                CONSTRAINT "UQ_d008c578c984d10bd5fc4f0c90e" UNIQUE ("telegram_chat_id"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}
