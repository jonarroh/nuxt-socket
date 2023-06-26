<template>
	<main
		class="w-screen h-screen flex justify-center items-center flex-col"
	>
		<div v-if="isUpload" class="drop-shadow-lg w-3/6 rounded-lg">
			<Copy :image="image" :url-to-copy="urlToCopy.url" />
			<div class="flex justify-center items-center mt-4">
				<button
					class="bg-blue-500 text-white rounded-md p-2"
					@click="resetPage"
				>
					Return
				</button>
			</div>
		</div>
		<div
			class="w-1/2 h-1/2 flex drop-shadow-lg rounded-lg flex-col"
			v-show="!isUploading && !isUpload"
		>
			<header class="mt-8 text-center">
				<h1 class="text-4xl font-bold">Upload your image</h1>
				<p class="text-gray-500 mt-4">
					File should be Jpeg, Png, ...
				</p>
			</header>
			<div
				class="flex justify-center items-center flex-col w-full h-full"
			>
				<section
					@dragenter="addDragOver($event)"
					@dragleave="removeDragOver($event)"
					@dragover="addDragOver($event)"
					@drop="dropFile($event)"
					class="w-5/6 h-full flex justify-center items-center flex-col bg-[#F6F8FB] align-middle border-dashed border-2 border-sky-500 rounded-lg mt-8"
				>
					<img src="/image.svg" alt="img" />
					<p class="text-gray-500 text-center mt-4">
						Drag & Drop your image here
					</p>
				</section>
				<p class="text-gray-500 text-center mt-4 mb-4">or</p>
				<div>
					<input id="archivo" type="file" style="display: none" />
					<button
						class="bg-blue-500 text-white rounded-md p-2"
						@click="uploadFile"
					>
						Choose a file
					</button>
				</div>
			</div>
		</div>
		<section
			class="drop-shadow-lg w-2/6 p-8 rounded-lg mt-8"
			v-show="isUploading"
		>
			<Progress />
		</section>
	</main>
</template>

<script setup lang="ts">
import Progress from '~/components/common/Progress.vue';
import Copy from '~/components/common/Copy.vue';
import { type CloudinaryAsset } from '~/server/api/upload.post';

definePageMeta({
	layout: 'index'
});

let dragTimeout: number | NodeJS.Timeout;
let isUploading = ref(false);
let image = ref<any>(null);
let isUpload = ref(false);
let urlToCopy = ref<any>(null);

const resetPage = () => {
	isUploading.value = false;
	image.value = null;
	isUpload.value = false;
	urlToCopy.value = null;
};

const uploadFile = (e: DragEvent | MouseEvent): void => {
	e.preventDefault();
	e.stopPropagation();

	console.log('upload file');
	const archivo = document.getElementById(
		'archivo'
	) as HTMLInputElement;
	if (!archivo) {
		alert('No se encontro el archivo');
		return;
	}
	archivo.click();
	archivo.addEventListener('change', async e => {
		await sendToCloudinary(e);
	});
};

const sendToCloudinary = async (
	e: DragEvent | Event
): Promise<void> => {
	if (e instanceof DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	const target = e.target as HTMLInputElement;
	let file: File | undefined;
	if (e instanceof DragEvent) {
		file = e.dataTransfer?.files[0];
	} else {
		if (!target.files) {
			return;
		}
		file = target.files[0];
	}
	if (!file) {
		alert('No se encontro el archivo');
		return;
	}

	const img = await fileToBase64(file);
	isUploading.value = true;
	try {
		const { data } = await useFetch<CloudinaryAsset>('/api/upload', {
			method: 'POST',
			body: JSON.stringify({
				file: img
			})
		});
		if (data) {
			image.value = img;
			isUpload.value = true;
			urlToCopy.value = data.value;
		}
	} catch (error) {
		console.error(error);
	} finally {
		isUploading.value = false;
	}
};

const addDragOver = (e: DragEvent): void => {
	e.preventDefault();
	e.stopPropagation();
	clearTimeout(dragTimeout);
	const target = e.target as HTMLInputElement;
	target.classList.add('drap-zone');
};

const removeDragOver = (e: DragEvent): void => {
	e.preventDefault();
	e.stopPropagation();
	const target = e.target as HTMLInputElement;
	dragTimeout = setTimeout(function () {
		target.classList.remove('drap-zone');
	}, 500);
};

const dropFile = async (e: DragEvent): Promise<void> => {
	e.preventDefault();
	e.stopPropagation();
	const target = e.target as HTMLInputElement;
	target.classList.remove('drap-zone');
	console.log(e.dataTransfer?.files);
	await sendToCloudinary(e);
};

const fileToBase64 = (
	file: File
): Promise<string | ArrayBuffer | null> => {
	return new Promise<string | ArrayBuffer | null>(
		(resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		}
	);
};
</script>

<style scoped>
.drap-zone {
	filter: brightness(0.8);
}
</style>
