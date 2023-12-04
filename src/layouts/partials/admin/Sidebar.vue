<script setup>

</script>
<template>
	<aside class="h-screen bg-gray-900 px-4 py-6 flex flex-col">
		<h2 class="py-2 px-3 text-white">Admin Panel</h2>
		<router-link to="/admin/main" class="py-2 px-3 bg-gray-700 rounded-md mb-2 text-white">Main</router-link>
		<router-link to="/admin/users" class="py-2 px-3 bg-gray-700 rounded-md mb-2 text-white">Users</router-link>
		<router-link to="/admin/admins" class="py-2 px-3 bg-gray-700 rounded-md mb-2 text-white">Admins</router-link>
		<router-link to="/admin/products" class="py-2 px-3 bg-gray-700 rounded-md mb-2 text-white">Products</router-link>

	</aside>
</template>



<style scoped>
.router-link-active{
	background-color: #fff;
	color: black;
}

</style>