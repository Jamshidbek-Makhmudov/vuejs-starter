<script setup>
import { UseProduct } from '../composables/index';
import Loader from '../ui/Loader.vue';
import baseButton from "../components/base-button.vue";
import baseInput from "../components/base-input.vue";
import Paginate from "vuejs-paginate-next";

import productItem from '../components/productItem.vue';
import { useRouter } from "vue-router";
import { useRoute } from "vue-router"
import { onMounted } from 'vue';
import { Utils } from "../composables/utlis"
import { useLogin } from '../composables/login';
import { NSpace } from 'naive-ui';
const { isAuth } = useLogin()
const { onLogout } = Utils()

const route=useRoute()

const router = useRouter()
	    function redirectDetails(id) {
        console.log("id", id);
        router.push({name: 'product-details', params:{id}})
			}



const {
  products, 
  limitSize, 
  onLimitChange, 
  showAddModal, 
  showDeleteModal, 
  showUpdateModal, 
  loading,
  onSubmitAddItem, 
  onSubmitUpdateModal,
  product, 
  onDeleteItem,
  onShowUpdateModal,
  getProducts,
  searchProduct,
  searchWord,
  categorySize,
  currentPage,
  category,
  clickCallback
} = UseProduct()

onMounted(() => { 
  document.title=route.meta.title
})
</script>

<template>
  <nav class="flex items-center justify-between py-5 px-2 bg-gray-700 h-20 shadow-lg mb-4">
    <div>
      <select class="px-2" v-model="limitSize" @change="onLimitChange">
        <option value="null" disabled>Limit</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>

           <select
        class="xs:mx-1 md:w-30 lg:w-52 h-7 pl-2 rounded-md text-base cursor-pointer"
        v-model="categorySize"
        @change="category"
      >
        <option class="text-black" value="null" disabled>Category</option>
        <option value="men's clothing">men's clothing</option>
        <option value="jewelery">jewelery</option>
        <option value="electronics">electronics</option>
        <option value="women's clothing">women's clothing</option>
      </select>
    </div>
		<div>
			    <router-link to="/product/12" class="text-2xl"> Product</router-link>
			    <router-link to="/login" class="text-2xl"> Login</router-link>
		</div>
    <div>
           <input  class="border-2 rounded-md cursor-pointer xs:mx-1 sm:w-40 md:w-60 lg:w-80 my-4 lg:mx-40 pl-3"
        type="text"
        v-model="searchWord" @input="searchProduct" placeholder="Search by title">
      
    </div>
    <div>
          <n-space justify="space-between" >
        <n-space justify="space-between">
            <router-link class="link btn bg-blue-400 me-1" to="/">Home</router-link>
            <router-link class="link btn bg-blue-400 me-1" to="/new_products">new Products</router-link>
            <router-link class="link btn bg-blue-400 me-1" to="/about">About</router-link>
        </n-space>
        <router-link class="link btn bg-blue-400 me-1" v-if="!isAuth" :to="{ name: 'login' }">Login</router-link>
        <button class="btn bg-blue-400 me-1"  v-else @click="onLogout">Logout</button>
    </n-space>
      <baseButton class=" me-1" @click="showAddModal = !showAddModal">Add item</baseButton>
      <baseButton class=" me-1" @click="showDeleteModal = !showDeleteModal">Delete item</baseButton>
    </div>
  </nav>



  <div
    v-if="showUpdateModal" 
    class="absolute w-[50%] bg-gray-400 h-[70%] left-[20%] p-3 overflow-y-scroll"
  >
    <div class="text-right mb-6">
      <baseButton variant="danger" class="p-1 px-2 " @click="showUpdateModal = false">X</baseButton>
    </div>
    <form @submit.prevent="onSubmitUpdateModal">
        <div class="mb-2">
          <baseInput id="title" label="Product title" type="text" placeholder="type product title..." v-model="product.title" :value="product.title"/>
   
        </div>
        <div>
          <label class="block mb-1" for="desc">Product description</label>
          <textarea v-model="product.description" class="w-full" id="desc" cols="30" rows="5"></textarea>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <label class="block mb-1" for="image">Image path</label>
            <input v-model="product.image" class="w-full" type="text" id="image">
          </div>
          <div>
            <label class="block mb-1" for="cat">Product category</label>
            <input v-model="product.category" class="w-full" type="text" id="cat">
          </div>
        </div>
        <div class="flex items-center justify-between mb-3">
          <div>
            <label class="block mb-1" for="price">Product price</label>
            <input v-model="product.price" class="w-full" type="text" id="price">
          </div>
          <div>
            <label class="block mb-1" for="count">Product count</label>
            <input v-model="product.rating.count" class="w-full" type="text" id="count">
          </div>
        </div>
        <baseButton class=" block w-full">Update</baseButton>
      </form>
  </div>
  <div 
    v-if="showDeleteModal" 
    class="absolute w-[50%] bg-gray-400 h-[70%] left-[20%] p-3 overflow-y-scroll"
  >
    <div class="text-right mb-6">
      <baseButton variant="danger" class="p-1 px-2 " @click="showDeleteModal = false">X</baseButton>
    </div>
    <div 
      v-for="item of products" 
      :key="item.id" 
      class="flex items-center justify-between mb-5 cursor-pointer bg-red-400 p-2 rounded-md"
      @click="onDeleteItem(item.id)"
    >
      <p>{{ item.title }}</p>
      <img :src="item.image" width="30" height="30" alt="">
    </div>
  </div>
  <div v-if="showAddModal" class="absolute w-[50%] bg-gray-400 h-auto left-[20%] p-3">
    <div class="text-right">
      <baseButton variant="danger" class="p-1 px-2 " @click="showAddModal = false">X</baseButton>
    </div>
    <form @submit.prevent="onSubmitAddItem">
      <div class="mb-2">
        <label class="block mb-1" for="title">Product title</label>
        <input v-model="product.title" class="w-full" type="text" id="title">
      </div>
      <div>
        <label class="block mb-1" for="desc">Product description</label>
        <textarea v-model="product.description" class="w-full" id="desc" cols="30" rows="5"></textarea>
      </div>
      <div class="flex items-center justify-between">
        <div>
          <label class="block mb-1" for="image">Image path</label>
          <input v-model="product.image" class="w-full" type="text" id="image">
        </div>
        <div>
          <label class="block mb-1" for="cat">Product category</label>
          <input v-model="product.category" class="w-full" type="text" id="cat">
        </div>
      </div>
      <div class="flex items-center justify-between mb-3">
        <div>
          <label class="block mb-1" for="price">Product price</label>
          <input v-model="product.price" class="w-full" type="text" id="price">
        </div>
        <div>
          <label class="block mb-1" for="count">Product count</label>
          <input v-model="product.rating.count" class="w-full" type="text" id="count">
        </div>
      </div>
      <baseButton class=" block w-full">Add</baseButton>
    </form>
  </div>
  
  
  
  <div class="container mx-auto">
    <!-- category -->
    <ul class="bg-green-400 p-4 flex items-center justify-between rounded-lg">
      <li class="text-white text-lg cursor-pointer" @click="getProducts()">all</li> 
      <li class="text-white text-lg cursor-pointer" @click="getProducts('women/s clothing')">women's clothing</li> 
      <li class="text-white text-lg cursor-pointer" @click="getProducts('electronics')">"electronics"</li> 
      <li class="text-white text-lg cursor-pointer" @click="getProducts('jewelery')">"jewelery"</li> 
      <li class="text-white text-lg cursor-pointer" @click="getProducts('men/s clothing')">"men's clothing"</li> 
      
    </ul>
    <div v-if="loading">
      
      <Loader />
    </div>

    <div class="flex items-center justify-between flex-wrap">
    
            <div v-if="products.length==0" class="mx-auto">
                <span class="loader"></span>
            </div>
            <div v-else  v-for="product of products" :key="product.id" class="xs:w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 p-3">
              <productItem :product="product"
              @click="redirectDetails(product.id)"/>
            </div>
      <!-- paginate -->
        <paginate
  :page-count=currentPage
  :page-range="3"
  :margin-pages="2"
  :click-handler="clickCallback"
  :prev-text="'Prev'"
  :next-text="'Next'"
  :container-class="'product_pagination'"
  :page-class="'page-item'"
