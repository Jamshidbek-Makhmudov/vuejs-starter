<script setup>
import Sidebar from './partials/admin/Sidebar.vue';


</script>
<template>
	<main class="admin-layout flex">
		<div class="w-1/5 h-screen sticky top-0 left-0">
			<Sidebar/>
			
			
		</div>
		<div class="w-4/5 p-6 ">
		<RouterView/>
		</div>


	</main>
</template>



<style  scoped>

</style>