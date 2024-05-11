<template>
  <section class="border">
    <div class="w-full flex justify-between bg-blue-200 items-center border-b border-blue-500  px-4">
      <p class="bg-green-500 p-1 rounded-full"></p>
      <p class="rubik text-blue-700">Public Chat Group</p>
      <svg @click="toggleVisibility" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 my-2" fill="none"
        viewBox="0 0 24 24" stroke="blue">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </div>
    <div class="w-full py-6 px-4 bg-blue-200" style="max-height: 420px; overflow-y: auto; height: 53vh;">
      <ul class="my-2" v-for="(message, index) in messages" :key="index">
        <div v-if="message.username === username">
          <p class="my-2"> <small class="mr-2 text-blue-600">You </small></p>
          <span class=" bg-blue-600 p-2 text-white my-2 rounded-lg"> {{ message.text }}</span>
        </div>

        <div v-else class="text-right">
          <p class="my-2"><small class="text-gray-400">{{ message.username }}</small></p>
          <span class=" bg-indigo-600 p-2 text-white my-2 rounded-lg"> {{ message.text }}</span>
        </div>
      </ul>
    </div>
    <div class="mx-auto sticky left-0 w-full bottom-0 pb-6 bg-blue-200 px-4">
      <div class="flex">
        <input type="text" class="text-blue-600 px-2 py-3 outline-none rounded w-full bg-blue-300 placeholder-blue-600" v-model="messageInput"
          placeholder="Type your message">
        <button @click="sendMessage" class="bg-blue-600 text-white px-4 ml-2 rounded"><i class="fas fa-paper-plane"></i>
</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import { useAuthStore } from '@/stores/store';
import { decodeJWT } from '../stores/jwt';

const store = useAuthStore();


const emit = defineEmits(['toggle-visibility']);

const toggleVisibility = () => {
  emit('toggle-visibility');
};


let userEmail = '';
if (store.token != null) {
  const decodedToken = decodeJWT(store.token);
  userEmail = decodedToken.email;
}

const messageInput = ref('');
const messages = ref(JSON.parse(sessionStorage.getItem('chatMessages')) || []);
const username = ref(userEmail); 

let socket;

onMounted(() => {
  const serverURL = `${window.location.protocol}//${window.location.host.replace(/:\d+$/, '')}`;
  const API_URL = `${serverURL}`;
  socket = io(`${API_URL}:3000`);

  socket.on('message', (data) => {
    messages.value.push(data);
    sessionStorage.setItem('chatMessages', JSON.stringify(messages.value));
  });
});

const sendMessage = () => {
  const message = {
    username: username.value,
    text: messageInput.value
  };
  socket.emit('message', message);
  messageInput.value = '';
};
</script>
<style scoped>
/* Custom scrollbar styles */
/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  /* Semi-transparent black */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.1);
  /* Darker semi-transparent black on hover */
}


</style>
