import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import assert from "node:assert";
import * as schema from "@/db/schema";

assert(process.env.DATABASE_URL, "You need a DATABASE_RUL");

export const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export default db;
