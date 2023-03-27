<template>
  <InfiniteScroll v-for="i in items" :source="i" :key="i.id" />
  <template>
    <p>...Loading</p>
  </template>
</template>

<script>
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    InfiniteScroll: InfiniteScroll
  },
  data() {
    return {
      page: 1,
      items: [],
      skip: 0,
      loading: false,
      windowWidth: 0,
      windowHeight: 0
    };
  },
  methods: {
    async scrollYTrigger() {
      try {
        const { scrollY } = window;
        if (scrollY + window.screen.height >= document.body.scrollHeight && this.loading === false) {
          this.skip += 6;
          await this.fetchMore();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchMore() {
      try {
        this.loading = true;
        const res = await axios.get(
          `https://dummyjson.com/users?limit=6&skip=${this.skip}`
        );
        this.items = this.items.concat(res.data.users);
        this.loading = false;
        return true;
      } catch (err) {
        console.log(err);
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollYTrigger);
  },
  async mounted() {
    try {
      window.addEventListener("scroll", this.scrollYTrigger);
      await this.fetchMore();
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
.loading {
  text-align: center;
}
</style>
