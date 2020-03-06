<template>
<div class="body">
    <div class="main">
        <div class="left">
         <div class="logo">
             <h1 class="nx">农芯信息</h1>
             <h3 class="nxinformation">NongXinInformation</h3>
             </div>
             <div class="Basic_ifm">
              <span>基础信息</span>
              <br/>
              <span>Basic information</span>             
              <img src="../assets/tx.png">
              <table>
                  <tr>
                      <td>农户姓名：</td>
                      <td><template v-for="v in basicinfo.farmer">{{v.fname}}</template></td>
                  </tr>               
                   <tr>
                      <td>基地名称：</td>
                      <td>{{basicinfo.baseName}}</td>
                  </tr> 
                   <tr>
                      <td>技术负责人：</td>
                      <td><template v-for="v in basicinfo.manList">{{v.mname}}、</template></td>
                  </tr> 
                   <tr>
                      <td>面积（亩）：</td>
                      <td>{{basicinfo.baseAcreage}}</td>
                  </tr> 
                   <tr>
                      <td>地块数量：</td>
                      <td>{{basicinfo.lotCount}}</td>
                  </tr> 
                   <tr>
                      <td>经度：</td>
                      <td>{{basicinfo.log}}</td>
                  </tr> 
                   <tr>
                      <td>纬度：</td>
                      <td>{{basicinfo.lat}}</td>
                  </tr> 
                   <tr>
                      <td>主要作物：</td>
                      <td><template v-for="v in basicinfo.cropList">{{v.cname}}、 </template></td>
                  </tr> 
                   <tr>
                      <td>电话：</td>
                      <td><template v-for="v in basicinfo.farmer">{{v.fphone}}</template></td>
                  </tr> 
                   <tr>
                      <td>地理位置：</td>
                      <td>{{basicinfo.baseAddress}}</td>
                  </tr> 
              </table>

             </div>
             <div class="sdata">
                  <span>数据概况</span>
              <br/>
              <span>Amount of data</span>
              <div id="graph"></div>
              <div class="alldata"><span>总数据量：100000条</span></div>
              </div> 
        </div>
        <div class="center">
            <div class="maptype">
                <span>地图图形</span>
                <br/>
                <span>Map topography</span>
                 <div class="select">
            <a-form
              :form="form"
              @submit="handleSearch">
              <div style="width:100%;height:40px;margin:auto;">
                <a-form-item>
                     <a-select mode="multiple" :defaultValue="[]"  @change="handleChange" placeholder="请选择地块">
    
     <a-select-option v-for="v in blockinfo" :value="v.id">{{v.lotName}}</a-select-option>
  </a-select>
    </a-form-item>
              </div>
            </a-form>
          </div>
            </div>
                <div id="container"></div>
  <div class="five">
        <div class="all light"><span class="hours">{{hours}}</span><span class="lux">{{lux}}</span></div>
        <div class="all temperature"><span class="soil">{{soil}}</span><span class="surroundings">{{surroundings }}</span></div>
        <div class="all water"><span class="moisture">{{moisture}}</span><span class="humidity">{{humidity}}</span><span class="rainfall">{{rainfall}}</span></div>
        <div class="all air"><span class="pressure">{{pressure}}</span><span class="speed">{{speed}}</span><span class="direction">{{direction}}</span></div>
        <div class="all fertilizer">
            <span class="organicmatter">{{organicmatter}}</span>
            <div class="charts">
                <div class="item"><span>氮</span><span ref="nitrogen"></span><span>{{nitrogen}}%</span></div>
                <div class="item"><span>磷</span><span ref="phosphorus"></span><span>{{phosphorus}}%</span></div>
                <div class="item"><span>钾</span><span ref="potassium"></span><span>{{potassium}}%</span></div>
            </div>
            </div>
  </div>
  <div class="news">
      <span>新闻信息</span>
                <br/>
      <span>News</span>
  </div>
  <div class="newslist"><div class="newsright" style="background-color: yellow;"></div><div class="newscenter"><p>{{news[0]}}</p></div><div class="newsleft" style="background-color: yellow;"></div></div>
  <div class="newslist"><div class="newsright" style="background-color: #48D1CC;"></div><div class="newscenter"><p>{{news[1]}}</p></div><div class="newsleft" style="background-color: #48D1CC;"></div></div>
  <div class="newslist"><div class="newsright" style="background-color: #CD3333;"></div><div class="newscenter"><p>{{news[2]}}</p></div><div class="newsleft" style="background-color: #CD3333;"></div></div>
            
        </div>
        <div class="right">
            <div class="time">
                <div class="ymdhm">
                <div class="ymd"><p>{{nowTimed}}</p></div>
                <div class="hm"><p>{{nowTimem}}</p></div>
                </div>
                <div class="guide">
                    <p><span style="color:red;">宜：</span>{{}}</p>
                    <p><span>忌：</span>{{}}</p>
                    <p><span style="color:black;margin:0px 0px 0px 20px;">夏至</span></p>
                </div>
            </div>
            <div class="online">
                <div class="news">
      <span>视频监控</span>
                <br/>
      <span>Video surveillance</span>
  </div>
            </div>
            <div class="worklist">
                <div class="news">
      <span>工单记录</span>
                <br/>
      <span>Work record</span>
      <div id="list" ref="list">
          <a-table style="height=450px" :columns="columns" :dataSource="data" :pagination="{ pageSize: 100 }" :scroll="{y: 450 } " bordered >
  </a-table>
      </div>
  </div>
            </div>
        </div>
    </div>
    <Foot style="margin:0px;"/>
