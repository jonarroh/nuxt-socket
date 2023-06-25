<template>
	<section
		class="flex flex-col items-center justify-center bg-[#F6F8FB] w-1/2 h-1/2"
	>
		<header class="flex flex-col items-center justify-center">
			<Check />
			<h2 class="text-4xl font-bold text-center mt-2 text-[#4F4F4F]">
				Uploaded Successfully!
			</h2>
		</header>

		<img
			:src="image"
			alt="copy img"
			class="mt-8 rounded-lg drop-shadow-lg w-2/6 h-2/6 object-cover"
		/>

		<div class="flex items-center space-x-2 mt-4">
			<input
				ref="input"
				class="flex-1 border border-gray-300 px-2 py-1 rounded"
				:value="textToCopy"
				readonly
			/>
			<button
				class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
				@click="copyText"
			>
				Copiar
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import Check from '~/components/SVG/Check.vue';

defineProps({
	image: {
		type: String,
		required: true,
		default: '/image.svg'
	}
});

const textToCopy = ref('https://www.google.com');

const copyText = () => {
	navigator.clipboard.writeText(textToCopy.value);
};
</script>
