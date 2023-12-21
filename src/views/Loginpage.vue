
<template>
  <div class="box-border h-screen w-screen bg-gray-100 dark:bg-gray-800">
    <div class="box-content square rounded-md h-96 w-96 p-6 border-4">
        <div id="loginform" class="text-white">
            <h1 class="font-sans justify-center items-center flex mb-2 text-4xl font-bold ">Login</h1>
                <label for="username" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Email</label>
                <input type="text" id="username" name="username" placeholder="Email" v-model="email" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <label for="password" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" name="password" @keypress.enter="login()" placeholder="Password" v-model="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <br>
            <div class="flex">
              <input type="submit" value="Login" @click="login()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <br>
              <p class="ml-4">Dont have account? <a href="/register">Register Now!</a></p>
            </div>
        </div>
    </div>
  </div>

</template>


<script>
import axios from "axios";
import API from ".env";

export default {
    data() {
        return {
            uid: null,
            api: API,
        };
    },
    methods: {
        // login functions
        async login() { 
            const res = await axios.post( this.api + "/login", {
                email: this.email,
                password: this.password,
            })
                .then((response) => {
                // console.log(response)
                this.uid = response.data;
                if(response.data == "auth/network-request-failed") {
                  alert("Network Error");
                } else if(response.data == "auth/network-request-failed" || response.data == "Wrong Email or Password") {
                  alert("Wrong Email or Password");
                } else {
                  localStorage.setItem('uid', response.data);
                  // console.log(localStorage.getItem('uid'));
                  this.$router.push("/shorten");
                }
            });
        },
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