</div>
</template>
<script>
import MapLoader from '@/utils/loadMap.js'
import Foot from '@/components/layouts/GlobalFooter.vue'
import {queryBase,getBlockByBaseId,deleteBlock, blockAdd, blockUpdate,queryBaseById} from '@/api/allapi'
import {getBasicInfo,getBlockInfo,getBaseworklist,getLastEnvMonitor,getLastSoilTestByLotId} from '@/api/userApi'
import echarts from 'echarts';
const columns = [
  { title: '时间', width: 150, dataIndex: 'time', align:'center' },
  { title: '作业内容', width: 150, dataIndex: 'neirong',align:'center' },
];

const data = [];
for (let i = 0; i < 9; i++) {
  data.push({
    time: `Edrward ${i}`,
    neirong: 32,
  });
}
export default {
    data () {
    return {
         data,
      columns,
     news:["新华社北京5月10日电（记者温竞华）5月12日-18日是全民营养周。记者10日从中国营养学会获悉，近年来，我国居民总体蔬果摄入量不足，专家建议一个人每天应该吃够一斤蔬菜和半斤水果。","在2019全民营养周暨“5·20”中国学生营养日主场启动会上，中国营养学会公布了相关调查数据：2012年我国城乡居民平均每标准人日蔬菜的摄入量为269.4克，与2002年相比","今年全民营养周的主题为“合理膳食、天天蔬果、健康你我”。中国营养学会副理事长马冠生建议，应保证餐餐有蔬菜，天天有水果，一个人每天应该吃够一斤蔬菜、半斤水果。"],
     map:null,
     baseInfo:{},
     center:[116.25387,24.35785],
     form:this.$form.createForm(this),
     nowTimed:'',
     nowTimem:'',
     basicinfo:{},
     blockinfo:[],
     block:[],
     hours:'10',
     lux:'9',
     soil:'33',
     surroundings:'22',
     humidity:'12.1',
     rainfall:'32.3',
     moisture:'45.6',
     pressure:'101.8',
     speed:'03',
     direction:'东南',  
     organicmatter:'50',
     nitrogen:'20',
     phosphorus:'30',
     potassium:'40',
    }
  },
  components:{
      Foot,
  },
  created(){
      let aa={};
      let bb={};
      let cc={}
      aa.id=1;
      bb.baseId=1;
      cc.lotId=1005;
    getBasicInfo(aa).then((res)=>{
        if(res.success){
            this.basicinfo=res.result
        }
          });  
    getBlockByBaseId(bb).then((res)=>{
        if(res.success){
         this.blockinfo=res.result
        }
      });  
      /*getBaseworklist(aa).then((res)=>{
          if(res.success){
              
          }
      });*/
     /* bb.lotId=1005;
      getLastEnvMonitor(bb).then((res)=>{
          if(res.success){
              
          }
      });*/
      /*getLastSoilTestByLotId(cc).then((res)=>{
          if(res.success){
              
          }
      });*/
  },
  mounted(){
    this.drawLine();
    let baseId = 1;
      //this.center.push(this.$route.query.log);
      //this.center.push(this.$route.query.lat);
      /**
       * second
       * 1、根据ID查询基地信息
       * 2、将基地的点刷新到地图上
       *
       */
       queryBaseById({'baseId':baseId}).then((res)=>{
        if(res.success){
          this.baseInfo = res.result;
          this.initMap();
        }
       });
       //setInterval(function(){this.timeFormate(new Date());},30000);
       //this.nowTimes();
       setInterval(this.nowTimes(),30*1000);
    //var work_list=document.createElement();
    //this.$refs.list.appendChild();
       this.$refs.nitrogen.style.height=String(Number(this.nitrogen)*0.6)+'%';
       this.$refs.phosphorus.style.height=String(Number(this.phosphorus)*0.6)+'%';
       this.$refs.potassium.style.height=String(Number(this.potassium)*0.6)+'%';
       //loadBackground();
  },
  methods: {
      handleSearch(){},
       handleChange(value) {
      console.log(value);
      //this.initMap();
      this.addBlockOnMap(value);
       },
       addBlockOnMap(value){
       if(this.block.length>0){
           for(let b=0;b<this.block.length;b++){
               this.map.remove(this.block[b]);
           }
       }     
    for(let j=0; j<value.length;j++){
        let a=value[j];  
        console.log(a);
      for(let i=0;i<this.blockinfo.length;i++){      
        let item = this.blockinfo[i];
        if(item.id==a){
        if(item.remark!=undefined && item.remark!=null && item.remark.trim()!=""){
          let remarkJson2 = eval('(' + item.remark + ')');
          //let polygon = new AMap.Polygon(remarkJson2);
         // console.log(remarkJson2.path);
          let newPath = [];
          for(let i=0;i<remarkJson2.path.length;i++){
            let point=remarkJson2.path[i];
            newPath.push(new AMap.LngLat(point.lng,point.lat));
          }
          remarkJson2.path = newPath;
          let polygon2 = new AMap.Polygon(remarkJson2);
          this.block.push(polygon2);
          this.map.add(polygon2);

        }
        }
      }
           }
    },
       timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTimed = year + "年" + month + "月" + date +"日";
      this.nowTimem = hh+":"+mm ;
    },
    nowTimes(){
this.timeFormate(new Date());
},
      initMap(){
      let that = this
      MapLoader().then(AMap => {
        that.map = new AMap.Map('container', {
          center: that.center,
          zoom: 16,
           /*layers: [
            // 卫星
            new AMap.TileLayer.Satellite(),
            // 路网
            new AMap.TileLayer.RoadNet()
        ],*/
          viewMode:'3D',

        });
         AMap.plugin(['AMap.MapType',], function(){
    // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    that.map.addControl(new AMap.MapType());
});
        this.map.on("complete", function(){
          console.log("地图加载完成！");

          var myEvent = new CustomEvent('xx',{});
          if(window.dispatchEvent) {
            window.dispatchEvent(myEvent);
          } else {
            window.fireEvent(myEvent);
          }
        });
      })

    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('graph'))
        // 绘制图表
        myChart.setOption({
           tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series : [
        {
            type: 'graph',
            layout: 'none',
            symbolSize: 60,
            roam: false,
            label: {
                normal: {
                    show: true,
                    fontSize:15,
                }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            data: [{
                name: '人',
                x: 0,
                y: 100,

            }, {
                name: '物',
                x: 200,
                y: 100
            }, {
                name: '天',
                x: 100,
                y: 20
            }, {
                name: '地',
                x: 100,
                y: 170
            }],
            // links: [],
            links: [{
                source: '人',
                target: '天'
            },{
                source: '天',
                target: '人'
            }, {
                source: '人',
                target: '地'
            },{
                source: '地',
                target: '人'
            }, {
                source: '物',
                target: '地'
            },{
                source: '地',
                target: '物'
            }, {
                source: '物',
                target: '天'
            },{
                source: '天',
                target: '物'
            }],
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        }
    ]
        });
    }
  }
}
</script>

