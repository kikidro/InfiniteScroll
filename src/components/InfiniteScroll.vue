<template>
  <div class="scroll-view">
    <p>{{ source.username }}</p>
    <p>{{ source.university }}</p>
    <a v-bind:href="source.image">{{ source.image }}</a>
  </div>
</template>

<script>
export default {
  props: ['source'],
};
</script>

<style scope>
.scroll-view {
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  height: 150px;
  border-style: solid;
  border-color: darkgray;
  border-width: 2px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>
