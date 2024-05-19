<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '@/server';

const title = ref('');
const tracks = ref([]);

const selectedTrackId = ref(null);
const play = (trackId) => {
    selectedTrackId.value = trackId;
};
const toggle=ref(true);
const search = () => {
    toggle.value=false;
    axios.get(`${API_URL}spotify-tracks/${title.value}`)
        .then((response) => {
            tracks.value = response.data.tracks;
            console.log(tracks.value);
        })
        .catch((error) => {
            console.error('An error occurred while fetching Spotify tracks:', error);
        });
}
</script>

<template>
    <div class="w-full mx-4 lg:mx-32 xl:mx-32 mb-20 lg:mb-0 xl:mb-0">
        <section class="flex justify-end items-center my-6 lg:my-12 xl:my-12">
         
            <!-- <input type="search" v-model="title"
                class="text-gray-800 border py-2 px-4 w-full sm:w-52 md:w-52 lg:w-52 xl:w-52 rounded-tl-md rounded-bl-md">
            <button @click="search" class="p-2 bg-indigo-600 rounded-tr-md rounded-br-md">Search</button> -->

            <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/3 ">
                <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input @keyup.enter="search" type="search" v-model="title"
                        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-blue-600  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Music" required />
                    <button @click="search"
                        class="text-white absolute end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>
        </section>
        <div class="flex flex-col justify-center items-center h-full text-center" v-show="toggle">
    <p class="text-gray-600 text-6xl dancing-script mx-auto">Search For Your Favorite Music.</p>
    <img src="../../assets/listening.png" height="5" width="400" class="mt-auto ">
</div>

        <div class="lg:flex xl:flex">
            <section class="xl:w-1/2 lg:w-1/2 w-full">
                <iframe v-if="selectedTrackId" style="border-radius:12px" v-for="track in tracks" :key="track.id"
                    v-show="track.id === selectedTrackId" class="w-full lg:w-4/5 xl:w-110" height="400"
                    :src="'https://open.spotify.com/embed/track/' + track.id + '?utm_source=generator'" frameborder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            </section>
            <section class="xl:w-1/2 lg:w-1/2 w-full" style="max-height: 350px; overflow-y: auto;">
                <div v-for="track in tracks" :key="track.id" @click="play(track.id)"
                    class="w-full flex border p-4 mb-2 rounded-lg cursor-pointer hover:bg-indigo-50">
                    <p>
                        <img :src="track.album.images[0].url" :alt="track.name" style="border-radius: 12px;"
                            class="w-24 h-24">
                    </p>
                    <p class="mx-4 my-auto text-gray-600">
                    <p class=""><span class="outfit-header">Title:</span>{{ track.name }}</p>
                    <p class=""><span class="outfit-header">Artist: </span> {{ track.artists[0].name }}</p>
                    </p>
                </div>
            </section>
        </div>

    </div>
</template>
