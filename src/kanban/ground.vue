<template>
  <div class="body">
    <div class="main">
      <div class="left">
        <div class="leftFirst">
          <div style="width: 100%;height: 10%;position: absolute;">
            <p class="timem">{{nowTimem}}</p>
            <p class="timed">{{nowTimed}}</p>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div class="right">
        <a-button type="primary"  ghost style="position: absolute;right: 3%;" @click="back()">返回</a-button>
        <div class="rightCount">
          <div class="countTop">
            <div class="countD" style="position: relative;padding-top: 4px">
              <span style="font-size: 22px;font-weight: 600;margin-left: -90%;">地块选择：</span>
              <a-form
                :form="form"
                @submit="handleSearch">
                <div style="width:91%;height:40px;margin-left: 8.9%;margin-top: -2.7%;z-index: 10">
                  <a-form-item>
                    <a-select
                      v-decorator="[
                        'id',
                         {initialValue:Number(sbase)}
                      ]"
                    >
                      <a-select-option v-for="v in baseinfo" :key="v.id"  :value="v.id"  @click="changeSelect(v.id)">{{v.lotName}}</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
              </a-form>
            </div>
          </div>
          <div class="countCenter">
            <div class="centerCou">
              <div style="flex: 1;position: relative;">
                <div style="width: 85%;height: 100%;" id="longitud">
                  <span style="font-size: 37px;color: white;font-weight:500;position: absolute;top:20%;left: 17%;">163.123</span>
                  <span style="font-size: 37px;color: white;font-weight:500;position: absolute;top:36%;left: 23%;">24.123</span>
                  <span style="font-size: 90px;color: white;font-weight:600;position: absolute;top:62%;left: 27%;">20</span>
                </div>
              </div>
              <div style="flex: 1;position: relative;">
                <div id="round" class="rounds"></div>
                <div class="roundness">
                  <span style="font-size: 60px;color: white;font-weight:bold;position: absolute;left:34%;top: 25%;">30</span>
                  <span style="font-size: 30px;color: white;font-weight:400;position: absolute;left: 63%;top: 28%;">°</span>
                  <span style="font-size: 27px;color: white;font-weight:400;position: absolute;left:70%;top: 28%;">C</span>
                  <span style="font-size: 27px;color: white;font-weight:400;position: absolute;left:30%;top: 60%;">土壤温度</span>
                  <span style="font-size: 14px;color: white;position: absolute;left:30%;top: 80%;">Soil Temperature</span>
                </div>
                <div id="broken" class="brokens"></div>
              </div>
              <div style="flex: 1;position: relative;">
                <div id="roundTw" class="roundsw"></div>
                <div class="roundness">
                  <span style="font-size: 60px;color: white;font-weight:bold;position: absolute;left:34%;top: 25%;">30</span>
                  <span style="font-size: 30px;color: white;font-weight:400;position: absolute;left: 63%;top: 28%;">%</span>
                  <span style="font-size: 27px;color: white;font-weight:400;position: absolute;left:30%;top: 60%;">土壤湿度</span>
                  <span style="font-size: 14px;color: white;position: absolute;left:35%;top: 80%;">Soil Moisture</span>
                </div>
                <div id="brokenTw" class="brokensTw"></div>
              </div>
              <div style="flex: 1;position: relative;">
                <div id="roundThr" class="roundsr"></div>
                <div class="roundness">
                  <span style="font-size: 60px;color: white;font-weight:bold;position: absolute;left:26%;top: 25%;">1.2</span>
                  <span style="font-size: 30px;color: white;font-weight:400;position: absolute;left: 63%;top: 28%;">%</span>
                  <span style="font-size: 27px;color: white;font-weight:400;position: absolute;left:22%;top: 60%;">有机质含量</span>
                  <span style="font-size: 14px;color: white;position: absolute;left:36%;top: 80%;">Pressure</span>
                </div>
                <div id="brokenThr" class="brokensThr"></div>
              </div>
            </div>
          </div>
          <div class="countBottom">
            <div class="bottomD">
              <div style="flex: 1.3;position: relative;">
                <div class="bottomHeader">
                  <span style="font-size: 24px;color: white;position: absolute;left: 10%;top: 6%;">工单方案</span>
                  <span style="font-size: 13px;color: white;position: absolute;left: 11%;top: 60%;">Worksheet plan</span>
                </div>
                <div style="width: 100%;height: 93%;background-color: white;margin-top: 2%;overflow: hidden">
                  <a-table :columns="columns" :dataSource="datann" :scroll="{ y: 240 }" />
                </div>
              </div>
              <div style="flex: 1;position: relative;">
                <div style="width: 100%;height: 80%;" id="pies"></div>
                <span class="pieSpan">有机质</span>
                <span style="position: absolute;font-size: 8px;bottom: -1%;left: 36%;">Organic Matter</span>
              </div>
              <div style="flex: 1;position: relative;">
                <div style="width: 100%;height: 80%;" id="pillar"></div>
                <span class="pieSpan">土壤元素</span>
                <span style="position: absolute;font-size: 8px;bottom: -1%;left: 40%;">Soil Element</span>
              </div>
              <div style="flex: 1;">
                <div style="width: 100%;height: 80%;position: relative;" id="bar">
                  <span style="position: absolute;font-size: 20px;top: -20%;left: 30%;">PH值:</span>
                  <span style="position: absolute;font-size: 20px;top: -20%;left: 50%;">{{values}}</span>
                  <div style="height: 60px;width: 35px;position: absolute;top: -2%;border:3px solid black;" id="pValue" ref="pVal"></div>
                  <div class="sales" v-for="(item,index) in viewArr" :key='index' style="margin-top: 30%;">
                    <div class="content" :id="gre(index)" style="float: left;width: 30px;background-color: #BF383F;height: 50px">{{item.name}}</div>
                  </div>
                  <span class="pieSpan" style="top: 66%;">PH值</span>
                  <span style="position: absolute;font-size: 8px;bottom: -1%;left: 38%;top: 80%;">Ph Value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size: 17px;margin-top: 1.5%">粤ICP备00000000号   Copyright © 2019 NongXin Information Technology Co., Ltd.All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { getLotListByBaseId,getWorkOrderListByBaseId,getLastEnvMonitorBySiteId,getLastSoilTest,getBaseInfoByPrimaryId } from '@/api/userApi'
  import echarts from 'echarts';
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  }, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  }];
  var viewArr = [
    {name: '',type:1},
    {name: '',type:2},
    {name: '',type:3},
    {name: '',type:4},
    {name: '',type:5},
    {name: '',type:6},
    {name: '',type:7},
    {name: '',type:8},
    {name: '',type:9},
    {name: '',type:10},
  ];
  const datann = [];
  for (let i = 0; i < 100; i++) {
    datann.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  };
  export default {
    data: function () {
      return {
        color: ['#EEB541', '#4A6499', '#35B797'],
        nowTimed:'',
        nowTimem:'',
        datann,
        columns,
        viewArr,
        values:14,
        baseinfo:[],
        workOrderList:[],
        envMonitors:[],
        soilTests:[],
        baseinfos:[],
        form:this.$form.createForm(this),
        sbase:'',
      }
    },
    created() {
      let par = {};
      par.id=this.$route.query.baseid;
      alert(this.$route.query.baseid);
      getLotListByBaseId(par).then((res=>{
        this.baseinfo=res.result;
        this.sbase=res.result[0].id;
      }));
      getWorkOrderListByBaseId(par).then((res=>{
        this.workOrderList=res.result;
      }));
      getBaseInfoByPrimaryId(par).then((res=>{
        this.baseinfos=res.result;
      }));
    },
    mounted(){
      this.isRound();
      var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触'];
      var data = [ 310, 123, 442, 321, 90, 149, 210, 122, 133, 334];
      var yMax = 500;
      var dataShadow = [];
      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      };
      this.nowTimes();
      this.piesCre();
      this.pillarCre();
      this.moveValue();
      setInterval(this.nowTimes(),30*1000);
    },
    methods: {
      handleSearch(){},
      gre(index){
        return "person" +index
      },
      timeFormate(timeStamp){
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        this.nowTimed = year + "年" + month + "月" + date +"日";
        this.nowTimem = hh+":"+mm ;
      },
      nowTimes(){
        this.timeFormate(new Date());
      },
      roundCre(param){
        let myChart = echarts.init(document.getElementById(param.id));
        myChart.setOption({
          tooltip: {
            // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
            trigger: 'axis',
            showDelay: 300,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 10,   // 隐藏延迟，单位ms
            backgroundColor: '#EEB541',  // 提示框背景颜色
            textStyle: {
              fontSize: '16px',
              color: '#EEB541'  // 设置文本颜色 默认#FFF
            },
          },
          color: [this.color[param.x], '#EDEDED'],
          series: [
            {
              type:'pie',
              radius: ['55%', '68%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'inner'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                emphasis: {
                  shadowBlur: 50,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(30, 144, 255，0.5)'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:30, name:''},
                {value:18, name:''}
              ]
            }
          ]
        })
      },
      brokenCre(params) {
        var broken = echarts.init(document.getElementById(params.id));
        broken.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          symbol: 'none',
          boundaryGap: false,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['12','30','14','15','30','12','24','14','15','30'],
            show: false
          },
          yAxis: {
            type: 'value',
            show: false,
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name: params.val,
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: '#EDEDED'
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[params.x]
                }])
              },
              data: ['12','24','14','15','30','12','24','14','15','30'],
            }
          ]
        })
      },
      piesCre() {
        var myChart = echarts.init(document.getElementById("pies"));
        myChart.setOption({
          backgroundColor: 'white',
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series : [
            {
              name:'有机质',
              type:'pie',
              radius : '95%',
              center: ['50%', '50%'],
              data:[
                {value:335, name:''},
                {value:310, name:''},
                {value:274, name:''},
                {value:235, name:''},
                {value:400, name:''}
              ].sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        })
      },
      isRound() {
        let param = new Object();
        let params = new Object();
        if(document.getElementById("round").className == 'rounds' || document.getElementById("broken").className == 'brokens') {
          param.id = 'round';
          param.x = 0;
          this.roundCre(param);
          params.id = 'broken';
          params.x = 0;
          params.val = '土壤温度';
          this.brokenCre(params);
        }
        if(document.getElementById("roundTw").className == 'roundsw'|| document.getElementById("brokenTw").className == 'brokensTw') {
          param.id = 'roundTw';
          param.x = 1;
          this.roundCre(param);
          params.id = 'brokenTw';
          params.x = 1;
          params.val = '土壤湿度';
          this.brokenCre(params);
        }
        if(document.getElementById("roundThr").className == 'roundsr' || document.getElementById("brokenThr").className == 'brokensThr'){
          param.id = 'roundThr';
          param.x = 2;
          this.roundCre(param);
          params.id = 'brokenThr';
          params.x = 2;
          params.val = '有机质含量';
          this.brokenCre(params);
        }
      },
      pillarCre() {
        var myChart = echarts.init(document.getElementById("pillar"));
        myChart.setOption({
          backgroundColor:'#EDEDED',
          grid:{
            x:30,
            y:20,
            x2:5,
            y2:10,
            borderWidth:1
          },
          xAxis: {
            data: ['氮', '磷', '钾', '氮', '磷', '钾','氮', '磷', '钾'],
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              radius : '100%',
              center:['90%','90%'],
              itemStyle: {
                normal: {color: '#EDEDED01'}
              },
              barGap:'-100%',
              barCategoryGap:'40%',
              data: this.dataShadow,
              animation: false
            },
            {
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: [ 310, 123, 442, 321, 90, 149, 210, 122, 133, 334]
            }
          ]
        })
      },
      moveValue(){
        var val =this.values*6.07;
        this.$refs.pVal.style.left = val+'%';
      },
      changeSelect(id){
        let par ={};
        par.lotId =id;
        par.baseId =this.$route.query.baseid;
        getLastEnvMonitorBySiteId(par).then((res=>{
          this.envMonitors=res.result;
        }));
        let pars ={};
        pars.lotId =id;
        getLastSoilTest(pars).then((res=>{
          this.soilTests=res.result;
        }));
      },
      back(){
        this.$router.replace('/Home')
      },
    }
  }
