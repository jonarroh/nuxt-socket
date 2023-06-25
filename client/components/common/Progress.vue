<template>
	<h2 class="ml-6 pt-3 text-lg font-semibold">Uploading...</h2>
	<div class="flex flex-wrap p-4">
		<div
			class="border border-gray-300 shadow rounded-md w-full relative"
		>
			<div class="h-2 bg-gray-300 rounded-md">
				<div class="h-full bg-blue-500 progressbar rounded-md"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@keyframes progress-move {
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(100%);
	}
}

.progressbar {
	width: 50%;
	animation: progress-move 2s linear infinite;
}
</style>
