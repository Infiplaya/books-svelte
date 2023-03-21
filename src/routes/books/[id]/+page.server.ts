import { error, fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: ServerLoad = async ({ params, locals }) => {
	const { user } = await locals.validateUser();

	const book = await prisma.book.findUnique({
		where: {
			id: parseInt(params.id ? params.id : '')
		}
	});

	if (user && book) {
		const userLists = await prisma.user.findUnique({
			where: {
				id: user.userId
			},
			include: {
				finishedList: true,
				readingList: true
			}
		});
		return {
			book,
			userLists
		};
	}

	if (book) {
		return {
			book
		};
	}

	throw error(404, 'Not found');
};

export const actions: Actions = {
	/* Finished books list */
	addToFinishedList: async ({ request, locals }) => {
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

	removeFromFinishedList: async ({ request, locals }) => {
		// Get the current user
		const { user, session } = await locals.validateUser();
		if (!(user && session)) {
			return fail(500, { message: 'Only logged in users can remove books' });
		}

		const { id: bookId } = Object.fromEntries(await request.formData()) as Record<string, string>;

		try {
			await prisma.user.update({
				where: {
					id: user.userId
				},
				data: {
					finishedList: {
						disconnect: {
							id: parseInt(bookId)
						}
					}
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: 'Could not remove this book' });
		}

		return {
			status: 201
		};
	},

	/* Books read list */
	addToReadingList: async ({ request, locals }) => {
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
			return fail(500, { message: 'Could not remove this book' });
		}

		return {
			status: 201
		};
	},

	removeFromReadingList: async ({ request, locals }) => {
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
						disconnect: {
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