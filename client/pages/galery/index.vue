<script setup lang="ts">
import { ref } from 'vue';

type InfoCard = {
	number: number;
	text: string;
};

const infoCard = ref<InfoCard[]>([
	{
		number: 100,
		text: 'Posts'
	},
	{
		number: 2242,
		text: 'Followers'
	},
	{
		number: 1432,
		text: 'Following'
	}
]);
</script>

<template>
	<header
		class="w-screen flex justify-center items-center flex-col mt-[30px] md:mt-[60px]"
	>
		<img
			src="/gallery/profilePhoto.png"
			alt="profile photo"
			class="w-[101.76px] md:w-[156px] rounded-md"
		/>
		<h3 class="text-2xl font-semibold mt-4 text-slate-600">
			Rodney Cotton
		</h3>
		<p class="text-sm text-slate-400 mt-2 font-bold">
			Helsinki, Finland
		</p>
	</header>
	<GalleryCard :images="infoCard" />
	<GalleryGrid />
</template>
