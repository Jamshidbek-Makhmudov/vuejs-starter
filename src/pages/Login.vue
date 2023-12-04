		<script setup>
		import { useRouter } from "vue-router";
		// import { NInput, NSpace } from 'naive-ui'
		const router = useRouter()
import { useLogin } from '../composables/login';

const {
    username,
    password,
    onLogin
} = useLogin()

		

		
		</script>
<template>
	<div class="container">
		<!-- <div>
		  <n-space vertical>
    <n-input v-model:value="username" :clearable="true" type="text" placeholder="username" />
       <n-input
			 v-model:value="password"
      type="password"
      show-password-on="mousedown"
      placeholder="Password"
			:clearable="true"
      :maxlength="8"
    />
		<button @click="login">Logins</button>
  </n-space>
		</div> -->
		<!--  -->
		    <form class="mt-8 space-y-6" method="POST" @submit.prevent="onLogin">
      <input type="hidden" name="remember" value="true"/>
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="username" class="sr-only">User name</label>
          <input id="username" name="username" type="username" autocomplete="username" required="" v-model="username"
                 class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="User name"/>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required=""
                 v-model="password"
                 class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Password"/>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" 
                 class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
          <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
        </div>

        <!-- <div class="text-sm">
          <router-link :to="{name: 'requestPassword'}" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot
            your password?
          </router-link>
        </div> -->
      </div>

      <div>
        <button type="submit"
 
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >

          Sign in
        </button>
      </div>
    </form>
		<!--  -->

	</div>
</template>


<style  scoped>

</style>