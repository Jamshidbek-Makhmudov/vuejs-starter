<script setup >
	
</script>
<template>
	<div class="flex items-center justify-center bg-white ">
		<span class="loader"></span>
		
	</div>
</template>
<style  scoped>
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #333;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
	
</style>