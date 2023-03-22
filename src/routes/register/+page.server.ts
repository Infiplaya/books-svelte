import type { PageServerLoad, Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate()
	if (session) {
		throw redirect(302, "/")
	}
}


export const actions: Actions = {
	default: async ({ request }) => {
		const { username, password } = Object.fromEntries(
			await request.formData(),
		) as Record<string, string>

		try {
			await auth.createUser({
				primaryKey: {
					providerId: "username",
					providerUserId: username,
					password,
				},
				attributes: {
					username,
				},
			})
		} catch (err) {
			console.error(err)
			return fail(400, { message: "Could not register user" })
		}
		throw redirect(302, "/login")
	},
}