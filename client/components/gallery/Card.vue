<template>
	<div
		class="w-screen flex justify-center items-center flex-row gap-4"
	>
		<div
			v-for="image in images"
			:key="image.number"
			class="flex justify-center items-center flex-col mt-4 bg-gray-300 rounded-md px-4 py-2 w-[78px] md:w-[100px]"
		>
			<p class="font-semibold text-slate-600 text-lg">
				{{ image.number }}
			</p>
			<p class="text-sm text-slate-400">{{ image.text }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
type InfoCard = {
	number: number;
	text: string;
};
const { images } = defineProps({
	images: {
		type: Array as () => InfoCard[],
		required: true
	}
});
</script>
