<template>
  <section class="app-main" style="; min-width: 100%">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
};
</script>
