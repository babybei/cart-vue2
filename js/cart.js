/**
 * Created by zhaobeibei on 2017/9/11.
 */
var vm=new Vue({
    el:"#app",
    data:{
        productList:[],
        totalMoney:0,
        totalPrice:0,
        totalNum:0,
        checkall:false,
        delFlag:false,
        screenLeft: document.body.clientWidth/2-190,
        screenTop: document.documentElement.clientHeight/2-79,
        curProduct:''
    },
    filters:{//当前实例使用
        formatMoney:function(value){
            return "￥"+value.toFixed(2);   //总价金额转为两位小数
        }
    },//过滤器，分全局和局部，此处为局部过滤器
    mounted:function(){
        //钩子函数
        this.$nextTick(function(){
            this.cartView();  //也可以使用vm.cartView(); 使用vm就要求保证实例已经插入文档，$nextTick解决这一问题
            //窗体改变
            const _this=this;
            window.onresize=function(){
                _this.screenLeft=document.body.clientWidth/2-190;
                _this.screenTop=document.documentElement.clientHeight/2-79;
            }
        });
    },//生命周期1.0使用ready，2.0使用mounted，默认执行的方法
    methods:{
        cartView: function () {
            ////es5
            //var _this=this;  //指向vm
            ////this.$http.get("list.json",{"id":"123"}).then(function(rem){
            //this.$http.get("list.json").then(function(res){
            //    _this.productList=res.body.result.list;
            //    _this.totalMoney=res.body.result.totalMoney;
            //    _this.totalNum=res.body.result.totalNum;
            //});

            //es6，箭头函数 改变作用域
            //let _this=this;
            this.$http.get("list.json",{"id":"123"}).then(res=>{
                this.productList=res.body.result.list;
                this.totalMoney=res.body.result.totalMoney;
                this.totalNum=res.body.result.totalNum;
            });
        },
        changeMoney:function(product,way){
            if(way>0){//+
                product.pnum++;
            }
            else{//-
                product.pnum--;
                if(product.pnum<1){
                    product.pnum=1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function(item){
            if(typeof item.checked=='undefined'){ //判断对象中变量是否存在，不存在两种处理办法：1.全局注册，2.局部注册。
                Vue.set(item,'checked',true);   //Vue给item全局注册checked属性，并赋值
                //this.$set(item,'checked',true);    //局部注册
            }
            else{
                item.checked=!item.checked;   //值取反
            }
            this.calcTotalPrice();
        },
        checkallItem:function(){
            this.checkall=!this.checkall;
            var _this=this;
            //遍历商品列表
            this.productList.forEach(function (item,index) {
                if(typeof item.checked=='undefined') {
                    _this.$set(item,"checked",_this.checkall);
                }
                else {
                    item.checked = _this.checkall;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function(){   //计算总金额
            var _this=this;
            _this.totalPrice=0;
            this.productList.forEach(function(item,index){
                if(item.checked){  //商品选中
                    _this.totalPrice += item.pprict*item.pnum;
                }
            });
        },
        delConfirm:function(item){  //保存删除对象
            this.delFlag=true;
            this.curProduct=item;
        },
        delProduct:function(){  //删除
            var index=this.productList.indexOf(this.curProduct);   //获得商品索引
            this.productList.splice(index,1);   //splice(index,n)从index位置开始，删除n个元素
            this.delFlag=false;
        }
    }
});
//可以提到一个单独文件
Vue.filter("money",function(value,type){
    return "￥"+value.toFixed(2)+type;   //总价金额转为两位小数
});  //全局过滤器，所有页面都可以使用