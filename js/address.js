/**
 * Created by zhaobeibei on 2017/9/15.
 */
new Vue({
    el:".page",
    data:{
        addressList:[]
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, 3)
        }
    },
    methods:{
        getAddressList:function(){
            var _this=this;
            this.$http.get("address.json").then(function(response){
                var res=response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;
                }
            });
        }
    }
});