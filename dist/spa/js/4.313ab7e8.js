(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"3e7e":function(t,e,s){"use strict";var i=s("b0e9"),o=s.n(i);o.a},"69b7":function(t,e,s){t.exports=s.p+"img/login_logo.b0bc2640.png"},"74db":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-layout",{staticClass:"myfont ",attrs:{view:"lHh Lpr lFf"}},[i("q-page-container",{staticClass:"bg_image"},[i("q-page",{staticClass:"flex flex-center"},[i("div",{staticClass:"q-pa-md",staticStyle:{width:"100%","max-width":"500px"}},[i("div",{staticClass:"row flex flex-center"},[i("q-img",{staticClass:"align-center",staticStyle:{width:"30%"},attrs:{src:s("69b7"),alt:"AEX Mobile Logo"}})],1),i("h4",{staticClass:" text-center"},[t._v("G2GBox ADMINISTRATOR")]),i("div",{staticClass:"row"},[i("p",{staticClass:"float-left",staticStyle:{"font-size":"18px"}},[t._v("Mobile Number")])]),i("q-input",{ref:"mobile",staticClass:"q-mb-lg",attrs:{rounded:"",rules:[function(t){return!!t||"Required"}],outlined:"",dense:t.dense,"bg-color":"white",prefix:"+63",mask:"##########"},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}}),i("q-btn",{staticClass:"q-my-md",staticStyle:{width:"100%","font-size":"20px"},attrs:{rounded:"",disable:t.disable,color:"info",label:"LOGIN","text-color":"white"},on:{click:function(e){return t.dologin()}}})],1),i("q-dialog",{attrs:{persistent:""},model:{value:t.otp_dialog,callback:function(e){t.otp_dialog=e},expression:"otp_dialog"}},[i("q-card",{staticStyle:{"min-width":"350px"}},[i("q-card-section",[i("div",{staticClass:"text-h6"},[t._v("Enter Your One-time Password")])]),i("q-card-section",{staticClass:"q-pt-none"},[i("q-input",{attrs:{dense:"",autofocus:"",mask:"####"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.verify()}},model:{value:t.otp,callback:function(e){t.otp=e},expression:"otp"}})],1),i("q-card-actions",{staticClass:"text-primary",attrs:{align:"right"}},[i("q-btn",{attrs:{flat:"",label:"RESEND OTP"},on:{click:function(e){return t.resend()}}}),i("q-btn",{attrs:{flat:"",label:"CONFIRM"},on:{click:function(e){return t.verify()}}})],1)],1)],1)],1)],1)],1)},o=[],a=(s("5319"),s("cf57")),n={name:"login",data(){return{disable:!1,mobile:null,password:null,dense:!1,server_message:"",otp:null,otp_dialog:!1}},methods:{servermsg(){this.$q.dialog({title:"Something went wrong.",message:this.server_message,persistent:!0}).onOk(()=>{}).onOk(()=>{}).onCancel(()=>{}).onDismiss(()=>{})},showLoading(){this.$q.loading.show({spinner:a["a"],spinnerColor:"info",backgroundColor:"white",spinnerSize:140}),this.timer=setTimeout(()=>{this.$q.loading.hide(),this.timer=0},1e3)},signup(){this.$router.replace("/register")},check(){},resend(){this.otp_dialog=!1,this.$axios.post("resend-otp",{mobile_number:this.$q.localStorage.getItem("mobile").toString()}).then(t=>{this.otp=null,this.otp_dialog=!0})},dologin(){this.disable=!0,this.$refs.mobile.validate(),this.$refs.mobile.hasError?this.disable=!1:(this.showLoading(),this.$axios.post("login",{mobile_number:"63"+this.mobile,PS:"Amping!"},{headers:{"Content-Type":"application/json"}}).then(t=>{!1===t.data.results?this.$q.sessionStorage.set("locked","true"):(this.$q.localStorage.set("mobile","63"+this.mobile),this.otp_dialog=!0)}).catch(t=>{this.server_message=t.response.data.message,this.disable=!1,this.servermsg(),console.log(t.response)}))},verify(){this.otp_dialog=!1,this.showLoading(),this.$axios.post("validate-otp",{otp:this.otp,mobile_number:"63"+this.mobile}).then(t=>{console.log(t.data),this.$q.sessionStorage.set("token",t.data.results.token),this.$router.replace("/")}).catch(t=>{this.server_message=t.response.data.message,this.servermsg(),console.log(t.response),this.otp_dialog=!0})}},created(){}},l=n,r=(s("3e7e"),s("2877")),c=s("4d5a"),d=s("09e3"),p=s("9989"),h=s("068f"),g=s("27f9"),u=s("9c40"),m=s("24e8"),b=s("f09f"),f=s("a370"),q=s("4b7e"),v=s("eebe"),w=s.n(v),x=Object(r["a"])(l,i,o,!1,null,null,null);e["default"]=x.exports;w()(x,"components",{QLayout:c["a"],QPageContainer:d["a"],QPage:p["a"],QImg:h["a"],QInput:g["a"],QBtn:u["a"],QDialog:m["a"],QCard:b["a"],QCardSection:f["a"],QCardActions:q["a"]})},b0e9:function(t,e,s){}}]);