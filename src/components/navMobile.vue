<template>
  <div>
    <b-navbar
      class="bgnav bordanav"
      fixed="top"
      toggleable="lg"
      type="light"
      variant="info"
    >
      <b-navbar-brand class="titulo" href="#"
        ><h6 class="fontTitulo">
          ARCHIVE CHAT LOGS
          <v-icon name="file-archive" scale="2" class="ml-1" /></h6
      ></b-navbar-brand>
      <b-navbar-nav class="d-flex flex-row justify-content-center link">
        <router-link class="link" exact-active-class="active" to="/"
          >Home</router-link
        >
        <router-link class="link" exact-active-class="active" to="/about"
          >About</router-link
        >
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
[data-theme="light"] .bordanav {
  border-bottom: 2px solid #6441a4 !important;
  border-width: 80% !important;
}
[data-theme="dark"] .bordanav {
  border-bottom: 2px solid #6ba65e !important;
  border-width: 80% !important;
}
[data-theme="light"] .bgnav {
  background-color: #f4f9fe !important;
}
[data-theme="dark"] .bgnav {
  background-color: #2d3238 !important;
}
[data-theme="light"] .titulo {
  font-family: "Bangers", cursive !important;
  font-size: 20px !important;
  color: #6441a4 !important;
  font-weight: bold;
  text-shadow: 0px 0px 0 rgb(58, 23, 122), 1px 1px 0 rgb(15, -20, 79),
    2px 2px 0 rgb(-27, -62, 37), 3px 3px 0 rgb(-70, -105, -6),
    4px 4px 0 rgb(-112, -147, -48), 5px 5px 0 rgb(-155, -190, -91),
    6px 6px 0 rgb(-197, -232, -133), 7px 7px 6px rgba(239, 239, 241, 0.42),
    7px 7px 1px rgba(239, 239, 241, 0.5), 0px 0px 6px rgba(239, 239, 241, 0.2);
}
[data-theme="dark"] .titulo {
  font-family: "Bangers", cursive !important;
  font-size: 20px !important;
  color: #6ba65e !important;
  font-weight: bold;
  text-shadow: 0px 0px 0 rgb(82, 141, 69), 1px 1px 0 rgb(56, 115, 43),
    2px 2px 0 rgb(30, 89, 17), 3px 3px 0 rgb(5, 64, 0),
    4px 4px 0 rgb(-20, 39, 0), 5px 5px 0 rgb(-46, 13, 0),
    6px 6px 0 rgb(-71, -12, 0), 7px 7px 0 rgb(-97, -38, 0),
    8px 8px 0 rgb(-122, -63, 0), 9px 9px 0 rgb(-148, -89, 0),
    10px 10px 0 rgb(-173, -114, 0), 11px 11px 10px rgba(0, 0, 0, 0.43),
    11px 11px 1px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.fontTitulo {
  font-size: 1.2em !important;
  font-weight: bold !important;
}
.link {
  font-family: "Bangers", cursive !important;

  padding: 5px !important;
}
[data-theme="light"] a {
  color: black !important;
  text-decoration: none;
}
[data-theme="dark"] a {
  color: white !important;
  text-decoration: none;
}
[data-theme="dark"] a:hover {
  color: gray !important;
  text-decoration: none;
}
[data-theme="light"] a:hover {
  color: gray !important;
  text-decoration: none;
}
</style>