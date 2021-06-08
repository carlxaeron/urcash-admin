(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{8293:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"bg-secondary"},[a("div",{staticClass:"q-pa-md"},[a("q-card",{staticClass:"my-card q-pa-md q-pb-xl"},[a("q-table",{attrs:{title:"Sales By City","title-class":"text-h6 text-bold",data:t.data,columns:t.columns,"row-key":"city","binary-state-sort":"","no-data-label":" No Data Available"},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("vue-json-to-csv",{attrs:{"json-data":t.data,labels:{city:{title:"City"},merchant_name:{title:"Merchant"},total_earnings:{title:"Earnings"}},"csv-title":"Report by City",separator:";"}},[a("q-btn",{attrs:{color:"primary","icon-right":"archive",label:"Export to csv","no-caps":""}})],1),a("q-select",{staticClass:"q-ml-md q-mr-md",staticStyle:{width:"250px"},attrs:{debounce:"400",dense:"",options:t.targetlist,label:"Select City"},on:{input:function(e){return t.getData()}},model:{value:t.target,callback:function(e){t.target=e},expression:"target"}}),a("q-input",{staticClass:"q-mr-md",attrs:{dense:"",debounce:"400",type:"date",max:t.date_to},on:{input:function(e){return t.getData()}},model:{value:t.date_from,callback:function(e){t.date_from=e},expression:"date_from"}}),t._v("\n         -\n        "),a("q-input",{staticClass:"q-ml-md",attrs:{dense:"",debounce:"400",type:"date",min:t.date_from},on:{input:function(e){return t.getData()}},model:{value:t.date_to,callback:function(e){t.date_to=e},expression:"date_to"}})]},proxy:!0},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"city",attrs:{props:e}},[t._v("\n            "+t._s(e.row.city)+"\n          ")]),a("q-td",{key:"merchant_name",attrs:{props:e}},[a("span",{},[t._v(" "+t._s(e.row.merchant_name))]),a("br")]),a("q-td",{key:"total_earnings",attrs:{props:e}},[a("div",{staticClass:"text-pre-wrap"},[t._v(t._s(e.row.total_earnings))])])],1)]}}])}),a("span",{staticClass:"text-bold text-h6 float-right"},[t._v("Total: "+t._s(t.total)+"  ")])],1)],1)])},n=[],o=a("055a"),r=a.n(o),l={name:"cityReport",components:{VueJsonToCsv:r.a},data(){return{targetlist:[],date_from:null,date_to:null,target:null,total:0,columns:[{name:"city",align:"left",label:"City",field:"city",sortable:!0},{name:"merchant_name",align:"left",label:"Merchant",field:"merchant_name",sortable:!0},{name:"total_earnings",align:"left",label:"Earnings",field:"total_earnings",sortable:!0}],data:[]}},methods:{getData(){null!==this.target&&null!==this.date_from&&null!==this.date_to&&this.$axios.post("sales/city",{city:this.target,from:this.date_from,to:this.date_to},{headers:{Authorization:"Bearer "+this.$q.sessionStorage.getItem("token"),"Content-Type":"application/json"}}).then(t=>{console.log(t.data),this.data=t.data.results.merchants,this.total=t.data.results.total_sales}).catch(t=>{t.response&&t.response.statusText&&alert(t.response.statusText),this.total=0,this.data=[],console.log(t.response),this.$q.notify({message:t.response.data.message,color:"negative",icon:"warning"})})},getCity(){this.$axios.get("addresses/city",{headers:{Authorization:"Bearer "+this.$q.sessionStorage.getItem("token"),"Content-Type":"application/json"}}).then(t=>{console.log(t.data),this.targetlist=t.data.results}).catch(t=>{t.response&&t.response.statusText&&alert(t.response.statusText),console.log(t.response)})}},created(){this.getCity()}},i=l,c=a("2877"),d=a("9989"),p=a("f09f"),u=a("eaac"),m=a("9c40"),g=a("ddd8"),h=a("27f9"),y=a("bd08"),_=a("db86"),b=a("eebe"),f=a.n(b),q=Object(c["a"])(i,s,n,!1,null,null,null);e["default"]=q.exports;f()(q,"components",{QPage:d["a"],QCard:p["a"],QTable:u["a"],QBtn:m["a"],QSelect:g["a"],QInput:h["a"],QTr:y["a"],QTd:_["a"]})}}]);