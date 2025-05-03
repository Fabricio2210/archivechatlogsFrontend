<template>
  <div>
    <b-row>
      <b-col class="paddingForm">
        <b-form-checkbox
          @change="toogleTabs"
          v-model="toogleLight"
          name="check-button"
          switch
          size="lg"
        >
          Theme: <b>{{ viewMessage }}</b>
        </b-form-checkbox>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewMessage: "light",
      toogleLight: true,
      themes: ["light", "dark"],
    };
  },
  methods: {
    toogleTabs() {
      if (this.toogleLight) {
        this.viewMessage = this.themes[0];
        this.$Themes.select(this.themes[0]);
        document.body.style.backgroundColor = "#f4f9fe";
      } else {
        this.viewMessage = this.themes[1];
        this.$Themes.select(this.themes[1]);
        document.body.style.backgroundColor = "#2D3238";
      }
    },
  },
  mounted() {
    document.body.style.backgroundColor = "#f4f9fe";
    if (localStorage.theme === "light") {
      this.viewMessage = "light";
      this.toogleLight = true;
    }
    if (localStorage.theme === "dark") {
      this.viewMessage = "dark";
      this.toogleLight = false;
    }
    this.themes = this.$Themes.names;
  },
};
</script>