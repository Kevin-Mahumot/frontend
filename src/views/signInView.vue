<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { API_URL } from '@/server';

const router=useRouter();

const email = ref();
const password = ref();
const showPassword = ref(false);

const send = () => {
  const data = {
    email: email.value,
    password: password.value
  };
  axios.post(`${API_URL}login`, data).then((response) => {
    if (response.data.success) {
      console.log(response.data.token);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('username', email.value);

      location.reload();
    } else {
      console.log(response.data.error);
    }

  });


}
const closeLogin=ref(false);
const back=()=>{
  closeLogin.value=true;
  setTimeout(()=>{
    router.push({path:'/'});
    closeLogin.value=false;
  },200);
 
}


  
</script>
<template>
  
  <div class="flex w-full min-h-full flex-1 flex-col justify-center px-5 py-5 lg:px-8 fixed top-0 bg-white animate-slide-in-login" :class="{ 'animate-slide-out-login':closeLogin}">
    <div class="lg:ml-10 xl:pl-10 lg:pl-5 lg:mb-3 sm:flex sm:items-center sm:justify-between">
    <svg @click="back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-9 h-9 border p-2 rounded-lg mb-2 sm:mb-0">
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </svg>
    <h2 class="text-3xl leading-9 tracking-tight text-gray-700 outfit-header"></h2>
</div>


<div class="font-[sans-serif] text-[#333] max-w-7xl mx-auto h-screen ">
      <div class="grid md:grid-cols-2 items-center gap-8">
        <form class="max-w-lg max-md:mx-auto w-full " @submit.prevent="send">
          <div class="mb-8">
            <h3 class="text-4xl font-extrabold mt-2">Sign in</h3>
            <p class="text-sm mt-6">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
          </div>
          <div>
            
            <label class="text-[15px] mb-3 block">Email</label>
            <div class="relative flex items-center">
              <input name="email" type="text" v-model ="email" required class="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600" placeholder="Enter email" />
            
              <i class="fas fa-envelope absolute text-blue-500 right-4"></i>
            </div>
          </div>
          <div class="mt-6">
            <label class="text-[15px] mb-3 block">Password</label>
            <div class="relative flex items-center">
              <input name="password" :type="showPassword ? 'text' : 'password'" v-model="password" required class="w-full text-sm bg-gray-100 px-4 py-4 rounded-md outline-blue-600" placeholder="Enter password" />
              <i
  class="fas absolute right-4 text-blue-500" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'  "@click="showPassword = !showPassword" style="right: 1rem; cursor: pointer; "></i>

            </div>
          </div>
          <div class="flex items-center gap-4 justify-between mt-4">
    <div class="text-sm ml-auto">
      <RouterLink to="/forgotPassword">
        <a href="javascript:void(0);" class="text-blue-600 hover:underline">
            Forgot your password?
        </a>
      </RouterLink> 
    </div>
</div>
          <div class="mt-5">
            <button type="submit" class="w-full shadow-xl py-3 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Log in
            </button>
          </div>
          <p class="text-sm mt-3 text-center mb-12">Don't have an account? <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1"><RouterLink to="/signUp">Sign Up here</RouterLink></a></p>
        </form>
        <div class=" flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-blue-500 before:via-blue-500 before:to-blue-200 before:h-full before:w-3/5 before:right-0 before:z-0 image-container">
          <img  src="https://readymadeui.com/photo.webp" class="rounded-md md:w-3/5 md:w-11/12 z-50 relative h-full w-full" alt="Dining Experience" />
        </div>
      </div>
    </div>
    </div>
  
  
</template>
<style scoped>
/* bottom to top */

@keyframes slide-in-login {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-login {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

.animate-slide-in-login {
  animation: slide-in-login 0.5s forwards;
}

.animate-slide-out-login {
  animation: slide-out-login 0.5s forwards;
}


.image-container {
  height: 80%; /* Take up the full height of the viewport */
  overflow-y: auto; /* Enable vertical scrolling if the content overflows */
  padding-bottom:80px;
  
}


</style>
