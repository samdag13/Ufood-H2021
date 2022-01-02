<template>
  <div class="user-visits">
    <table class="table is-bordered is-hoverable" id="visits-table">
      <tbody>
        <tr>
          <td>{{ restaurant.name }}</td>
          <td>{{ totalVisits }}</td>
          <td id="specific-visits">
            <router-link to="/" v-if="numberVisits === 0"
              >Retour à la page d'accueil</router-link
            >
            <visit-link
              class="visits"
              v-for="visit in userVisits"
              v-bind:key="visit.id"
              v-bind:visit="visit"
              @openModal="openModal"
            >
            </visit-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as api from "../../../repo/api";
import VisitLink from "./VisitLink.vue";

export default {
  name: "user-visits",

  components: {
    VisitLink
  },

  props: ["id", "restaurant"],

  data() {
    return {
      userVisits: [],
      numberVisits: 0
    };
  },

  computed: {
    totalVisits() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.numberVisits = this.userVisits.length;
      if (this.numberVisits === 0) {
        return "Aucun visite";
      } else {
        return this.numberVisits;
      }
    }
  },

  methods: {
    openModal(value1, value2) {
      this.$emit("openModal", value1, value2);
    }
  },

  watch: {
    $route() {
      api
        .getUserVisitsForResto(`${this.id}`, this.restaurant.id)
        .then(response => {
          this.userVisits = response.items;
        });
    }
  },

  beforeMount() {
    api
      .getUserVisitsForResto(`${this.id}`, this.restaurant.id)
      .then(response => {
        this.userVisits = response.items;
      });
  }
};
</script>

<style scoped>
table {
  table-layout: fixed;
  width: 100%;
  text-align: center;
}

td {
  padding: 20px;
}

.visits {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.visits:hover {
  color: hsl(171, 100%, 41%);
}

</style>
