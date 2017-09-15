/**
 * Created by zhaobeibei on 2017/9/15.
 */
new Vue({
    el:".page",
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        hoverIndex:-1,
        shipingMethod:1
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum)
        }
    },
    methods:{
        getAddressList:function(){
            var _this=this;
            this.$http.get("address.json").then(function(response){
                var res=response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;
                    _this.currentIndex=res.defaultIndex;
                }
            });
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
               if(address.addressId==addressId){
                   address.isDefault=true;
               }else{
                   address.isDefault=false;
               }
            });
        }
        //addressHover:function(e,active){  //鼠标滑过
        //    var dom =e.target;  //当前元素
        //    var classVal=dom.getAttribute("class");
        //    if(active) {
        //        //添加class
        //        classVal = classVal.concat(" addr-active");
        //        dom.setAttribute("class", classVal);
        //    }
        //    else{
        //        //删除calss
        //        classVal = classVal.replace(" addr-active","");
        //        dom.setAttribute("class", classVal);
        //    }
        //}
    }
});