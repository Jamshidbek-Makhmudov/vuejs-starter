<template>
          <label v-if="id" class="block mb-1" :for="id">{{ label }}</label>
          <input @input="$emit('update:modelValue',$event.target.value)" class="w-full" :type="type" :id="id" :placeholder="placeholder"
					:value="value">
					<!-- @input="onInputChange" -->
</template>

<script setup>
const props = defineProps({
	id:{
		id: String,
	default: "",

	},
	label: String,
	type: {
		type: String,
		default:'text',
	},
	placeholder: String,
	modelValue: String,
	value: String,
})

//nu yuqoridagi kod bilan bir xil
const emit = defineEmits(['update:modelValue'])
function onInputChange(e) { 
	emit('update:modelValue',e.targer.value)
}

</script>
