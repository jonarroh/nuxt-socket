<template>
	<h1 class="text-4xl text-center font-bold">hola mundo</h1>
	<div class="flex flex-col items-center justify-center">
		<input
			class="border-2 border-gray-500 rounded-md p-2 w-1/2"
			type="text"
			placeholder="Message"
			v-model="message"
		/>

		<button
			class="bg-blue-500 text-white rounded-md p-2 w-1/2"
			@click="sendMessage"
			type="button"
		>
			Send
		</button>
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

const message = ref('');

const socket = io('/');

const sendMessage = () => {
	console.log(message.value);
	socket.emit('message', message.value);
	message.value = '';
};

//ver si hay un evento de mensaje y si lo hay, imprimirlo en consola
socket.on('message', data => {
	console.log(data);
});
</script>
