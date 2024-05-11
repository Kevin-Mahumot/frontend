<script setup>
import {ref} from 'vue';
import axios from 'axios';
import { RouterLink,useRouter } from 'vue-router';
import { API_URL } from '@/server';
import Swal from 'sweetalert2';

const fullname=ref();
const email = ref();
const password = ref();
const showPassword = ref(false);

const router=useRouter();
const send=()=>{
    const data={
     fullname:fullname.value,
     email:email.value,
     password:password.value
    };
    axios.post(`${API_URL}user`, data).then((response) => {
    console.log(response.data);
    if (response.data.success) {
      // Show sweet alert on success
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully registered.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirect to sign-up page
        router.push({ path: '/signIn' });
      });
    }
  });
};


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
  <div class="flex w-full min-h-full flex-1 flex-col justify-center px-4 py-5 lg:px-8 fixed top-0 bg-white animate-slide-in-logout" :class="{ 'animate-slide-out-logout':closeLogin}">
    <div class=" xl:pl-5 xl:ml-2 md:ml-2  lg:mb-3 sm:mx-auto sm:w-full sm:max-w-sm">
    
      <svg @click="back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-9 h-9 border p-2 rounded-lg">
      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
    </div>

    <div class="rubik text-black">
      <div class="min-h-screen flex fle-col items-center justify-center  p-1 ">
        <div class="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <form class=" md:max-w-md pb-20 mb-20" @submit.prevent="send" style="margin-bottom: 6rem;">
            <h3 class="text-4xl xl:text-3xl font-extrabold mt-2 mb-5 ">Sign Up</h3>
            <p class="text-sm xl:mb-5 lg:mb-5">Get in tune with JJK Spotify! Sign up now to unlock a world of music, podcasts, and playlists tailored just for you. </p>
            <div class="space-y-2">
              <div class="relative">
    <label class="text-sm mb-2 mt-2 block">Fullname</label>
    <div class="relative">
        <input name="fullname" type="text" v-model="fullname" class=" px-3 bg-gray-100 rounded-lg w-full text-sm pr-10 py-4 focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter fullname" autocomplete="fullname" required/>
        <i class="fas fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
       </div>
       </div>
       <div class="relative">
    <label class="text-sm mb-2 block">Email</label>
    <div class="relative">
        <input name="email" type="email" v-model="email" class="px-3 bg-gray-100 rounded-lg w-full text-sm pr-10 py-4 focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email" autocomplete="email" required/>
        <i class="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"></i>
    </div>
</div>
<div class="relative">
    <label class="text-sm mb-2 block">Password</label>
    <div class="relative">
        <input name="password" :type="showPassword ? 'text' : 'password'" v-model="password" class="bg-gray-100 rounded-lg w-full text-sm px-3 py-4 focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password" autocomplete="password" required/>
       
        <i class="fas absolute right-3 text-blue-500 top-1/2 transform -translate-y-1/2" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" @click="showPassword = !showPassword" style="cursor: pointer;"></i>
    </div>
</div>

            </div>
            <div class="mt-5">
              <button type="submit" class="py-4 px-6 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
                Create an account
              </button>
            </div>
            <p class="text-sm mt-2">Already have an account? <a href="javascript:void(0);" class="text-blue-500 font-semibold hover:underline ml-1"><RouterLink to="/signIn">Sign In here</RouterLink></a></p>
          </form>
          <div class="h-full max-md:mt-10">
            <img src="https://readymadeui.com/login-image.webp" class="" alt="Dining Experience" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

/* bottom to top */

@keyframes slide-in-logout {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-out-logout {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

.animate-slide-in-logout {
  animation: slide-in-logout 0.5s forwards;
}

.animate-slide-out-logout {
  animation: slide-out-logout 0.5s forwards;
}
</style>