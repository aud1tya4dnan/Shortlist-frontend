<template>
    <div class="box-border h-screen w-screen bg-gray-100 dark:bg-gray-800">
      <div class="box-content square rounded-md h-96 w-96 p-6 border-4">
          <div id="loginform" class="text-white">
              <h1 class="font-sans justify-center items-center flex mb-2 text-4xl font-bold ">Register</h1>
                  <label for="username" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="text" id="username" name="username" placeholder="Email" v-model="email" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <label for="password" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" id="password" name="password" @keypress.enter="postUser()" placeholder="Password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <br>
              <div class="flex">
                <input type="submit" value="Sign-up" @click="postUser()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <br>
              </div>
              <div>
                <p>Allready have an account? <RouterLink to="/" class="text-primary text-blue-500 fw-bold">Login</RouterLink></p>
              </div>
          </div>
      </div>
    </div>
  
</template>

<script>
import axios from "axios";

export default {
    data() {
    return {
      api:'https://api.awikwokshort.my.id/api',
    };
    },
    methods: {
    async postUser() {
            let res = await axios.post( this.api + "/register", {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                // console.log(response)
                alert("Register Success");
                this.$router.push('/')
            })
            .catch((error) => {
                console.log(response)
            })
    }
    
    },
    mounted() {
    },
};
</script>

<style scoped>
  .square {
    background-color: rgb(19, 202, 199);
  }
  .box-border {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #password {
    width: 20vw;
    min-width: 100%;
  }
  #username {
    width: 20vw;
    min-width: 100%;
  }
</style>
