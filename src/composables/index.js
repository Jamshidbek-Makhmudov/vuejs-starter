import { onMounted, ref, reactive } from 'vue';

export function UseProduct() {
  const singleProduct = ref(1)
  const bool = ref(false)
  const limitSize = ref(null);
  const loading = ref(false);
  const searchWord = ref("");
  const categorySize = ref(null);
  const currentPage = ref(1)
  const limit=ref(4)

  const product = reactive({
    title: '',
    description: '',
    image: 'https://picsum.photos/500',
    category: '',
    price: null,
    rating: {
      rate: 0,
      count: null,
    }
  })
    
  const products = ref([]);

  const showAddModal = ref(false);
  const showDeleteModal = ref(false);
  const showUpdateModal = ref(false);
  const editingItemId = ref(null);
  
  function resetProductObj() {
    product.category = '';
    product.title = '';
    product.description = '';
    product.price = null;
    product.rating.count = null;
  }
    
    function fetchProducts(limit) {
      fetch(`http://localhost:3000/products?_sort=id&_order=desc${limit ? `&_limit=${limit}`: ''}`)
        .then(res => res.json())
        .then(json => products.value = json).then((res)=>console.log(res)
        )
  }
  
    function onLimitChange() {
      fetchProducts(limitSize.value)
    }
    function onDeleteItem(id) {
      fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(() => {
          fetchProducts(limitSize.value);
        })
  }
     async function searchProduct() {
    if (searchWord.value) {
      const res = await fetch(
        `http://localhost:3000/products?q=${searchWord.value}`
      );
      const data = await res.json();
      products.value = data;
    }
  }
  
    function onSubmitAddItem() {
      fetch(`http://localhost:3000/products`, {
        method: 'POST',
        headers:  { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
      })
        .then(res => res.json())
        .then((item) => {
          if (!item.id) {
            return;
          }
          showAddModal.value = false;
          fetchProducts(limitSize.value);
          resetProductObj()
        })
  }
  
  function onShowUpdateModal(item) {
    showUpdateModal.value = true;
    editingItemId.value = item.id
    product.title = item.title
    product.description = item.description
    product.category = item.category
    product.price = item.price
    product.rating.count = item.rating.count;
  }

  function onSubmitUpdateModal() {
    fetch(`http://localhost:3000/products/${editingItemId.value}`, {
        method: 'PUT',
        headers:  { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
      })
        .then(res => res.json())
        .then((item) => {
          if (!item.id) {
            return;
          }
          showUpdateModal.value = false;
          fetchProducts(limitSize.value);
          resetProductObj()
        })
  }
  async function category () {
    try {
      if(categorySize.value) {
        const res = await fetch(
          `http://localhost:3000/products?category=${categorySize.value}`
        );
        const data = await res.json();
        products.value = data;
      }
    } catch(error) {
      console.error('Error fetching products:', error);
    }
  }
  //get by category
  async function getProducts(type) {
    if (type) {
      loading.value = true;
      fetch(`http://localhost:3000/products?category=${type}`)
      .then(res => res.json())
      .then(json => products.value = json).then((res) => console.log(res)
      );
      loading.value = false;
    } else { 
      loading.value = true;
      fetchProducts(limitSize.value)
      loading.value = false;

    }

  }
  // paginate
  async function clickCallback(){ 
    let data = await fetch(`http://localhost:3000/products?_page=${currentPage}&_limit=${limit}`)
    const res = data.json()
    products.value = res
    
    
  }

      function fetchSingleProduct(id) {
       
        fetch(`http://localhost:3000/products/${id}`)
        .then(res => res.json())
        .then(json =>singleProduct.value = json)
        bool.value = true
    }
    
    onMounted(() => {
      fetchProducts(limitSize.value)
      getProducts()
    })
    
    return {
      products,
      product,
      limitSize,
      showAddModal,
      showDeleteModal,
      showUpdateModal,
      onLimitChange,
      onSubmitUpdateModal,
      onSubmitAddItem,
      onDeleteItem,
      onShowUpdateModal,
      getProducts,
      searchProduct,
      category,
      loading,
      searchWord,
      categorySize,
      currentPage,
      clickCallback,
          singleProduct,
        fetchSingleProduct,
        bool,
    }
}