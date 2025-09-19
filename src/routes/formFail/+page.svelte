<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { form }: PageProps = $props();
</script>

<form method="POST" action="?/submitNumberGreaterThanTen" use:enhance>
  <label>
    Enter a number greater than 10:
    <input name="number" type="number" />
  </label>
  <button>Submit</button>
  {#if form?.success}<p>Success! Number was more than 10</p>{/if}
  {#if form?.lessthanten}<p>Fail! Number was less than 10</p>{/if}
</form>
