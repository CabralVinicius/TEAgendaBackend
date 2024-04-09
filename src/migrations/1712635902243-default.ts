import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712635902243 implements MigrationInterface {
    name = 'Default1712635902243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "eventName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "eventName" text NOT NULL`);
    }

}
