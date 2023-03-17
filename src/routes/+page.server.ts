import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '../lib/server/prisma';

export const load: ServerLoad = async () => {
	return {
		books: await prisma.book.findMany()
	};
};

export const actions: Actions = {
	createBook: async ({ request }) => {
		const { title, author } = Object.fromEntries(await request.formData()) as {
			title: string;
			author: string;
		};

		try {
			await prisma.book.create({
				data: {
					title,
					author
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not add this book' });
		}
		return {
			status: 301
		};
	}
};
