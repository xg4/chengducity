import {MigrationInterface, QueryRunner} from "typeorm";

export class House1615876292019 implements MigrationInterface {
    name = 'House1615876292019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "houses" (
                "uuid" character varying NOT NULL,
                "region" character varying NOT NULL,
                "name" character varying NOT NULL,
                "details" character varying NOT NULL,
                "number" character varying NOT NULL,
                "starts_at" character varying NOT NULL,
                "ends_at" character varying NOT NULL,
                "status" character varying NOT NULL,
                "source" character varying NOT NULL,
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
