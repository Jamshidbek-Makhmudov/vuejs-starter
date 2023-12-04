<template >
            
        <nav-bar :is-auth="isAuth"/>
        <!-- <nav-bar :is-auth="isAuth" @onclick="onlogout"/> -->
        <!-- <KeepAlive> -->
        <div class="box">
            <div  class="flex" v-for="product of products" :key="product.id">
                <ProductCard :product="product"/>
            </div>
        </div>
        <!-- </KeepAlive> -->

</template>

<script setup>
import {provide } from "vue"
import { Utils } from '../composables/utlis';
import { useLogin } from '../composables/login';

import ProductCard from '../components/ProductCard.vue'
import NavBar from '../components/Navbar.vue';

const { products, onLogout } = Utils()
const { isAuth } = useLogin()
provide ("onLogout", onLogout) //javascriptdagi har qanday data typerlarni yuborsa boladi provide va inject orqali
</script>

<style>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.box {
    margin: 10px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 10px;
}
</style>
