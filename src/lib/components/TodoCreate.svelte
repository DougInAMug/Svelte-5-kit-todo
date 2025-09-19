<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "../../routes/$types";

  let { form }: PageProps = $props();
</script>

<form method="POST" action="?/create" use:enhance>
  <h2>New Todo</h2>
  <label for="title">Todo title:</label>
  <input type="text" name="title" id="title" value={form?.rawTitle ?? ""} />
  {#if form?.createError_title}{form.createError_title}{/if}
  <label for="description">Todo description:</label>
  <input
    type="text"
    name="description"
    id="description"
    value={form?.rawDescription ?? ""}
  />
  {#if form?.createError_description}{form.createError_description}{/if}
  {#if form?.createError_database}{form.createError_database}{/if}

  <button type="submit">Submit</button>
</form>

<style>
  form,
  button {
    border: 2px black solid;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  form {
    margin-bottom: 2rem;
  }
</style>
