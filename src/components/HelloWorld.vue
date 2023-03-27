<template>
  <ScrollView orientation="horizontal">
    <h1>{{msg}}</h1>
    <StackLayout orientation="horizontal">
      <Label text="this" />
      <Label text="text" />
      <Label text="scrolls" />
      <Label text="horizontally" />
      <Label text="if necessary" />
    </StackLayout>
  </ScrollView>
</template>

<script>
export default {
  name: "helloWorld",
  layout: "empty",
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css",
          integrity:
            "sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer"
        },
        {
          rel: "stylesheet",
          href:
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
        }
      ]
    };
  },
  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      windowWidth: 0,
      windowHeight: 0
    };
  },
  props: {
    msg: String
  },
  async mounted() {
    try {
      this.windowWidth = window.innerWidth;
      window.addEventListener("scroll", this.scrollYTrigger);
      const res = await this.getMockItems();
      console.log("res", res.items);
      this.list = [...res.items];
    } catch (err) {
      console.log(err);
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollYTrigger);
  },
  methods: {
    activateWidthTrigger() {
      this.windowWidth = window.innerWidth;
    },
    async scrollYTrigger() {
      try {
        const visible = Math.floor(document.documentElement.clientHeight);
        const pageHeight = Math.floor(document.documentElement.scrollHeight);
        const { scrollY } = window;
        console.log("currentPage before", this.page);
        if (
          scrollY + visible + 200 >= pageHeight &&
          this.loading === false &&
          this.page < 3 &&
          this.tabIndex === 1
        ) {
          this.loading = true;
          const res = await this.getMockItems();
          this.list = [...this.list, ...res.items];
          this.page += 1;
          this.loading = false;
          console.log("currentPage after", this.page);
        }
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line consistent-return
    async getMockItems() {
      try {
        this.loading = true;
        await new Promise(r => setTimeout(r, 1000));
        const mockCount = 10;
        const result = [];
        for (let i = 1; i <= mockCount; i += 1) {
          result.push({
            link: "",
            title: `Title${Math.floor(Math.random() * 1000000)}`,
            creatorName: "Author 2222",
            cover: `https://picsum.photos/500/400/?random=${i}`,
            likeNum: (mockCount - i) * 10
          });
        }

        this.loading = false;
        return {
          items: result
        };
      } catch (err) {
        this.loading = true;
        console.log(err);
      }
    }
  }
};
</script>
