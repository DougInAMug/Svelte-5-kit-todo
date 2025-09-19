<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "../../routes/formFailComponent/$types";

  type Props = {
    form?: ActionData;
    id: number;
  };
  let { form, id }: Props = $props();
</script>

<form method="POST" action="?/submitNumberGreaterThanTen" use:enhance>
  <p>ID: {id}</p>
  <label>
    Enter a number greater than 10:
    <input name="number" type="number" />
  </label>
  <button name="id" value={id}>Submit</button>
  {#if form?.id === id && form?.success}<p>
      Success! Number was more than 10
    </p>{/if}
  {#if form?.id === id && form?.lessthanten}<p>
      Fail! Number was less than 10
    </p>{/if}
</form>
