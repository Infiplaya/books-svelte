import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '../lib/server/prisma';

export const load: ServerLoad = async ({ locals }) => {
	const { user } = await locals.validateUser();
	return {
		books: await prisma.book.findMany(),
		userLists: await prisma.user.findUnique({
			where: {
				id: user!.userId
			},
			include: {
				finishedList: true,
				readingList: true
			}
		})
	};
};

export const actions: Actions = {
	createBook: async ({ request }) => {
		const { title, author, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			author: string;
			description: string;
		};

		try {
			await prisma.book.create({
				data: {
					title,
					author,
					description
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not add this book' });
		}
		return {
			status: 301
		};
	},
	addToFinished: async ({ request, locals }) => {
		// Get the current user
		const { user, session } = await locals.validateUser();
		if (!(user && session)) {
			return fail(500, { message: 'Only logged in users can add books' });
		}

		const { id: bookId } = Object.fromEntries(await request.formData()) as Record<string, string>;

		try {
			await prisma.user.update({
				where: {
					id: user.userId
				},
				data: {
					finishedList: {
						connect: {
							id: parseInt(bookId)
						}
					}
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not add this book' });
		}

		return {
			status: 201
		};
	},
	addToReadlist: async ({ request, locals }) => {
		// Get the current user
		const { user, session } = await locals.validateUser();
		if (!(user && session)) {
			return fail(500, { message: 'Only logged in users can add books' });
		}

		const { id: bookId } = Object.fromEntries(await request.formData()) as Record<string, string>;

		try {
			await prisma.user.update({
				where: {
					id: user.userId
				},
				data: {
					readingList: {
						connect: {
							id: parseInt(bookId)
						}
					}
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not add this book' });
		}

		return {
			status: 201
		};
	}
};
