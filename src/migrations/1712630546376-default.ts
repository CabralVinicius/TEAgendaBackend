import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712630546376 implements MigrationInterface {
    name = 'Default1712630546376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" SERIAL NOT NULL, "name" text NOT NULL, "keyWord" text NOT NULL, "eventDateId" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("date_id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "keyWord" text NOT NULL, "user_id" integer, CONSTRAINT "PK_c518bfa8a259ddeb59f531aabd9" PRIMARY KEY ("date_id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "event_id" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_6514c0ce93cb1747240f6ca07e9" FOREIGN KEY ("eventDateId") REFERENCES "events"("date_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_09f256fb7f9a05f0ed9927f406b" FOREIGN KEY ("user_id") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_d72c2c18a15a01f497a80e0b187" FOREIGN KEY ("event_id") REFERENCES "events"("date_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_d72c2c18a15a01f497a80e0b187"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_09f256fb7f9a05f0ed9927f406b"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_6514c0ce93cb1747240f6ca07e9"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
