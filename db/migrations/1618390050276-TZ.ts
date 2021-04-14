import {MigrationInterface, QueryRunner} from "typeorm";

export class TZ1618390050276 implements MigrationInterface {
    name = 'TZ1618390050276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "records" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "records"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "records" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "records"
            ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "records" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "records"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "records" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "records"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

}
