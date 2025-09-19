import type { Actions } from "./$types";
import { authClient } from "$lib/auth-client"; //import the auth client


export const actions = {
  signup: async ({ request }) => {
    const rawFormData = await request.formData();

    // const name = rawFormData.get("name");
    // const email = rawFormData.get("email");
    // const password = rawFormData.get("password");

    
    // let email = "bossb@blddssues.com"
    // let password = "badandweak"
    // let name = "Bob"
    // console.log(name, email, password)
    
    // const { data, error } = await authClient.signUp.email({
    //         email, // user email address
    //         password, // user password -> min 8 characters by default
    //         name, // user display name
    //         // image, // User image URL (optional)
    //         callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
    //     }, {
    //         onRequest: (ctx) => {
    //             //show loading
    //         },
    //         onSuccess: (ctx) => {
    //             //redirect to the dashboard or sign in page
    //         },
    //         onError: (ctx) => {
    //             // display the error message
    //             alert(ctx.error.message);
    //         },
    // });
  },
} satisfies Actions;
