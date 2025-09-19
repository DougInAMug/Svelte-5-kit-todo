<script lang="ts">
  import { authClient } from "$lib/auth-client";
  let email = $state("");
</script>

<form>
  <input type="email" bind:value={email} />
  <button
    onclick={async () => {
      const { data, error } = await authClient.signIn.passkey({
        email: email, // required
        autoFill: true,
      });
    }}
    >Passkey signin
  </button>
</form>

<button
  onclick={async () => {
    await authClient.signOut();
  }}
>
  Sign Out
</button>
