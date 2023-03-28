<template>
  <InfiniteScroll v-for="i in items" :source="i" :key="i.id" />
</template>

<script>
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import axios from 'axios';
import infiniteScroll from './components/InfiniteScroll.vue';

export default {
  name: 'App',
  components: {
    InfiniteScroll: infiniteScroll,
  },
  setup() {
    const skip = ref(0);
    const items = ref([]);
    const loading = ref(false);
    const fetchData = () => {
      loading.value = true;
      axios
        .get(`https://dummyjson.com/users?limit=6&skip=${skip.value}`).then((res) => {
          items.value = items.value.concat(res.data.users);
          loading.value = false;
        });
    };
    const scrollYTrigger = () => {
      // console.log(e);
      try {
        const { scrollY } = window;
        if (
          scrollY + window.screen.height >= document.body.scrollHeight
          && loading.value === false
        ) {
          skip.value += 6;
          fetchData();
        }
      } catch (err) {
        console.log(err);
      }
    };

    onBeforeMount(() => {
      fetchData();
    });

    onMounted(() => {
      window.addEventListener('scroll', scrollYTrigger);
    });

    // 等同於 Vue2 的 destroyed
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollYTrigger);
    });

    return {
      items,
      loading,
      skip,
      fetchData,
    };
  },
};
</script>

<style>
.loading {
  text-align: center;
}
</style>
