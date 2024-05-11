<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_URL } from '@/server';

const router = useRouter();

const email = ref();
const password = ref();
const emailToverify = ref();
const newPass = ref(false);
const saveTochange = ref(false);
const showPassword = ref(false);

const sendingEmail = ref('Send')
const msgError = ref(null)
const send = () => {
  sendingEmail.value = 'Sending';
  const data = {
    email: email.value,
  };
  axios.post(`${API_URL}password`, data).then((response) => {
    if (response.data.success) {
      emailToverify.value = response.data.msg;
      newPass.value = true;
      sendingEmail.value = 'Send';
    } else {
      msgError.value = response.data.error;
      sendingEmail.value = 'Send';
      setTimeout(() => {
        msgError.value = null;
      }, 2000);
    }

  });


}
const closeLogin = ref(false);
const back = () => {
  closeLogin.value = true;
  setTimeout(() => {
    router.push({ path: '/' });
    closeLogin.value = false;
  }, 200);

}

const number = ref();
const codeError=ref();
const code = () => {
  const data = {
    code: number.value,
  };
  axios.post(`${API_URL}code`, data).then((response) => {
    if (response.data.success) {
      newPass.value = false;
      saveTochange.value = true;
    } else {
      codeError.value=response.data.error;
      setTimeout(() => {
        codeError.value = null;
      }, 2000);
    }

  });

}
let save = ref('Reset password');
const ValidationError = ref();
const toast = ref(false);
const Save = () => {
  save.value = 'Sending';
  const userId = 19;
  const data = {
    password: password.value,
  };
  axios.put(`${API_URL}newPassword/${userId}`, data).then((response) => {
    if (response.data.success) {
      console.log(response.data.msg);
      setTimeout(() => {
        save.value = 'Save';
        toast.value = true;
        setTimeout(() => {
          toast.value = false;
          router.push({path:'/views/home'})
        }, 2000);
      }, 2000)
    } else {
      save.value = 'Reset password';
     ValidationError.value=response.data.errors[0].msg;
      setTimeout(() => {
        ValidationError.value = null;
      }, 2000);
    }
  });
}

</script>
<template>

  <div
    class="flex w-full min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-8 fixed top-0 bg-white animate-scale-in-login"
    :class="{ 'animate-scale-out-login': closeLogin }">
    <div class="toast-container mt-4 w-full left-4 lg:left-32 xl:left-23 top-0 fixed overflow-hidden  z-20 ">
      <div v-show="toast" class="toast-content" :class="{ 'animate-slide-in': toast }">
        <div class="bg-green-500 text-white flex items-center w-max max-w-sm px-4 py-4 rounded" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 shrink-0 fill-white inline mr-2" viewBox="0 0 512 512">
      <ellipse cx="256" cy="256" fill="#fff" data-original="#fff" rx="256" ry="255.832" />
      <path class="fill-green-500"
        d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
        data-original="#ffffff" />
    </svg>
    <span class="block sm:inline text-sm font-semibold mr-4">Password changed successfully</span>
    
  </div>
      </div>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <button @click="back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-9 h-9 border p-2 rounded-lg">
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
      <h2 class="text-3xl leading-12 tracking-tight text-gray-700 rubik">{{ !emailToverify ? 'To initiate the password change process, please provide your email address.': newPass ? 'Please Enter Verification Code: Secure Access Confirmation': 'Update Your Password: Strengthen Your Security' }}</h2>
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="send" v-show="!emailToverify">
        <div>
          <div class="mt-2 relative">
            <input id="email" name="email" v-model="email" type="email" autocomplete="email" required
              class="block outline-blue-500 w-full rounded-md border-0 p-4 pr-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 rubik"
              placeholder="Email" />
              <button type="submit"
        class="absolute inset-y-0 right-0 px-4 py-2 rounded-md bg-blue-600 rubik font-bold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{{
          sendingEmail }}</button>
          </div>
          <small v-show="msgError" class="mx-4 text-red-500 outfit-subtext">{{ msgError }}</small>
        </div>
        <!-- <div>
          <button type="submit"
            class="flex  justify-center rounded-md bg-blue-600 p-4 rubik font-bold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{
              sendingEmail }}</button>
        </div> -->
      </form>
      <form class="space-y-6" @submit.prevent="code" v-show="newPass">
        {{ emailToverify }}
        <div>
          <div class="relative">
            <input id="number" name="number" v-model="number" type="number" autocomplete="number" required
              class="block outline-blue-500 w-full rounded-md border-0 p-4 pr-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 rubik"
              placeholder="Code" />
              <button type="submit"
            class="absolute inset-y-0 right-0 px-4 py-2 rounded-md bg-blue-600 rubik font-bold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Send</button>
          </div>
          
          <small v-show="codeError" class="mx-4 text-red-500 outfit-subtext">{{ codeError }}</small>
        </div>
        <!-- <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 p-4 outfit-font font-bold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send</button>
        </div> -->
      </form>
      <form class="space-y-6" @submit.prevent="Save" v-show="saveTochange">
        {{ emailToverify }}
        <div>
          <div class="mt-2 relative">
            <input id="password" name="password" v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password"
              required
              class="block outline-blue-500 w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500  rubik"
              placeholder="Password" />
              <i
  class="fas absolute right-4 top-5 text-blue-500" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'  "@click="showPassword = !showPassword" style="right: 1rem; cursor: pointer; "></i>
          </div>
          <small v-show="ValidationError" class="mx-4 text-red-500 outfit-subtext">{{ ValidationError }}</small>
        </div>
        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 p-4 outfit-font font-bold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 mr-2 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                      </svg>{{ save }}</button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
/* scale-in */

@keyframes scale-in-login {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-out-login {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0);
    opacity: 0;
  }
}

.animate-scale-in-login {
  animation: scale-in-login 0.5s forwards;
}

.animate-scale-out-login {
  animation: scale-out-login 0.5s forwards;
}

.toast-container {
  overflow: hidden;
}


</style>
