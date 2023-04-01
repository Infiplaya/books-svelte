import type { Book, Key, Session, User } from '@prisma/client/edge';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface Database {
	Book: Book;
	Session: Session;
	User: User;
	Key: Key;
}

export const db = new Kysely<Database>({
	dialect: new PlanetScaleDialect({
		host: 'aws.connect.psdb.cloud',
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD
	})
});
