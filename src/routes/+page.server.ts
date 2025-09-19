import prisma from "$lib/prisma.js";
import { fail, type Actions } from "@sveltejs/kit";
import * as v from "valibot";

// exported load function is a specific sveltekit data load
// here adding a basic cookie
export async function load({ cookies }) {
  const allTodo = await prisma.todo.findMany();

  const visited = cookies.get("visited");
  cookies.set("visited", "true", { path: "/" });

  return {
    allTodo,
    visited: visited === "true",
  };
}

// Valibot schema for merging
const V_Todo_id = v.pipe(
  v.string(),
  v.transform(Number),
  v.number("Todo ID must be a number")
);
const V_Todo_title = v.pipe(v.string(), v.minLength(5, "5 is the minimum"));
const V_Todo_description = v.pipe(
  v.string(),
  v.minLength(10, "10 is the minimum")
);

// export (form) actions variable, svelte magic again
export const actions = {
  create: async ({ request }) => {
    const rawFormData = await request.formData();

    const rawTitle = rawFormData.get("title");
    const rawDescription = rawFormData.get("description");

    let parsedTitle;
    let parsedDescription;

    const validatingTitle = v.safeParse(V_Todo_title, rawTitle);
    const validatingDescription = v.safeParse(
      V_Todo_description,
      rawDescription
    );

    if (validatingTitle.success && validatingDescription.success) {
      parsedTitle = validatingTitle.output;
      parsedDescription = validatingDescription.output;
    } else {
      return fail(400, {
        rawTitle,
        rawDescription,
        createError_title: validatingTitle.issues?.[0].message,
        createError_description: validatingDescription.issues?.[0].message,
      });
    }

    try {
      await prisma.todo.create({
        data: {
          title: parsedTitle,
          description: parsedDescription,
        },
      });
    } catch {
      return fail(400, {
        rawTitle,
        rawDescription,
        createError_database:
          "Unexpected error, todo not created! Talk to Doug.",
      });
    }
  },

  edit: async ({ request }) => {
    const rawFormData = await request.formData();

    const rawTitle_edit = rawFormData.get("title");
    const rawDescription_edit = rawFormData.get("description");
    const rawId_edit = rawFormData.get("id");

    let parsedTitle;
    let parsedDescription;
    let parsedId;

    const validatingTitle = v.safeParse(V_Todo_title, rawTitle_edit);
    const validatingDescription = v.safeParse(
      V_Todo_description,
      rawDescription_edit
    );
    const validatingId = v.safeParse(V_Todo_id, rawId_edit);

    if (
      validatingTitle.success &&
      validatingDescription.success &&
      validatingId.success
    ) {
      parsedTitle = validatingTitle.output;
      parsedDescription = validatingDescription.output;
      parsedId = validatingId.output;
    } else {
      return fail(400, {
        rawTitle_edit,
        rawDescription_edit,
        rawId_edit,
        editError_title: validatingTitle.issues?.[0].message,
        editError_description: validatingDescription.issues?.[0].message,
        editError_id: validatingId.issues?.[0].message,
      });
    }

    try {
      await prisma.todo.update({
        where: {
          id: parsedId,
        },
        data: {
          title: parsedTitle,
          description: parsedDescription,
        },
      });
    } catch {
      return fail(400, {
        editError_database: "Unexpected error, Todo ID not edited!",
      });
    }
  },

  delete: async ({ request }) => {
    const rawFormData = await request.formData();

    const rawId = rawFormData.get("id");

    let parsedId;

    const validatingId = v.safeParse(V_Todo_id, rawId);

    if (validatingId.success) {
      parsedId = validatingId.output;
    } else {
      return fail(400, {
        deleteError_id: validatingId.issues[0].message,
      });
    }

    try {
      await prisma.todo.delete({
        where: {
          id: parsedId,
        },
      });
    } catch {
      return fail(400, {
        deleteError_database:
          "Unexpected error, Todo ID not found, Todo not deleted!",
      });
    }
  },
} satisfies Actions;