<style>
#graph{
    width: 100%;
    height: 250px;
}
body,.left::after,.right::after,.main::after,.five::after {
    clear: both;
    content: '';
    display: block;
    width: 0;
    height: 0;

}
.body{
    padding-top: 20px;
}
body{
    background-color: #e5e5e5;
    width: 100%;
    min-width: 1500px;
}
.main{
    width: 100%;
    height: 100%;
    position: relative;
}
.left{
    padding-left: 30px;
    width: 330px;
    min-width: 330px;
    position: absolute;
    left:-10px;
    top: 0;
    
}
.center{
    width: auto;
    margin: 0 330px;
}
.right{
    padding-right:30px;
    width: 330px;
    min-width: 330px;
    position: absolute;
    z-index: 100;
    right:-10px;
    top: 0;
}
.logo{
    width:100%;
    height:150px;
    min-height: 150px;
    margin-bottom: 10px;
    background-image: url('../assets/nxlogo.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    background-color: #ffffff;
}
.logo>h1{
    color: white;
    text-align: center;
    line-height: 150px;
    font-size: 50px;
    font-weight: bold;
}
.nxinformation {
	font-family: Corbel;
	font-weight: normal;
    font-size: 20px;
	color: white;
    position: absolute;
    bottom: 10%;
    right:5%;
}
.Basic_ifm{
    width: 100%;
    height: 500px;
    background-color: #ffffff;
}
.Basic_ifm>span:first-child,
.sdata>span:first-child,
.maptype>span:first-child,
.news>span:first-child{
    font-size: 25px;
    font-weight: bold;
    margin-left: 5px;
    font-family: MicrosoftYaHei-Bold;
	color: #556862;
}
.Basic_ifm>br+span,
.sdata>br+span,
.maptype>br+span,
.news>br+span{
    font-size: 10px;
    margin-left:5px;
    font-family: MicrosoftYaHei-Bold;
    color: #556862;
}
.Basic_ifm>img{
    display: block;
    width:60%;
    height: 160px;
    margin-left: 20%;
    margin-bottom: 10px;
}
.Basic_ifm>table{
    display: block;
    width: 80%;
    height: 46%;
    margin-left:20%;
    font-family: MicrosoftYaHei-Bold;
    font-size: 15px;
    color:#556862;
}
.sdata{
    margin-top: 10px;
    background-color: #ffffff;
}
.alldata{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
}

.maptype{
    background-color: #ffffff;
}
#container{
    width: 100%;
    height: 460px;
    margin-bottom: 5px;
}
.five{
    width: 100%;
}
.all {
  float: left;
  width: 16%;
  height: 230px;
  margin-right: 5%;
  box-shadow:0px 5px 8px gray;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.fertilizer{
    margin-right: 0;
    background-image: url('@/../../assets/fertilizer.png');
}
.light{
 background-image: url('@/../../assets/light.png');
}
.temperature{
 background-image: url('@/../../assets/temperature.png');
}
.water{
 background-image: url('@/../../assets/water.png');
}
.air{
 background-image: url('@/../../assets/air.png');
}
.news{
    width: 100%;
    height: 58px;
    margin-top:10px; 
    background: #ffffff;
    margin-bottom:7px; 
}
.newslist{
    width: 100%;
    height: 50px;
    margin-bottom: 5px;
    background: #ffffff;
}
.newsright{
    float: left;
    width: 5%;
    height: 50px;
    overflow: hidden;
}
.newscenter{
    float: left;
    overflow: hidden;
    width: 93%;
    height: 50px;
}
.newscenter>p{  
    line-height: 50px;
    margin-bottom:0; 
    font-size: 20px;
    color: #000;
    white-space: nowrap;
    animation: 50s wordsLoop linear infinite normal;
}
@keyframes wordsLoop {
            0% {
                transform: translateX(100%);
                -webkit-transform: translateX(100%);
            }
            100% {
                transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
            }
        }
 
        @-webkit-keyframes wordsLoop {
            0% {
                transform: translateX(200px);
                -webkit-transform: translateX(200px);
            }
            100% {
                transform: translateX(-100%);
                -webkit-transform: translateX(-100%);
            }
        }

.newsleft{
    float: right;
    width: 2%;
    height: 50px;
}
.time{
    width: 100%;
    height: 100px;
    background-color: #ffffff;
}
.ymdhm{
    float: left;
    width: 60%;
    height: 100px;
}
.ymd>p{
    width: 140px;
    display: block;
    margin:auto;
    font-family: MicrosoftYaHei;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #556862;
    margin-top: 5px;
}
.hm>p{
    display: block;
    font-family: MicrosoftYaHei;
	font-size: 70px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 1px;
	color: #556862;
    line-height: 70px;
}
.guide{
    width: 38%;
    float: left;
    margin-left: 2%;
}
.guide span{
    font-family: MicrosoftYaHei-Bold;
    letter-spacing: 1px;
	color: #88bc50;
    font-size: 18px;
    font-weight: bold;
}
.guide p{
    margin-bottom: 8px;
}
.online{
    width: 100%;
    height: 350px;
    margin: 10px 0 10px 0;
    background-color: #ffffff;
}
.worklist{
    width: 100%;
    height: 560px;
    background-color: #ffffff;
}
.hours,.lux,.soil,.surroundings,
.humidity,.rainfall,.moisture,
.pressure,.speed,.direction,
.organicmatter{
    position: absolute;
    font-size: 40px;
    font-weight: bold;
    color: #ffffff;
}
.hours{
    top:20%;
    left:9%
}
.lux{
    top:38%;
    right: 29%;
}
.soil{
    top:24%;
    left:12%;
    font-size: 26px;
}
.surroundings{
    top:45%;
    right:25%;
}
.moisture{
    font-size: 22px;
    top: 23%;
    left:7%;
}
.humidity{
    font-size: 25px;
    top:43%;
    right:13%
}
.rainfall{
    font-size: 25px;
    top:50%;
    left:13%
}
.direction{
    font-size: 30px;
    top:54%;
    left:15%;
}
.speed{
    font-size: 25px;
    top:38%;
    right:26%;
}
.pressure{
    font-size: 23px;
    top:24%;
}
.organicmatter{
    font-size: 30px;
    top:28%;
    left:30%;
}
.charts{
    width: 100%;
    height: 40%;
    position: absolute;
    top:44%;
}
.item{
    float: left;
    width: 33%;
    height: 100%;
    text-align: center;
}
.item>span{
    display: block;
    color: #ffffff;
}
.item>span:first-child+span{
    width: 20%;
    height: 60%;
    margin: auto;
    background-color: #ffffff;
}
#list{
    width: 100%;
    height: 500px;
    overflow: hidden;
}
</style>

