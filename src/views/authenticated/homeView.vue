<template>
  <div class="spotify-container">
    <div class="title-container flex items-center justify-between">
      <h2 class="text-lg text-black rubik mt-5 lg:ml-12 lg:px-5 xl:px-4"><i class="fas fa-music text-blue-500 text-xl mr-2"></i>Top Hits Music</h2>
      <div class="lg:mr-16">
      <button @click="goToMoreMusic" class="text-sm bg-blue-500 hover:bg-blue-600 text-white  mt-5 py-2 px-4 pl rounded"><i class="fas fa-arrow-right mr-2"></i>See More Music</button>
    </div>
  </div>
    <div class="iframe-container">
      <iframe v-for="(track, index) in tracks" :key="index" :src="track" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" class="xl:w-1/2 h-80 lg:h-auto mb-4 lg:mb-0"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const tracks = ref([
  "https://open.spotify.com/embed/track/210JJAa9nJOgNa0YNrsT5g?utm_source=generator",
  "https://open.spotify.com/embed/track/5hnyJvgoWiQUYZttV4wXy6?utm_source=generator",
  "https://open.spotify.com/embed/track/1Fid2jjqsHViMX6xNH70hE?utm_source=generator",
  "https://open.spotify.com/embed/track/3zkWCteF82vJwv0hRLba76?utm_source=generator",
  "https://open.spotify.com/embed/track/1V6gIisPpYqgFeWbMLI0bA?utm_source=generator",
  "https://open.spotify.com/embed/track/0otRX6Z89qKkHkQ9OqJpKt?utm_source=generator",
  "https://open.spotify.com/embed/track/7FlHNJT4TC120CDvFOHzei?utm_source=generator",
  "https://open.spotify.com/embed/track/6Rv8Ltr2MuAIM3LHF4L8qs?utm_source=generator",
  "https://open.spotify.com/embed/track/3QGsuHI8jO1Rx4JWLUh9jd?utm_source=generator",
  "https://open.spotify.com/embed/track/04S1pkp1VaIqjg8zZqknR5?utm_source=generator",
  "https://open.spotify.com/embed/track/4nTjkWK590oBDcnIxTr1mI?utm_source=generator",
  "https://open.spotify.com/embed/track/4ywvnllm7kpaXDsa1VNNpY?utm_source=generator"








]);

function goToMoreMusic() {
  router.push('/views/artist');
}
</script>

<style scoped>
.spotify-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.title-container {
  width: 90%;
}

.iframe-container {
  width: 88%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 30px;
}

.spotify-container iframe {
  width: 90%;
  height: 380px;
  margin-bottom: 10px;
  margin: 3px;
}

/* Adjusting size for xl breakpoint */
@media (min-width: 1280px) {
  .iframe-container iframe {
    width: 25%;
  }
}
</style>






<!-- <script setup>
import axios from 'axios';
import { ref } from 'vue';
import { API_URL } from '@/server';
import { useRouter } from 'vue-router';

const router = useRouter();

const artists = ref([]);

axios.get(`${API_URL}spotify-artist`)
    .then((response) => {
        artists.value = response.data.artists; // Update to response.data.artists
        console.log(artists.value);
    })
    .catch((error) => {
        console.error('An error occurred while fetching Spotify artists:', error);
    });

    const navigateToArtists = () => {
  router.push('/views/artist'); // Replace '/artists' with the path of the route you want to navigate to
};
</script>

<template>
  <section class="w-full">
    <div class="flex justify-between items-center px-4 md:px-8 lg:px-16 xl:px-32 py-6">
      <h1 class="text-blue-600 bg-blue-200 px-3 rounded-lg text-lg md:text-xl lg:text-2xl rubik">
        <i class="fas fa-microphone-alt mr-2 py-1"></i>Top Popular Artist
      </h1>
      <button class="rubik bg-blue-600 px-2 md:px-4 py-2 rounded-md hover:bg-blue-500" @click="navigateToArtists">
        <i class="fas fa-arrow-right mr-1 md:mr-2 text-white rubik"></i>See More Artist
      </button>
    </div>
    <div class="flex flex-wrap justify-center md:justify-between lg:justify-between xl:justify-between py-0 px-4 md:px-8 lg:px-16 xl:px-32 pb-6">
      <div v-for="(artist, index) in artists" :key="index" class="border p-2 md:p-4 rounded-lg my-2 hover:bg-gray-50 w-full sm:w-1/2 md:w-auto lg:w-auto xl:w-auto">
        <img v-if="artist.images.length" :src="artist.images[0].url" alt="Artist Image" class="w-full h-full md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-lg mb-2" />
        <h1 class="text-gray-600 py-1 text-sm md:text-base lg:text-lg xl:text-xl outfit-header">Artist: <span class="outfit-subtext">{{ artist.name }}</span></h1>
        <p v-if="artist.followers" class="text-gray-500 py-1 text-sm md:text-base lg:text-lg xl:text-xl outfit-header">Followers: <span class="outfit-subtext">{{ artist.followers.total }}</span></p>
        <p v-if="artist.genres.length" class="text-gray-500 py-1 text-sm md:text-base lg:text-lg xl:text-xl outfit-header">Genres: <span class="outfit-subtext">{{ artist.genres.join(', ') }}</span></p>
      </div>
    </div>
  </section>
</template> -->
