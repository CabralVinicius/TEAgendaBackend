import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712635152268 implements MigrationInterface {
    name = 'Default1712635152268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "eventName" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "eventName"`);
    }

}
