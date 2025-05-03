<template>
  <div class="container">
    <div>
      <navBar class="d-none d-lg-block py-4" />
      <navMobile class="d-sm-block d-md-none py-5" />
    </div>
    <keep-alive include="home">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import navBar from "./components/Navbar";
import navMobile from "./components/navMobile";
export default {
  components: {
    navBar,
    navMobile,
  },
};
</script>
<style  src="./css/main.css"></style>
