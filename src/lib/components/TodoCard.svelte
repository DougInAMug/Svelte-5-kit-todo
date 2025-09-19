<script lang="ts">
  import type { Todo } from "@prisma-app/client";
  import { enhance } from "$app/forms";
  import type { PageProps } from "../../routes/$types";

  interface Props extends PageProps {
    todoarrayitem: Todo;
  }
  let { todoarrayitem, form }: Props = $props();

  let deleteAttempted: boolean = $state(false);
  let editAttempted: boolean = $state(false);
  let titleEdited: string = $state(todoarrayitem.title);
  let descriptionEdited: string | null = $state(todoarrayitem.description);
</script>

<div>
  <h1>{todoarrayitem.id}</h1>
  <h2>{todoarrayitem.title}</h2>
  <p>{todoarrayitem.description}</p>

  {#if deleteAttempted === false && editAttempted === false}
    <button onclick={() => (editAttempted = true)}>Edit</button>
    <button class="bg-red" onclick={() => (deleteAttempted = true)}>
      Delete
    </button>
  {/if}

  {#if editAttempted === true}
    <form
      method="POST"
      action="?/edit"
      use:enhance={() => {
        return async ({ update, result }) => {
          await update();
          if (result.type === "success") {
            editAttempted = false;
            titleEdited = todoarrayitem.title;
            descriptionEdited = todoarrayitem.description;
          }
        };
      }}
    >
      <label for="title">Todo title:</label>
      <input type="text" name="title" id="title" value={titleEdited} />
      {#if form?.editError_title && Number(form?.rawId_edit) === todoarrayitem.id}{form.editError_title}{/if}
      <label for="description">Todo description:</label>
      <input
        type="text"
        name="description"
        id="description"
        value={descriptionEdited}
      />
      {#if form?.editError_description && Number(form?.rawId_edit) === todoarrayitem.id}{form.editError_description}{/if}

      <button name="id" value={todoarrayitem.id} type="submit">Save</button>
    </form>

    <button
      onclick={() => (
        (editAttempted = false),
        (form = null),
        (titleEdited = todoarrayitem.title),
        (descriptionEdited = todoarrayitem.description)
      )}
    >
      Cancel
    </button>
  {/if}

  {#if deleteAttempted === true}
    <form method="POST" action="?/delete" use:enhance>
      <button class="bg-red" name="id" value={todoarrayitem.id}
        >Really delete?</button
      >
      {#if form?.deleteError_id}{form.deleteError_id}{/if}
      {#if form?.deleteError_database}{form.deleteError_database}{/if}
    </form>

    <button onclick={() => (deleteAttempted = false)}>Rather not!</button>
  {/if}
</div>

<style>
  div,
  button {
    border: 2px black solid;
    padding: 0.5rem;
    margin: 0.5rem;
  }
  .bg-red {
    background-color: lightcoral;
  }
</style>
