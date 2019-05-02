<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <v-app id="inspire">
      <div v-if="data">
        <v-card-title>
          Contrôles
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :search="search" :headers="headers" :items="data" class="elevation-1">
          <template v-slot:items="props">
            <td   v-for="(item, key) in headers" :key="key"><p v-bind:class='props.item["blue"]'>{{props.index}} {{ props.item[item.value] }}</p></td>
          </template>
        </v-data-table>
      </div>
      <div v-else>
        data not found go to
        <router-link to="/importation">importation</router-link>and import for see data
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  created: function(){

       },
   methods:{
           min: function(val1, val2, val3, index1, index2, index3){
              if(parseFloat(val1["Cotes Première"].replace(",",".")) <= parseFloat(val2["Cotes Première"].replace(",","."))
               && parseFloat(val1["Cotes Première"].replace(",",".")) <= parseFloat(val3["Cotes Première"].replace(",","."))){
                    return index1;
                }
             else if(parseFloat(val2["Cotes Première"].replace(",",".")) <= parseFloat(val1["Cotes Première"].replace(",","."))
             && parseFloat(val2["Cotes Première"].replace(",",".")) <= parseFloat(val3["Cotes Première"].replace(",","."))){
                    return index2;
                }
              else if( parseFloat(val3["Cotes Première"].replace(",",".")) <= parseFloat(val1["Cotes Première"].replace(",","."))
               && parseFloat(val3["Cotes Première"].replace(",",".")) <= parseFloat(val2["Cotes Première"].replace(",","."))){
                    return index3;
                }
               }
           },
    computed: {
    data() {

      return this.$store.state.data;
    },

    headers() {

      return Object.keys(this.data[0])
        .slice(0, 11)
        .map(k => ({
          text: k,
          value: k,
          width: "1%",
        }));
    },
  }
};
</script>

<style scoped>
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), 
table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), 
table.v-table thead td:first-child, table.v-table thead td:not(:first-child), 
table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 10px !important;
  width: 1%
}
.red{
    color:red;
    background:white;
    background-color: white!important;
        border-color: white!important;
}
.green{
    color:green;
   background:white;
   background-color: white!important;
       border-color: white!important;
}
.none{
    color:black;
background-color: white!important;
    border-color: white!important;
}
</style>

