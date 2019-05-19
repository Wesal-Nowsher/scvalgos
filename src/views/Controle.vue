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
               },
               min2:function(val1, val2, index1, index2){
                 if(parseFloat(val1["Cotes Première"].replace(",",".")) <= parseFloat(val2["Cotes Première"].replace(",","."))){
                                     return index1;
                                 }
                              else if(parseFloat(val2["Cotes Première"].replace(",",".")) <= parseFloat(val1["Cotes Première"].replace(",","."))){
                                     return index2;
                                 }
               }

           },
    computed: {
    data() {
        var onentwo=[];
        var handicap=[];
        var faceaface=[];
        var handicapfaceaface=[];

        var plusmoins=[];
         this.$store.state.data.map((item, index)=>{

                if(item["Pari"].includes("1 N 2")  && !item["Pari"].includes("Handicap")){
                    item["inlist"]=true;
                    item["index"]=index;
                    item["group"]="1n2";
                    item["blue"]="none";
                    item["fav"]=false;
                    onentwo.push(item);
                }
                 else if(item["Pari"].includes("1 N 2") && item["Pari"].includes("Handicap")){
                             item["group"]="handicap";
                             item["inlist"]=true;
                             item["index"]=index;
                            item["blue"]="none";
                            item["fav"]=false;
                            handicap.push(item)
                }
                 else if(item["Pari"].includes("Face à Face") && !item["Pari"].includes("Handicap") ){
                                             item["group"]="handicap";
                                             item["inlist"]=true;
                                             item["index"]=index;
                                            item["blue"]="none";
                                            item["fav"]=false;
                                            faceaface.push(item)
                                }
                                                 else if(item["Pari"].includes("Face à Face") && item["Pari"].includes("Handicap") ){
                                             item["group"]="handicap";
                                             item["inlist"]=true;
                                             item["index"]=index;
                                            item["blue"]="none";
                                            item["fav"]=false;
                                            handicapfaceaface.push(item)
                                }
                 else if(item["Pari"].includes("Plus/moins")){
                                            item["group"]="handicap";
                                            item["inlist"]=true;
                                            item["index"]=index;
                                            item["blue"]="none";
                                            item["fav"]=false;
                                            plusmoins.push(item)
                                }
                else{
                    item["inlist"]=false;
                    item["index"]=index;
                    item["group"]="none";
                    item["blue"]="none";
                    item["fav"]=false;
                }
                })

                            //onentwo
                           var ioneindex =0;
                            var winner="";
                            var aswholewinner="";
                           while(ioneindex <= onentwo.length-4){


                           var minimum = this.min(onentwo[ioneindex],
                           onentwo[ioneindex+1],onentwo[ioneindex+2],ioneindex,ioneindex+1,ioneindex+2);


                           if(ioneindex <3){
                           aswholewinner=onentwo[minimum]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                           onentwo[minimum]["blue"]="green";
                           }

                           winner=onentwo[minimum]["Paris/Pronostics"];
                           if(ioneindex >=3){
                                if(onentwo[ioneindex]["Evénement"] !== onentwo[ioneindex-1]["Evénement"]){
                                   var newwinner= this.min(onentwo[ioneindex],
                                   onentwo[ioneindex+1],onentwo[ioneindex+2],ioneindex,ioneindex+1,ioneindex+2);
                                   onentwo[newwinner]["blue"]="green";
                                   aswholewinner= onentwo[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");

                                }
                                else{
                                    if(!aswholewinner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                                                    winner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                    )
    ){
                                        onentwo[minimum]["blue"]= "red";
                                    }
                                }
                           }

                           ioneindex =ioneindex +3;
                           }


                          var selfi= this;
                            onentwo.map((item)=>{
                                     selfi.$store.state.data[item["index"]]= item;
                             })
                         //onentwo
                         //faceaface
                         var ioneindexface =0;
                                                     var winnerface="";
                                                     var aswholewinnerface="";
                                                    while(ioneindexface <= faceaface.length-3){
                                                    var minimum = this.min2(faceaface[ioneindexface],
                                                    faceaface[ioneindexface+1],ioneindexface,ioneindexface+1);
                                                    if(ioneindexface <2){
                                                    aswholewinnerface=faceaface[minimum]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");
                                                    faceaface[minimum]["blue"]="green";
                                                    }

                                                    winnerface=faceaface[minimum]["Paris/Pronostics"];
                                                    if(ioneindexface >=2){
                                                         if(faceaface[ioneindexface]["Evénement"] !== faceaface[ioneindexface-1]["Evénement"]){
                                                            var newwinner= this.min2(faceaface[ioneindexface],
                                                            faceaface[ioneindexface+1],ioneindexface,ioneindexface+1);
                                                            faceaface[newwinner]["blue"]="green";
                                                            aswholewinnerface= faceaface[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");

                                                         }
                                                         else{
                                                             if(!aswholewinnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                                                                             winnerface.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                                             )
                             ){
                                                                 faceaface[minimum]["blue"]= "red";
                                                             }
                                                         }
                                                    }

                                                    ioneindexface =ioneindexface +2;
                                                    }


                                                   var selfi= this;
                                                     faceaface.map((item)=>{
                                                              selfi.$store.state.data[item["index"]]= item;
                                                      })
                         //faceaface
                //handicaps in 1 n2
                        var index=0;
                          var valuetocheck=0;
                        while(index  <= handicap.length -4){


                        if(index<3){
                             valuetocheck=   handicap[index]["Cotes Première"].replace(",",".");
                        }
                        if(index >=3){
                                if(handicap[index]["Evénement"] !== handicap[index-1]["Evénement"] ){
                                    valuetocheck =handicap[index]["Cotes Première"].replace(",",".");
                                }
                                else{
                                if(parseFloat(valuetocheck) < parseFloat(handicap[index]["Cotes Première"].replace(",","."))){
                                   handicap[index]["blue"]= "red";

                                   }

                                      valuetocheck=   handicap[index]["Cotes Première"].replace(",",".");
                                }
                        }
                            index=index+3;
                        }
                       var indexi=0;
                         var valuetochecki=0;
                           while(indexi  <= handicap.length -4){


                                              if(indexi<3){
                                                   valuetochecki=handicap[indexi+2]["Cotes Première"].replace(",",".");

                                              }
                                              if(indexi >=3){
                                                      if(handicap[indexi]["Evénement"] !== handicap[indexi-1]["Evénement"] ){
                                                          valuetochecki =handicap[indexi+2]["Cotes Première"].replace(",",".");

                                                      }
                                                      else{
                                                      if(parseFloat(valuetochecki) > parseFloat(handicap[indexi+2]["Cotes Première"].replace(",","."))){

                                                         handicap[indexi+2]["blue"]= "red";
                                                         }

                                                           valuetochecki=handicap[indexi+2]["Cotes Première"].replace(",",".");
                                                      }
                                              }
                                                  indexi=indexi+3;
                                              }
                       var self=this;
                    handicap.map((item)=>{
                                if(item["blue"] === "red"){

                                }
                                else{

                                }
                                   self.$store.state.data[item["index"]]= item;
                    })
                    //handicap
                    //handicapfaceaface
                      var indexhandface=0;
                                              var valuetocheckhandface=0;
                                            while(indexhandface  <= handicapfaceaface.length -4){


                                            if(indexhandface<2){
                                                 valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Première"].replace(",",".");
                                            }
                                            if(indexhandface >=2){
                                                    if(handicapfaceaface[indexhandface]["Evénement"] !== handicapfaceaface[indexhandface-1]["Evénement"] ){
                                                        valuetocheckhandface =handicapfaceaface[indexhandface]["Cotes Première"].replace(",",".");
                                                    }
                                                    else{
                                                    if(parseFloat(valuetocheckhandface) < parseFloat(handicapfaceaface[indexhandface]["Cotes Première"].replace(",","."))){
                                                       handicapfaceaface[indexhandface]["blue"]= "red";

                                                       }

                                                          valuetocheckhandface=   handicapfaceaface[indexhandface]["Cotes Première"].replace(",",".");
                                                    }
                                            }
                                                indexhandface=indexhandface+2;
                                            }
                                           var indexihandface=0;
                                             var valuetocheckihandface=0;
                                               while(indexihandface  <= handicapfaceaface.length -3){


                                                                  if(indexihandface<2){
                                                                       valuetocheckihandface=handicapfaceaface[indexihandface+2]["Cotes Première"].replace(",",".");

                                                                  }
                                                                  if(indexihandface >=2){
                                                                          if(handicapfaceaface[indexihandface]["Evénement"] !== handicapfaceaface[indexihandface-1]["Evénement"] ){
                                                                              valuetocheckihandface =handicapfaceaface[indexi+1]["Cotes Première"].replace(",",".");

                                                                          }
                                                                          else{
                                                                          if(parseFloat(valuetocheckihandface) > parseFloat(handicapfaceaface[indexihandface+2]["Cotes Première"].replace(",","."))){

                                                                             handicapfaceaface[indexihandface+1]["blue"]= "red";
                                                                             }

                                                                               valuetocheckihandface=handicapfaceaface[indexihandface+1]["Cotes Première"].replace(",",".");
                                                                          }
                                                                  }
                                                                      indexihandface=indexihandface+2;
                                                                  }
                                                    var self=this;
                                                    handicapfaceaface.map((item)=>{
                                                    if(item["blue"] === "red"){

                                                    }
                                                    else{

                                                    }
                                                       self.$store.state.data[item["index"]]= item;
                                        })
                                 //handicapfaceaface
                                //plusmoins
                                var indexplus=0;
                                              var valuetocheckplus=0;
                                            while(indexplus  <= plusmoins.length -3){


                                            if(indexplus <3){
                                                 valuetocheckplus=   plusmoins[indexplus]["Cotes Première"].replace(",",".");
                                            }
                                            if(indexplus >=3){
                                                    if(plusmoins[indexplus]["Evénement"] !== plusmoins[indexplus-1]["Evénement"] ){
                                                        valuetocheckplus =plusmoins[indexplus]["Cotes Première"].replace(",",".");
                                                    }
                                                    else{
                                                    if(parseFloat(valuetocheckplus) < parseFloat(plusmoins[indexplus]["Cotes Première"].replace(",","."))){
                                                       plusmoins[indexplus]["blue"]= "red";

                                                       }

                                                          valuetocheckplus=   plusmoins[indexplus]["Cotes Première"].replace(",",".");
                                                    }
                                            }
                                                indexplus=indexplus+2;
                                            }
                                           var indexiplus=0;
                                             var valuetocheckiplus=0;
                                               while(indexiplus  <= plusmoins.length -3){


                                                                  if(indexiplus<3){
                                                                       valuetocheckiplus = plusmoins[indexiplus+1]["Cotes Première"].replace(",",".");

                                                                  }
                                                                  if(indexiplus >=3){
                                                                          if(plusmoins[indexiplus]["Evénement"] !== plusmoins[indexiplus-1]["Evénement"] ){
                                                                              valuetocheckiplus =plusmoins[indexiplus+1]["Cotes Première"].replace(",",".");

                                                                          }
                                                                          else{
                                                                          if(parseFloat(valuetocheckiplus) > parseFloat(plusmoins[indexiplus+2]["Cotes Première"].replace(",","."))){

                                                                             plusmoins[indexiplus+2]["blue"]= "red";
                                                                             }

                                                                               valuetocheckiplus = plusmoins[indexiplus+2]["Cotes Première"].replace(",",".");
                                                                          }
                                                                  }
                                                                      indexiplus=indexiplus+2;
                                                                  }
                                           var self=this;
                                        plusmoins.map((item)=>{
                                                    if(item["blue"] === "red"){

                                                    }
                                                    else{

                                                    }
                                                       self.$store.state.data[item["index"]]= item;
                                        })
                    //plusmoins

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

