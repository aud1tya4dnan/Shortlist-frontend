<template>
  <div class="container">
    <h1 class="text-4xl font-sans font-bold">Awikwok Shortener Link</h1>
    <br />
    <div class="label">
      <label class="text-4xl font-sans font-light">Short Your Url! 🚀 </label>
      <input
        type="text"
        id="userinput"
        class="userinputs border-2 border-blue-300 rounded px-4 py-2 mt-4 w-96"
        placeholder="Enter your url"
        v-model="longurl"
        
      />
      <input
        type="text"
        id="userinput"
        class="userinputs border-2 border-blue-300 rounded px-2 py-2 mt-4 w-76"
        placeholder="Enter your shorten link"
        v-model="shorturl"
      />
      <button
        class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded mt-4"
        @click="postLink()"
        @keyup.enter="postLink()"
      >
        Shorten
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import API from ".env";

export default {
  data() {
    return {
      longurl: "",
      shorturl: "",
      uid: "",
      valid: "",
      mylink: "",
      api: API,
    };
  },
  methods: {
    async postLink() {
      const uid  = localStorage.getItem('uid');
      // Pengecekan URL
      if (!this.longurl.startsWith('http://') && !this.longurl.startsWith('https://')) {
        // this.valid = "URL must start with 'http://' or 'https://'";
        alert("URL must start with 'http://' or 'https://'");
        return; // Menghentikan proses selanjutnya jika URL tidak valid
      }
      const res = await axios
        .post( this.api + "link/", {
          flink: this.longurl,
          slink: this.shorturl,
          uid: uid,
          uses: 0,
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/list");
          // location.reload();
        });
    },
    checkUid() {
      this.uid = localStorage.getItem("uid");
      if (this.uid == null || this.uid == "auth/internal-error" || this.uid == "auth/network-request-failed") {
        alert("Please Login First");
        this.$router.push("/");
      } else {
        this.$router.push("/shorten");
      }
    },
  },
  mounted() {
    this.checkUid();
  },
};
</script>

<style scoped>
body {
  background-color: none;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
