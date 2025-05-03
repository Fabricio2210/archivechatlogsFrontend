<template>
  <div class="main">
    <b-col md="6" offset-md="5" class="pt-4">
      <DarkMode class="animated fadeIn" />
    </b-col>
    <b-col>
      <FormSearch
        class="animated fadeIn"
        @info-video="passData"
        v-if="ifNoData"
      />
    </b-col>
    <b-col class="pt-2">
      <TableContent
        v-if="ifData"
        :info.sync="info"
        :page="page"
        :limit="limit"
        :formUserName="formUserName"
        :formMessage="formMessage"
        :formHour="formHour"
        :dateFrom="dateFrom"
        :dateEnd="dateEnd"
        :totalPages="totalPages"
        :totalResults="totalResults"
        :subject="subject"
        :queryUsername="queryUsername"
        :queryMessage="queryMessage"
      />
    </b-col>
  </div>
</template>

<script>
// @ is an alias to /src
import FormSearch from "@/components/FormSearch.vue";
import TableContent from "@/components/TableContent.vue";
import DarkMode from "@/components/DarkMode.vue";

export default {
  name: "home",
  components: {
    FormSearch,
    TableContent,
    DarkMode,
  },
  data() {
    return {
      ifData: false,
      ifNoData: true,
      info: null,
      page: null,
      limit: null,
      formUserName: null,
      formMessage: null,
      formHour: null,
      dateFrom: null,
      dateEnd: null,
      totalPages: null,
      totalResults: null,
      subject: null,
      queryUsername: null,
      queryMessage: null,
    };
  },
  methods: {
    passData(...data) {
      this.info = data[0];
      this.page = data[1];
      this.limit = data[2];
      this.formUserName = data[3];
      this.formMessage = data[4];
      (this.formHour = data[5]), (this.dateFrom = data[6]);
      this.dateEnd = data[7];
      (this.totalPages = data[8]), (this.totalResults = data[9]);
      this.ifNoData = false;
      (this.subject = data[10]),
        (this.queryUsername = data[11]),
        (this.queryMessage = data[12]),
        (this.ifData = true);
    },
  },
  mounted() {
    if (localStorage.theme === "light") {
      document.body.style.backgroundColor = "#f4f9fe";
    }
    if (localStorage.theme === "dark") {
      document.body.style.backgroundColor = "#2D3238";
    }
  },
};
</script>