<template>
  <div class="animated fadeIn">
    <div v-if="info !== null">
      <Loading v-if="isLoading" />
      <div v-if="!isLoading">
        <div id="up" class="row py-5">
          <div class="col-md-12 d-none d-lg-block">
            <h5 class="text-center">
              Found {{ totalResults }} results divided into
              {{ totalPages }} pages.
            </h5>
          </div>
          <div class="col-sm-12 pt-5 d-sm-block d-md-none">
            <p class="text-center paraInfo">
              {{ totalResults }} results in {{ totalPages }} pages.
            </p>
          </div>
          <div v-if="isOnePage">
            <div class="col-md-12 offset-md-6 d-none d-lg-block pl-5">
              <span class="text-center navButton pl-4">
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="firstPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-left"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="previousPage"
                >
                  <v-icon class="textMenuButtons" name="angle-left" scale="2" />
                </button>
                <span class="slide-font"
                  >Page {{ currentPageServer + 1 }}
                </span>
                <button
                  class="btn buttonSearch"
                  :disabled="isNextDisable"
                  @click="nextPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-right"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  @click="lastPage"
                  :disabled="isNextDisable"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-right"
                    scale="2"
                  />
                </button>
              </span>
              <span class="navButton"
                ><input
                  @focus="checkInInput"
                  @blur="checkOutInput"
                  type="number"
                  @change="noNegativeNumber"
                  name="pin"
                  maxlength="3"
                  size="3"
                  v-model="selectedPageServer"
                  class="inputNumber" />
                <button :disabled="isInputEmpty" @click="goToPageServer">
                  <v-icon
                    class="textMenuButtons"
                    :class="{ searchIconDisabled: isInputEmpty }"
                    name="search"
                    scale="1"
                  /></button
              ></span>
            </div>
            <div class="col-sm-12 pb-2 d-sm-block d-md-none">
              <div class="text-center navButtonsm">
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="firstPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-left"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="previousPage"
                >
                  <v-icon class="textMenuButtons" name="angle-left" scale="2" />
                </button>
                <span class="paraInfo">Page {{ currentPageServer + 1 }}</span>
                <button
                  class="btn buttonSearch"
                  :disabled="isNextDisable"
                  @click="nextPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-right"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  @click="lastPage"
                  :disabled="isNextDisable"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-right"
                    scale="2"
                  />
                </button>
                <span class="navButtonsm pl-4"
                  ><input
                    @focus="checkInInput"
                    @blur="checkOutInput"
                    type="number"
                    @change="noNegativeNumber"
                    class="inputSearch inputSearchSm"
                    name="pin"
                    maxlength="3"
                    size="3"
                    v-model="selectedPageServer" />
                  <button :disabled="isInputEmpty" @click="goToPageServer">
                    <v-icon
                      class="textMenuButtons"
                      :class="{ searchIconDisabled: isInputEmpty }"
                      name="search"
                      scale="1"
                    /></button
                ></span>
              </div>
            </div>
          </div>
          <b-button @click="reset" class="resetButton" block variant="primary"
            >New Search</b-button
          >
          <b-form-checkbox
            @change="toogleTabs"
            v-model="toogleTable"
            name="check-button"
            switch
            size="lg"
          >
            Switch View: <b>{{ viewMessage }}</b>
          </b-form-checkbox>
        </div>
        <div class="row">
          <div class="animated fadeIn table-responsive" v-if="toogleTable">
            <table class="table-bordered" style="width: 1080px !important">
              <thead>
                <tr class="">
                  <th class="px-5 text-center" scope="col">User</th>
                  <th class="px-5" scope="col">Day</th>
                  <th class="px-5" scope="col">Timestamp</th>
                  <th class="px-5 text-center" scope="col">Message</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in info" v-bind:key="data.id">
                  <td class="text-center">{{ data.userName }}</td>
                  <td class="text-center">
                    {{ data.logDay | moment("MM/DD/YYYY") }}
                  </td>
                  <td class="text-center">@{{ data.hour }}</td>
                  <td class="text-center">{{ data.text }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="col-md-4 d-none d-lg-block"
            v-for="data in info"
            v-bind:key="data.id"
          >
            <div v-if="!toogleTable" class="animated fadeIn">
              <br />
              <div
                class="py-2 bordaFormlg px-3 text-left"
                style="padding-top: 40px !important"
              >
                <p><span class="tableTitle">User:</span> {{ data.userName }}</p>
                <p>
                  <span class="tableTitle">Day :</span>
                  {{ data.logDay | moment("MM/DD/YYYY") }}
                </p>
                <p>
                  <span class="tableTitle">Timestamp:</span> {{ data.hour }}
                </p>
                <p><span class="tableTitle">Message:</span> {{ data.text }}</p>
              </div>
            </div>
          </div>
          <div
            class="col-md-6 d-sm-block d-md-none animated fadeIn"
            v-for="data in info"
            v-bind:key="data.id"
          >
            <div v-if="!toogleTable" class="animated fadeIn">
              <div
                class="py-2 bordaFormsm m-3 px-3"
                style="padding-top: 20px !important"
              >
                <p class="titleCardSm">
                  <span class="spanCard">User:</span> {{ data.userName }}
                </p>
                <p class="titleCardSm">
                  <span class="spanCard">Day :</span>
                  {{ data.logDay | moment("MM/DD/YYYY") }}
                </p>
                <p class="titleCardSm">
                  <span class="spanCard">Timestamp:</span> {{ data.hour }}
                </p>
                <p class="titleCardSm">
                  <span class="spanCard">Message:</span> {{ data.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="down" class="row py-4">
          <div class="col-md-12 d-none d-lg-block">
            <h5 class="text-center">
              Found {{ totalResults }} results divided into
              {{ totalPages }} pages.
            </h5>
          </div>
          <div class="col-sm-12 d-sm-block d-md-none">
            <p class="text-center paraInfo">
              {{ totalResults }} results in {{ totalPages }} pages.
            </p>
          </div>
          <div v-if="isOnePage">
            <div class="col-md-12 offset-md-6 d-none d-lg-block pl-5">
              <span class="text-center navButton pl-4">
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="firstPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-left"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="previousPage"
                >
                  <v-icon class="textMenuButtons" name="angle-left" scale="2" />
                </button>
                <span class="slide-font"
                  >Page {{ currentPageServer + 1 }}
                </span>
                <button
                  class="btn buttonSearch"
                  :disabled="isNextDisable"
                  @click="nextPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-right"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  @click="lastPage"
                  :disabled="isNextDisable"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-right"
                    scale="2"
                  />
                </button>
              </span>
              <span class="navButton"
                ><input
                  @focus="checkInInput"
                  @blur="checkOutInput"
                  type="number"
                  @change="noNegativeNumber"
                  name="pin"
                  maxlength="3"
                  size="3"
                  v-model="selectedPageServer"
                  class="inputNumber" />
                <button :disabled="isInputEmpty" @click="goToPageServer">
                  <v-icon
                    class="textMenuButtons"
                    :class="{ searchIconDisabled: isInputEmpty }"
                    name="search"
                    scale="1"
                  /></button
              ></span>
            </div>
            <div class="col-sm-12 pb-2 d-sm-block d-md-none">
              <div class="text-center navButtonsm">
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="firstPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-left"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  :disabled="isPreviousDisable"
                  @click="previousPage"
                >
                  <v-icon class="textMenuButtons" name="angle-left" scale="2" />
                </button>
                <span class="paraInfo">Page {{ currentPageServer + 1 }}</span>
                <button
                  class="btn buttonSearch"
                  :disabled="isNextDisable"
                  @click="nextPage"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-right"
                    scale="2"
                  />
                </button>
                <button
                  class="btn buttonSearch"
                  @click="lastPage"
                  :disabled="isNextDisable"
                >
                  <v-icon
                    class="textMenuButtons"
                    name="angle-double-right"
                    scale="2"
                  />
                </button>
                <span class="navButtonsm pl-4"
                  ><input
                    @focus="checkInInput"
                    @blur="checkOutInput"
                    type="number"
                    @change="noNegativeNumber"
                    class="inputSearch inputSearchSm"
                    name="pin"
                    maxlength="3"
                    size="3"
                    v-model="selectedPageServer" />
                  <button :disabled="isInputEmpty" @click="goToPageServer">
                    <v-icon
                      class="textMenuButtons"
                      :class="{ searchIconDisabled: isInputEmpty }"
                      name="search"
                      scale="1"
                    /></button
                ></span>
              </div>
            </div>
          </div>
          <b-button @click="reset" class="resetButton" block variant="primary"
            >New Search</b-button
          >
        </div>
      </div>
    </div>
    <div v-else class="row py-4">
      <div class="col-md-11 py-5 textError">
        <h1 class="text-center d-none d-lg-block">Nothing Found</h1>
        <h4 class="text-center d-sm-block d-md-none">Nothing Found</h4>
        <b-button @click="reset" class="resetButton" block variant="primary"
          >New Search</b-button
        >
      </div>
    </div>
    <div v-if="showScrollButton" class="d-none d-lg-block">
      <a v-scroll-to="'#up'" class="btn bottomButtonTop"
        ><v-icon name="angle-up" scale="3"
      /></a>
      <a v-scroll-to="'#down'" class="btn bottomButtonBottom"
        ><v-icon name="angle-down" scale="3"
      /></a>
    </div>
    <div v-if="showScrollButton" class="d-sm-block d-md-none">
      <a v-scroll-to="'#up'" class="btn bottomButtonTopSm"
        ><v-icon name="angle-up" scale="2"
      /></a>
      <a v-scroll-to="'#down'" class="btn bottomButtonBottomSm"
        ><v-icon name="angle-down" scale="2"
      /></a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "./Loader";
export default {
  components: {
    Loading,
  },
  props: [
    "info",
    "page",
    "limit",
    "formUserName",
    "formMessage",
    "formHour",
    "dateFrom",
    "dateEnd",
    "totalPages",
    "totalResults",
    "subject",
    "queryUsername",
    "queryMessage",
  ],
  data() {
    return {
      isLoading: false,
      showScrollButton: true,
      nextPageServer: this.page + 1,
      previousPageServer: null,
      totalPagesServer: null,
      currentPageServer: 0,
      selectedPageServer: "",
      isNextDisable: false,
      isPreviousDisable: true,
      isOnePage: true,
      toogleTable: true,
      isInputEmpty: true,
      viewMessage: " ",
    };
  },
  methods: {
    async getData(page) {
      this.isLoading = true;
      this.showScrollButton = false;
      let data = await axios.post(
        `${this.subject}`,
        {
          userName: this.formUserName,
          message: this.formMessage,
          hour: this.formHour,
          dateFrom: this.dateFrom,
          dateEnd: this.dateEnd,
        },
        {
          params: {
            page,
            limit: this.limit,
            userName: this.queryUsername,
            message: this.queryMessage,
          },
        }
      );
      this.info = data.data.data;
      this.isLoading = false;
      this.showScrollButton = true;
      this.totalPagesServer = data.data.totalPages;
      return data;
    },

    async getPageData(page) {
      let data = await this.getData(page);
      this.previousPageServer = data.data.previousPage;
      this.nextPageServer = data.data.nextPage;
      this.selectedPageServer = "";
      this.isNextDisable = false;
      this.isPreviousDisable = false;
      if (page === 0) {
        this.isPreviousDisable = true;
        this.previousPageServer = 1;
      }
      if (page >= data.data.totalPages - 1) {
        this.nextPageServer = data.data.totalPages - 1;
        this.currentPageServer = this.nextPageServer;
        this.isNextDisable = true;
      } else {
        this.currentPageServer = page;
        this.nextPageServer = data.data.nextPage;
      }
      if (this.selectedPageServer !== "") {
        let selectedPage = parseInt(this.selectedPageServer) - 1;
        if (selectedPage >= data.data.totalPages - 1) {
          selectedPage = data.data.totalPages - 1;
          this.selectedPageServer = selectedPage + 1;
          this.nextPageServer = this.selectedPageServer;
          this.isNextDisable = true;
          this.isPreviousDisable = false;
        } else if (selectedPage <= 0) {
          selectedPage = 0;
          this.selectedPageServer = selectedPage + 1;
          this.previousPageServer = this.selectedPageServer;
          this.isNextDisable = false;
          this.isPreviousDisable = true;
        } else {
          this.isNextDisable = false;
          this.isPreviousDisable = false;
        }
        data = await this.getData(selectedPage);
        this.currentPageServer = selectedPage;
        this.previousPageServer = data.data.previousPage;
        this.nextPageServer = data.data.nextPage;
        this.selectedPageServer = "";
      }
      return data;
    },
    async nextPage() {
      await this.getPageData(this.nextPageServer);
    },
    async previousPage() {
      await this.getPageData(this.previousPageServer);
    },
    async firstPage() {
      await this.getPageData(0);
    },
    async lastPage() {
      await this.getPageData(this.totalPages - 1);
    },
    async goToPageServer() {
      await this.getPageData(this.selectedPageServer - 1);
    },
    reset() {
      window.location.reload();
    },

    noNegativeNumber() {
      if (this.selectedPageServer < 1) {
        this.selectedPageServer = 1;
      }
    },
    toogleTabs() {
      if (this.toogleTable) {
        this.viewMessage = "Table";
      } else {
        this.viewMessage = "Cards";
      }
    },
    checkInInput() {
      this.isInputEmpty = false;
    },
    checkOutInput() {
      if (this.selectedPageServer) {
        this.isInputEmpty = false;
      } else {
        this.isInputEmpty = true;
      }
    },
  },
  mounted() {
    console.log(this.info)
    if (this.info === null) {
      this.isOnePage = false;
    }
    this.viewMessage = "Table";
    this.isInputEmpty = true;
  },
};
</script>