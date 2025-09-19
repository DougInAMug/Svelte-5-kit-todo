import { createAuthClient } from "better-auth/client";
import type { auth } from "./auth.js";
import {
    inferAdditionalFields,
    passkeyClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: "http://localhost:5173",
    plugins: [inferAdditionalFields<typeof auth>(), passkeyClient()],
});
