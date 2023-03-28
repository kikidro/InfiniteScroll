<template>
  <InfiniteScroll v-for="i in items" :source="i" :key="i.id" />
  <template>
    <p>...Loading</p>
  </template>
</template>

<script>
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import axios from "axios";
// import { ref, onMounted, onUnmounted } from 'vue'
// import request from "./api/post";

export default {
  name: "App",
  // setup() {
  // ...
  //     const pagenum = 1
  //     const items = []
  //     const loading = false
  //     const posts = ref(getPosts(10))
  //     const loadMorePosts = () => {
  //   let newPosts = getPosts(10)
  //   console.log(newPosts)
  //   posts.value.push(...newPosts)
  //   const { data } = axios.get(
  //           `https://jsonplaceholder.typicode.com/albums/${pagenum}/photos`
  //         );
  //         items = items.concat(data);
  //  }
  //     const scrollComponent = ref(null)
  //     onMounted(() => {
  //       loadMorePosts()
  //       window.addEventListener("scroll", handleScroll);
  //     });
  //     onUnmounted(() => {
  //       window.removeEventListener("scroll", handleScroll);
  //     });
  //     const handleScroll = (e) => {
  //       console.log(e)
  //       console.log(scrollComponent.value)
  //       // if(!ref.current) return
  //       if (window.scrollY + window.screen.height >= document.body.scrollHeight) {
  //         // this.loadMore();
  //         loadMorePosts()
  //         this.page++
  //           // this.fetchMore()
  //       }
  // let element = scrollComponent.value
  // if (element.getBoundingClientRect().bottom < window.innerHeight) {
  //   loadMorePosts()
  // }

  //  return {
  //    items,
  //   posts,
  //   scrollComponent
  //  }
  // }
  // },
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
        
        // const visible = Math.floor(document.documentElement.clientHeight);
        // const pageHeight = Math.floor(document.documentElement.scrollHeight);
        const { scrollY } = window;
        // console.log("currentPage before", this.page);
        if (scrollY + window.screen.height >= document.body.scrollHeight && this.loading === false) {
          // this.loading = true;
          // this.page += 1;
          this.skip += 6;
          await this.fetchMore();
          // this.items = [...this.items, ...res.items];
          // this.loading = false;
          // console.log("currentPage after", this.page);
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
