import { Model } from "objection";
import { knex } from "..";

Model.knex(knex);

export class DbEvent extends Model {
  static tableName = "events";

  static idColumn = "id";

  id!: number;

  name!: string;

  description!: string;

  price!: number;

  date!: Date;
}
