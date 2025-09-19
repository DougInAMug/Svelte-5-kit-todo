import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const actions = {
  submitNumberGreaterThanTen: async ({request}) => {
    const data = await request.formData();
    const number = Number(data.get('number'))
    const id = Number(data.get('id'))
    // console.log(typeof number, number, typeof id, id)
    if (typeof number === "number") {
        if (number > 10) {
            return { id, success: true };
        }
        if (number < 10) {
            return fail(400, {id, lessthanten: true})
        }
    }
  },
} satisfies Actions;
