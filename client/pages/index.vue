<template>
	<h1 class="text-4xl text-center font-bold">hola mundo</h1>
	<div class="flex flex-col items-center justify-center">
		<input
			class="border-2 border-gray-500 rounded-md p-2 w-1/2"
			type="text"
			placeholder="Message"
			v-model="msj"
		/>

		<button
			class="bg-blue-500 text-white rounded-md p-2 w-1/2"
			@click="sendMessage"
			type="button"
		>
			Send
		</button>

		<div class="flex flex-col items-center justify-center w-1/2">
			<div
				class="border-2 border-gray-500 rounded-md p-2 w-full"
				v-for="(message, index) in listMessages"
				:key="index"
			>
				{{ message }}
			</div>
		</div>
	</div>
</template>

<script setup>
import io from 'socket.io-client';

definePageMeta({
	title: 'Home',
	meta: [
		{
			hid: 'description',
			name: 'description',
			content: 'This is the home page'
		}
	],
	layout: 'index'
});

const msj = ref('');
const listMessages = ref(['hola', 'mundo']);

const socket = io('/');

const sendMessage = () => {
	console.log(msj.value);
	socket.emit('message', msj.value);
	listMessages.value.push(msj.value);
	msj.value = '';
};

//ver si hay un evento de mensaje y si lo hay, imprimirlo en consola
socket.on('message', data => {
	console.log(data);
	listMessages.value.push(data);
});


</script>
