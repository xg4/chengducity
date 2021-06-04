import {MigrationInterface, QueryRunner} from "typeorm";

export class House1622793854137 implements MigrationInterface {
    name = 'House1622793854137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "houses" (
                "uuid" character varying NOT NULL,
                "region" character varying NOT NULL,
                "name" character varying NOT NULL,
                "details" character varying NOT NULL,
                "quantity" integer NOT NULL,
                "started_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "finished_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                "status" character varying NOT NULL,
                "hash" character varying NOT NULL,
                CONSTRAINT "PK_5a47aaa8bc31d505a3b16cad026" PRIMARY KEY ("uuid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "houses"
        `);
    }

}
