<template>
  <div class="dynamic-text-container">
    <p :class="{ 'dynamic-text': true, revealing: isRevealing }">
      {{ dynamicText }}, Original Link: {{ fulllink }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.check();
  },
  data() {
    return {
      url: window.location.href,
      dynamicText: "Redirecting you to the original link...",
      fulllink: "",
      isRevealing: false,
      // api: "https://api.awikwokshort.my.id/api/"
      api: "http://localhost:8000/api/" //DEBUG ONLY
    };
  },
  methods: {
    async check() {
      const redLink = await axios
        .get( this.api + "redirectLink/", {
          params: { url: this.url },
        })
        .then((response) => {
          this.fulllink = response.data;
          window.location.replace(response.data);
        });
    },
    animateText() {
      setInterval(() => {
        this.isRevealing = true;
        setTimeout(() => {
          this.isRevealing = false;
        }, 1500); // Durasi animasi (dalam milidetik)
      }, 3000); // Waktu jeda sebelum animasi dimulai (dalam milidetik)
    },
  },
};
</script>

<style scoped>
.dynamic-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

@keyframes reveal {
  0% {
    width: 0;
  }
  33% {
    width: 33.33%;
  }
  66% {
    width: 66.66%;
  }
  100% {
    width: 100%;
  }
}

.dynamic-text.revealing {
  animation: reveal 1s infinite;
}
</style>