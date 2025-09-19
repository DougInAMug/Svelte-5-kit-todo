import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions = {
  submitNumberGreaterThanTen: async ({request}) => {
    const data = await request.formData();
    const number = Number(data.get('number'))
    console.log(typeof number)
    if (typeof number === "number") {
        if (number > 10) {
            return { success: true };
        }
        if (number < 10) {
            return fail(400, {number, lessthanten: true})
        }
    }
  },
} satisfies Actions;