</script>

<style scoped>
  .main {
    min-width: 1300px;
    min-height: 800px;
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    background-color: #E1E9E8;
    padding-left: 8px;
    padding-top: 14px;
  }
  .left {
    flex: 1;
    display: flex;
  }
  .right {
    flex: 5;
  }
  .leftFirst {
    position: relative;
    width: 84%;
    height: 98%;
    background: url("../assets/ground.png") no-repeat;
    background-size: 100% 100%;
  }
  .leftFirst::after {
    clear: both;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    right: -37.5%;
    border-top: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #ccccccab;
    border-width: 50px;
  }
  .rightCount {
    margin-top: 50px;
    width: 100%;
    height: 87.5%;
    background-color: #EDEDED;
    display: flex;
    flex-direction:column;
  }
  .countTop {
    flex: 1;
    width: 100%;
    position: relative;
  }
  .countCenter {
    flex: 6;
    width: 100%;
    position: relative;
  }
  .countBottom {
    flex: 5;
    width: 100%;
    position: relative;
  }
  .countD {
    width: 85%;
    height: 40px;
    background-color: white;
    position: absolute;
    top: 21%;
    left: 7%;
  }
  .bottomD {
    width: 85%;
    position: absolute;
    left: 7%;
    top: 5%;
    height: 90%;
    display: flex;
  }
  .centerCou {
    width: 85%;
    position: absolute;
    left: 7%;
    height: 100%;
    display: flex;
  }
  .roundness{
    z-index: 10;
    width:67.9%;
    height:54.5%;
    background-color:#444F5F;
    border-radius:50%;
    position: absolute;
    top: 5%;
    left: 9%;
  }
  #round,#roundTw,#roundThr{
    z-index: 10;
    position: absolute;
    width:400px;
    height:400px;
    top: -15%;
    left: -15%;
  }
  #broken,#brokenTw,#brokenThr{
    width: 400px;
    height: 140px;
    position: absolute;
    top: 80%;
    left: -15%;
  }
  .timem{
    color: white;
    font-weight:bold;
    font-size: 73px;
    margin-top: 10px;
  }
  .timed{
    margin-top: -33%;
    color: white;
    font-size: 20px;
  }
  #longitud{
    background: url('../assets/ground01.png') no-repeat;
    background-size: 100% 100%;
  }
  .bottomHeader {
    width: 95.5%;
    height: 18%;
    top: 2%;
    position: absolute;
    background-color: #444F5F;
    z-index: 10;
  }
  .pieSpan {
    font-size: 23px;
    font-weight: 600;
    position: absolute;
    top: 83%;
    left: 37%;
  }
  #person{
    background-color: #BF383F !important;
  }
  #person1{
    background-color: #CC5A42 !important;
  }
  #person2{
    background-color: #D67B42  !important;
  }
  #person3{
    background-color: #C0DD52 !important;
  }
  #person4{
    background-color: #A0CE51  !important;
  }
  #person5{
    background-color: #7DBE49 !important;
  }
  #person6{
    background-color: #4F9F3D  !important;
  }
  #person7{
    background-color: #217DE5  !important;
  }
  #person8{
    background-color: #06147C  !important;
  }
  #person9{
    background-color: #000338  !important;
  }
</style>
