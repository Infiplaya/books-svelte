import { prisma } from '../src/lib/server/prisma';
import fetch from 'cross-fetch';

async function main() {
	const response = await fetch('https://example-data.draftbit.com/books?_limit=100');
	const booksData = await response.json();
	for (const newBook of booksData) {
		await prisma.book.create({
			data: {
                title: newBook.title,
                description: newBook.description,
                image: newBook.image_url,
                author: newBook.authors,
            }
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
