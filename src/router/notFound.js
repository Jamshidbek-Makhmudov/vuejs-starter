

 export const notFound = {
	 path: '/:pathMatch(.*)*',
	 name:"not-found",
            component: () => import('../pages/errors/404.vue'),
}

