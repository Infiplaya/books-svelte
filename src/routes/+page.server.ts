import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '../lib/server/prisma';

let cold = true;

function sleep(value: any, ms: number) {
	return new Promise((fulfil) => {
		setTimeout(() => {
			fulfil(value);
		}, ms);
	});
}

export const load: ServerLoad = async ({ locals }) => {
	// const page = url.searchParams.get('page');
	// const search = url.searchParams.get('search');
	// const booksPerPage = 10;
	// const currentPage = page ? parseInt(page) : 1;
	// const offset = (currentPage - 1) * booksPerPage;

	// const totalBooks = await prisma.book.count();
	// const totalPages = Math.ceil(totalBooks / booksPerPage);

	// const books = await prisma.book.findMany({
	// 	where: {
	// 		OR: [
	// 			{ title: { contains: search ?? '', mode: 'insensitive' } },
	// 			{ description: { contains: search ?? '', mode: 'insensitive' } },
	// 			{ author: { contains: search ?? '', mode: 'insensitive' } }
	// 		]
	// 	},
	// 	skip: offset,
	// 	take: booksPerPage,
	// 	orderBy: { title: 'asc' }
	// });

	const was_cold = cold;

	cold = false;

	const firstBooks = await prisma.book.findMany({
		take: 10
	});

	const rest = await prisma.book.findMany({
		skip: 10
	});

	const { user } = await locals.validateUser();

	if (user) {
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
			books: firstBooks,
			streamed: {
				rest,
				cold: was_cold
			},
			userLists
		};
	}
	return {
		books: firstBooks,
		streamed: {
			rest,
			cold: was_cold
		}
	};
};

export const actions: Actions = {
	/* Finished books list */
	addToFinishedList: async ({ request, locals }) => {
		const { user, session } = await locals.validateUser();
		if (!(user && session)) {
			return fail(400, { message: 'Only logged in users can add books' });
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
