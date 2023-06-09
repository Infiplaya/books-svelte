import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '../lib/server/prisma';

export const load: ServerLoad = async ({ locals }) => {
	const books = await prisma.book.findMany({
		orderBy: {
			title: 'asc'
		}
	});

	const { user } = await locals.validateUser();

	if (user) {
		const userLists = await prisma.user.findUnique({
			where: {
				id: user.userId
			},
			include: {
				finishedList: true,
				wantToRead: true,
				justReading: true,
				favorites: true
			}
		});
		return {
			books,
			userLists
		};
	}
	return {
		books
	};
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

	/* User reading list */
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
					justReading: {
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
					justReading: {
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
	},

	/* User favorites list */
	addToFavorites: async ({ request, locals }) => {
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
					favorites: {
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

	removeFromFavorites: async ({ request, locals }) => {
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
					favorites: {
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
	},

	/* User reading list */
	addToWantToRead: async ({ request, locals }) => {
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
					wantToRead: {
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

	removeWantToRead: async ({ request, locals }) => {
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
					wantToRead: {
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
