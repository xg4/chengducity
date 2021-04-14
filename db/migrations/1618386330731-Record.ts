import {MigrationInterface, QueryRunner} from "typeorm";

export class Record1618386330731 implements MigrationInterface {
    name = 'Record1618386330731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "records" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "type" character varying NOT NULL,
                CONSTRAINT "PK_188149422ee2454660abf1d5ee5" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "records"
        `);
    }

}