>
</paginate>
    </div>
  </div>

</template>

<style>
/* .bg-wrapper {
  background-image: url('./assets/images/bg-wrap.png');
  background-repeat: no-repeat;
  background-size: cover;
} */
.product_pagination{
  width: 100%;
  display: flex;
  justify-content: center;
  margin:10px 10px;

}
.product_pagination .page-link{
  padding: 6px 12px;
  border: 1px solid rgb(196, 226, 200);
  background-color: rgb(93, 220, 161);
  color: green;
  margin: 0 4px;
  border-radius: 16px;
  cursor: pointer;
} 
.product_pagination .page-link.acitve{
  background-color: green;
  color: rgb(93, 220, 161);
} 
.product_pagination .page-link.disabled{
  background-color: black;
  color: rgb(0,0,0.2);
}

.loader{
    display: block;
    position: relative;
    height: 32px;
    width: 200px;
    background: #fff;
    border:2px solid #fff;
    color: red;
    overflow: hidden;
  }
  .loader::before{
    content: '';
    background: red;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    animation: loading 10s linear infinite;
  }
  .loader:after{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    color: rgb(0,255,255);
    mix-blend-mode: difference;
    animation: percentage 10s linear infinite;
  }
  
  @keyframes loading {
    0% { width: 0 }
    100% { width: 100% }
  }
  @keyframes percentage {
    0% { content: "0%"}
    5% { content: "5%"}
    10% { content: "10%"}
    20% { content: "20%"}
    30% { content: "30%"}
    40% { content: "40%"}
    50% { content: "50%"}
    60% { content: "60%"}
    70% { content: "70%"}
    80% { content: "80%"}
    90% { content: "90%"}
    95% { content: "95%"}
    96% { content: "96%"}
    97% { content: "97%"}
    98% { content: "98%"}
    99% { content: "99%"}
    100% { content: "100%"}
  }
</style>
