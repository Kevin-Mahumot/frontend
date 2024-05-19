<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { API_URL } from '@/server';
import { useRouter } from 'vue-router';

const router = useRouter();
const artists = ref([]);
const title = ref('top-artists');

const selectedTrackId = ref(null);

// pagination
const currentPage = ref(1);
const itemsPerPage = 6;

//fetch artists
const fetchArtists = () => {
  axios.get(`${API_URL}spotify-tracks/${title.value}`)
    .then((response) => {
      artists.value = response.data.tracks;
    })
    .catch((error) => {
      console.error('An error occurred while fetching Spotify tracks:', error);
    });
};

const play = (trackId) => {
    selectedTrackId.value = trackId;
};

const closePlayer = () => {
    selectedTrackId.value = null;
};

onMounted(() => {
  fetchArtists();
});

const paginatedArtists = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return artists.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(artists.value.length / itemsPerPage));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

function seeMore() {
  router.push('/views/artist');
}
</script>



<template>
  <section class="w-full">
    <div class="md:flex lg:flex xl:flex justify-between items-center px-4 xl:px-32 lg:px-32 py-12">
      <h1 class="text-blue-600 text-2xl rubik">Top Tracks</h1>
      <div class="lg:mr-50">
      <button @click="seeMore" class="text-sm bg-blue-500 hover:bg-blue-600 text-white  mt-5 py-2 px-4 pl rounded"><i class="fas fa-arrow-right mr-2"></i>See More</button>
    </div>
    </div>
    <div class="lg:flex xl:flex md:flex md:flex-wrap w-full py-0 lg:justify-between xl:justify-between md:justify-between pb-12 lg:px-32 xl:px-32 px-4">
      <div v-for="(track, index) in paginatedArtists" :key="index" class="bg-blue-400 border border p-4 rounded-lg my-4 mx-2 hover:bg-blue-500 transition-all duration-300 w-full md:w-1/4 lg:w-1/4 xl:w-1/4">
        <img v-if="track.album.images.length" :src="track.album.images[0].url" alt="Track Image" class="w-full h-full md:w-72 md:h-72 lg:w-72 xl:w-72 lg:h-72 xl:h-72 rounded-lg" />
        <h1 class="text-black-600 py-2 outfit-header">Track: <span class="outfit-subtext">{{ track.name }}</span></h1>
        <h2 class="text-black-600 py-1 outfit-header">Artist: <span class="outfit-subtext">{{ track.artists[0].name }}</span></h2>
        <p v-if="track.album.name" class="text-black-500 py-1 outfit-header">Album: <span class="outfit-subtext">{{ track.album.name }}</span></p>
        <p v-if="track.popularity" class="text-black-500 py-1 outfit-header">Popularity: <span class="outfit-subtext">{{ track.popularity }}</span></p>
        <button @click="play(track.id)"
              class="bg-blue-800 font-bold text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none "><i class="fas fa-play"></i></button>
      </div>
    </div>
    <div class="flex justify-center items-center mb-12">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-4 py-2 mx-2 bg-blue-700 font-bold text-white rounded-md hover:bg-blue-600"><i class="fas fa-arrow-left"></i></button>
      <span class="text-blue-600 rubik mx-2">{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-2 bg-blue-700 font-bold text-white rounded-md hover:bg-blue-600"><i class="fas fa-arrow-right"></i></button>
    </div>
  </section>
 
  <transition name="footer">
    <footer v-if="selectedTrackId" class="animate-slide-in-login fixed bottom-0 left-0 w-full bg-blue-400 pt-7 border-t rounded-lg border-blue-200 p-4 flex justify-between items-center">
      <iframe :src="'https://open.spotify.com/embed/track/' + selectedTrackId"
        class="w-full h-24" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      <button @click="closePlayer"
        class="close-button text-gray-500 rubik text-white w-30 ml-4 py-2 bg-blue-500 px-3 rounded-full mb-5 hover:bg-blue-700 focus:outline-none ease-in-out">
        <i class="fas fa-times text-3xl"></i>
      </button>
    </footer>
  </transition>

</template>

<style>
.outfit-header {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
}

.outfit-subtext {
  font-family: 'Outfit', sans-serif;
  font-weight: 400;
}


.footer-enter-active, .footer-leave-active {
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  }
  .footer-enter, .footer-leave-to /* .footer-leave-active in <2.1.8 */ {
    transform: translateY(100%);
    opacity: 0;
  }

  
  


</style>

















<!-- <template>
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






 <script setup>
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
