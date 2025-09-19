<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.error?.message}</h1>
<p>Oh dear, something went wrong unexpectedly!</p>