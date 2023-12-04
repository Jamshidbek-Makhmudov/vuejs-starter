import { createRouter, createWebHistory } from "vue-router";
import {ref} from 'vue';
import Home from "../pages/Home.vue"
import { adminRoutes } from "./admin";
import { notFound } from "./notFound";
import NProgress from 'nprogress';
const nameArray = ref([ "login", "about"])
const router = createRouter({
    history:createWebHistory(),
    routes: [
        {
            path:'/',
            name:'home',
            component: Home,
            // beforeEnter() {
            //     alert("welcome back")
            //  },
            meta: {
                requireAuth: true,
                title: 'Home',
            }
        },
        adminRoutes,
        {
            path:'/login',
            name:'login',
            component: () => import("../pages/Login.vue"),
                        meta: {
                requiresAuth: false
            },
            beforeEnter() {
                localStorage.removeItem('token')
            }
        },
        {  
            path:'/product/:id',
            name: 'product-details',
            component: ()=> import('../pages/ProductDetails.vue')
        },
        {  
            path:'/new_products',
            name: 'new-products',
            component: ()=> import('../pages/OtherProducts.vue')
        },
        notFound
    ],
    scrollBehavior(to, from, savedPosition) { 
        if (to.hash) {
            return {
        el: to.hash,
        behavior: 'smooth',
      }
        } else { 

            return { top: 0, behavior: 'smooth', }
            
        }

    }
})
router.beforeResolve((to, from, next)=>{
    if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
    next()
    

})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')


    if (!token && nameArray.value.includes(to.name) && to.meta.requiresAuth) {
        next({name: 'login'})
    }
    else if (token && nameArray.value.includes(to.name)) {
        next({name: from.name})
    }
    else {
        next()
    }
})

router.afterEach((to, from) => { 
        NProgress.done()
})
export default router