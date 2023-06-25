<template>
	<section class="flex flex-col items-center justify-center">
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

		<div class="flex items-center mt-4">
			<input
				ref="input"
				class="flex-1 border border-gray-300 px-2 py-1 rounded"
				accept="image/jpeg, image/png"
				:value="urlToCopy"
				readonly
			/>
			<button
				class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
				@click="copyText"
			>
				Copiar
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import Check from '~/components/SVG/Check.vue';

const { urlToCopy } = defineProps({
	image: {
		type: String,
		required: true,
		default: '/image.svg'
	},
	urlToCopy: {
		type: String,
		required: true,
		default: ''
	}
});

const copyText = () => {
	navigator.clipboard.writeText(urlToCopy);
};
</script>
