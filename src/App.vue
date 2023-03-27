<template>
  <InfiniteScroll v-for="i in items" :source="i" :key="i.id" />
  <template>
    <p>...Loading</p>
  </template>
</template>

<script>
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import axios from "axios";
import {
  onBeforeMount,
  onMounted,
  // onBeforeUpdate,
  // onUpdated,
  onUnmounted,
  ref
} from "vue";
export default {
  name: "App",
  components: {
    InfiniteScroll: InfiniteScroll
  },
  setup() {
    let skip = ref(0);
    let items = ref([]);
    let loading = ref(false);
    const scrollYTrigger = () => {
      // console.log(e);
      try {
        const { scrollY } = window;
        if (
          scrollY + window.screen.height >= document.body.scrollHeight &&
          loading.value === false
        ) {
          skip.value += 6;
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData = () => {
      loading.value = true;
      axios
        .get(`https://dummyjson.com/users?limit=6&skip=${skip.value}`)
        .then(res => {
          console.log(res.data.users);
          items.value = items.value.concat(res.data.users);
          loading.value = false;
        });
    };
    onBeforeMount(() => {
      fetchData()
    });

    onMounted(() => {
      window.addEventListener("scroll", scrollYTrigger);
    });

    // 等同於 Vue2 的 destroyed
    onUnmounted(() => {
      window.removeEventListener("scroll", scrollYTrigger);
    });

    return {
      items,
      loading,
      skip,
      fetchData
    };
  },
};
</script>

<style>
.loading {
  text-align: center;
}
</style>
