<script>
  import NumberEntry from "$lib/components/NumberEntry.svelte";
  export let form;
</script>

<NumberEntry id={1} {form} />
<NumberEntry id={2} {form} />
<NumberEntry id={3} {form} />