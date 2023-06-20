<script setup>
defineProps({
	to: {
		type: String,
		required: true
	}
});
</script>

<template>
	<nuxt-link :to="to">
		<slot />
	</nuxt-link>
</template>

<style scoped>
a {
	color: #fff;
	text-decoration: none;
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
	background-color: #000;
	margin: 0.5rem;
}
</style>
