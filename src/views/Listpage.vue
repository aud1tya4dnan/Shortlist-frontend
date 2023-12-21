<template>
<div class="mt-20 mx-auto">
  <div class="edit" v-show="editbar">
    <input type="text" placeholder="new slink" v-model="newLink.newslink" class="border rounded p-2 m-3" />
    <input type="text" placeholder="new url" v-model="newLink.newflink" class="border rounded p-2 m-3" />
    <button type="submit" @click="editHandler(newLink.id)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-3 rounded">Submit Edit</button>
    <button type="submit" @click="editbar = false" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-3 rounded">Cancel</button>
  </div>

  <div class="table-auto">
    <table class="table table-hover table-borderless table-striped text-black">
      <thead>
        <tr>
          <th scope="col">Alias</th>
          <th scope="col">Link</th>
          <th scope="col">Count</th>
        </tr>
      </thead>
      <tbody v-for="link in links" :key="link">
        <tr v-if="link.uid == userID">
          <th><a target="_blank" :href="'https://www.awikwokshort.my.id/' + link.slink" class="text-blue-500 hover:text-blue-800">{{ link.slink }}</a></th>
          <td><a target="_blank" :href="link.flink" class="text-black-500 hover:text-blue-400 hover:font-bold flex">Open Link <img src="../assets/openimage.png" style="height: 20px; width: 20px;"/></a></td>
          <!-- <td class="truncate">{{ link.flink }}</td> --> <!-- Simpanan Lama -->
          <td><p class="ml-5">{{ link.uses }}</p></td>
          <td><button class="content bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" @click="editLink(link.id)">Edit</button></td>
          <td><button class="content bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4" @click="deleteLink(link.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import axios from "axios";
import API from ".env";

export default {
  data() {
    return {
      links: [],
      flink: "",
      slink: "",
      userID: "",
      newLink: [
        {
          id: "",
          newslink: "",
          newflink: "",
        },
      ],
      api: API,
      editbar: false,
    };
  },
  methods: {
    checkUid(){
      this.userID = localStorage.getItem("uid");
      if(this.userID == null || this.userID == "auth/internal-error"){
        alert("Please Login First")
        this.$router.push("/")
        // this.$router.reload();
      }
      else {
        this.$router.push("/list");
      }
    },
    async getLink() {
      this.userID = localStorage.getItem("uid");
      console.log(this.userID)
      const res = await axios
        .get(this.api + "link/")
        .then((response) => {
          this.links.push(...response.data);
          console.log(response.data)
        });
    },
    async postLink() {
      userID = localStorage.getItem("uid");
      const res = await axios
        .post( this.api + "link/", {
          flink: this.flink,
          slink: this.slink,
          uid: userID,
          uses: 0,
        })
        .then(() => {
          console.log('uid: ' + userID)
          console.log(response.data)
          location.reload();
        });
    },
    async deleteLink(id) {
      const res = await axios
        .delete(this.api + "link/" + id)
        .then(() => {
          // console.log(response.data)
          location.reload();
        });
    },
    async editHandler(id) {
      const res = await axios
        .patch( this.api + "link/" + id, {
          newflink: this.newLink.newflink,
          newslink: this.newLink.newslink,
        })
        .then((response) => {
          location.reload();
          console.log(response)
        });
    },
    editLink(id) {
      this.links.forEach((link) => {
        if (link.id == id) {
          this.newLink.id = link.id;
          this.newLink.newflink = link.flink;
          this.newLink.newslink = link.slink;
        }
      });
      this.editbar = true;
    },
  },
  mounted() {
    this.getLink();
    this.checkUid();
  },
};
</script>

