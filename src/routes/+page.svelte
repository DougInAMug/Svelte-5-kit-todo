<script lang="ts">
  import TodoCard from "$lib/components/TodoCard.svelte";
  import TodoCreate from "$lib/components/TodoCreate.svelte";
  import type { PageProps } from "./$types";

  let { form, data, params }: PageProps = $props();
</script>

Been here already? {data.visited}

<h1>Todo</h1>

<TodoCreate {form} {data} {params} />

{#each data.allTodo as todoarrayitem (todoarrayitem.id)}
  <TodoCard {todoarrayitem} {form} {data} {params} />
{/each}
