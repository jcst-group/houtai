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
                            <a-select-option v-for="v in baseinfo" :key="v.id"  :value="v.id" @click="changeSelect(v.id)">{{v.lotName}}</a-select-option>
                          </a-select>
                        </a-form-item>
                      </div>
                    </a-form>
                </div>
              </div>
              <div class="countCenter">
                <div class="centerCou">
                  <div style="flex: 1;position: relative">
                    <span style="font-size: 20px">环境温度</span><br>
                    <span>Environment Temperature</span>
                    <div id="round" class="rounds"></div>
                    <div class="roundness">
                      <span style="font-size: 60px;color: white;font-weight:bold;position: absolute;left:22%;top: 20%;" ref="aVal">{{this.airTemperature}}</span>
                      <span style="font-size: 30px;color: white;font-weight:400;position: absolute;left: 63%;top: 25%;" ref="aVals">°</span>
                      <span style="font-size: 27px;color: white;font-weight:400;position: absolute;left:70%;top: 26%;" ref="aValss">C</span>
                    </div>
                    <div id="broken" class="brokens"></div>
                  </div>
                  <div style="flex: 1;position: relative">
                    <span style="font-size: 20px">降雨量</span><br>
                    <span>Rainfall</span>
                    <div id="roundTw" class="roundsw"></div>
                    <div class="roundness">
                      <span style="font-size: 60px;color: white;font-weight:bold;position: absolute;left:24%;top: 16%;" ref="rVals">{{this.rainfall}}</span>
                      <span style="font-size: 40px;color: white;font-weight:400;position: absolute;left: 34%;top: 53%;">mm</span>
                    </div>
                    <div id="brokenTw" class="brokensTw"></div>
                  </div>
                  <div style="flex: 1;position: relative">
                    <span style="font-size: 20px">气压</span><br>
                    <span>Pressure</span>
                    <div id="roundThr" class="roundsr"></div>
                    <div class="roundness">
                      <span style="font-size: 60px;color: white;font-weight:bold;position: absolute;left:14%;top: 20%;" ref="pVals">{{this.airPressure}}</span>
                      <span style="font-size: 40px;color: white;font-weight:400;position: absolute;left: 32%;top: 56%;">kPa</span>
                    </div>
                    <div id="brokenThr" class="brokensThr"></div>
                  </div>
                </div>
              </div>
              <div class="countBottom">
                <div class="bottomD">
                  <div class="bottomTop">
                    <div class="bottomTopFir">
                      <span class="allBott">{{this.illIntensity}}</span>
                    </div>
                    <div class="bottomTopTw">
                      <span class="allBott" style="left:22%" ref="pmVal">{{this.pm25Value}}</span>
                    </div>
                    <div class="bottomTopThr">
                      <div style="flex: 0.8;">

                      </div>
                      <div style="flex: 4;">

                      </div>
                    </div>
                  </div>
                  <div class="bottomBo">
                    <div class="bottomBoFir">
                      <span class="allBott" style="left:22%">{{this.windSpeed}}</span>
                    </div>
                    <div class="bottomBoTw">
                      <span class="allBott" style="font-size: 50px;top: 35%;left: 20%">{{this.windDirection}}</span>
                    </div>
                    <div class="bottomBoThr">
                      <div style="flex: 0.8;">

                      </div>
                      <div style="flex: 4;">

                      </div>
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
    import { getLotListByBaseId,getLastEnvMonitorBySiteId } from '@/api/userApi'
    import echarts from 'echarts';
    export default {
      data: function () {
        return {
          color: ['#EEB541', '#4A6499', '#35B797'],
          nowTimed:'',
          nowTimem:'',
          baseinfo:[],
          baseinfos:[],
          form:this.$form.createForm(this),
          sbase:'请选择',
          ids:0,
          airTemperature:0,
          rainfall:0,
          airPressure:0,
          illIntensity:0,
          pm25Value:0,
          windSpeed:0,
          windDirection:0,
      }
      },
      created() {
        let par = {};
        par.id=1;
        getLotListByBaseId(par).then((res=>{
          this.baseinfo=res.result;
          this.sbase=res.result[0].id;
        }))
      },
      mounted(){
          var base = +new Date(1968, 9, 3);
          var oneDay = 24 * 3600 * 1000;
          var date = [];
          var data = [Math.random() * 1];
          for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
          };
         setInterval(this.nowTimes(),30*1000);
      },
      methods: {
        handleSearch(){},
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
              showDelay: 200,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
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
                radius: ['50%', '61%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
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
                  {value:param.vals, name:''},
                  {value:param.valu, name:''}
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
                data: ['11','12','14','15','30','12','24','14','15','30'],
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
        isRound() {
          let param = new Object();
          let params = new Object();
          if(document.getElementById("round").className == 'rounds' || document.getElementById("broken").className == 'brokens') {
            param.id = 'round';
            param.x = 0;
            param.vals = this.airTemperature;
            param.valu = 45-this.airTemperature;
            this.roundCre(param);
            params.id = 'broken';
            params.x = 0;
            params.val = '环境温度';
            this.brokenCre(params);
          }
          if(document.getElementById("roundTw").className == 'roundsw'|| document.getElementById("brokenTw").className == 'brokensTw') {
            param.id = 'roundTw';
            param.x = 1;
            param.vals = this.rainfall;
            param.valu = 80-this.airTemperature;
            this.roundCre(param);
            params.id = 'brokenTw';
            params.x = 1;
            params.val = '降雨量';
            this.brokenCre(params);
          }
         if(document.getElementById("roundThr").className == 'roundsr' || document.getElementById("brokenThr").className == 'brokensThr'){
           param.id = 'roundThr';
           param.x = 2;
           param.vals = this.airPressure;
           param.valu = 120-this.airPressure;
           this.roundCre(param);
           params.id = 'brokenThr';
           params.x = 2;
           params.val = '气压';
           this.brokenCre(params);
          }
        },
        changeSelect(id){
          /*this.ids = id;*/
          let par ={};
          par.lotId =id;
          par.baseId =1;
          getLastEnvMonitorBySiteId(par).then((res=>{
            this.baseinfos = res.result;
            this.airTemperature = res.result.airTemperature;
            this.rainfall = res.result.rainfall;
            this.airPressure = res.result.airPressure;
            this.illIntensity = res.result.illIntensity;
            this.pm25Value = res.result.pm25Value;
            this.windSpeed = res.result.windSpeed;
            this.windDirection = res.result.windDirection;
          }))
          /*if(this.airTemperature < 10 && this.airTemperature.indexOf('.')==-1){
             this.$refs.aVal.style.left = '40%';
           }else if(this.airTemperature < 10 && this.airTemperature.indexOf('.')!=-1){
             this.$refs.aVal.style.left = '21%';
           }else if(this.airTemperature > 10 && this.airTemperature.indexOf('.')!=-1){
             this.$refs.aVal.style.left = '15%';
             this.$refs.aVals.style.left = '75%';
             this.$refs.aValss.style.left = '79%';
           }else{
             this.$refs.aVal.style.left = '29%';
           }*/
           if(this.rainfall==0){
             this.$refs.rVals.style.left = '42%';
           }
          this.isRound();
        },
        back(){
          this.$router.replace('/Home')
        }
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
    background: url("../assets/sky.png") no-repeat;
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
    flex: 6.8;
    width: 100%;
    position: relative;
  }
  .countBottom {
    flex: 5;
    width: 100%;
    position: relative;
  }
  .bottomD {
    width: 85%;
    position: absolute;
    left: 7%;
    top: 5%;
    height: 90%;
    display: flex;
    flex-direction:column;
  }
  .centerCou {
    width: 85%;
    position: absolute;
    left: 7%;
    height: 100%;
    display: flex;
  }
  .bottomTop {
    flex: 1;
    position: relative;
  }
  .bottomBo {
    flex: 1;
    position: relative;
  }
  .bottomTopFir,.bottomBoFir {
    position: absolute;
    left: 0%;
    width: 12%;
    height: 95%;
    background: url("../assets/sky01.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottomTopTw,.bottomBoTw {
    position: absolute;
    left: 15%;
    width: 12%;
    height: 95%;
    background: url("../assets/sky02.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottomTopThr,.bottomBoThr {
    position: absolute;
    left: 30%;
    width: 68%;
    height: 95%;
    background-color: white;
    display: flex;
  }
  .bottomTopThr :first-child {
    background: url("../assets/sky03.png")no-repeat;
    background-size: 100% 100%;
  }
  .bottomBoFir {
    background: url('../assets/sky04.png') no-repeat;
    background-size: 100% 100%;
    top: 5%;
  }
  .bottomBoTw {
    background: url('../assets/sky05.png') no-repeat;
    background-size: 100% 100%;
    top: 5%;
  }
  .bottomBoThr {
    top: 5%;
  }
  .bottomBoThr :first-child {
    background: url("../assets/sky06.png")no-repeat;
    background-size: 100% 100%;
  }
  .roundness {
    width:200px;
    height:200px;
    background-color:#444F5F;
    border-radius:50%;
    position: absolute;
    top: 20%;
    left: 28%;
  }
  #round,#roundTw,#roundThr{
    position: absolute;
    width:400px;
    height:400px;
    top: -2.6%;
    left: 5.8%;
  }
  #broken,#brokenTw,#brokenThr{
    width: 400px;
    height: 140px;
    position: absolute;
    top: 70%;
    left: 2%;
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
  .countD{
    width: 85%;
    height: 40px;
    background-color: white;
    position: absolute;
    top: 21%;
    left: 7%;
  }
  .allBott{
    position: absolute;
    font-size: 75px;
    font-weight: 600;
    color: white;
    top: 16%;
    left: 12%;
  }
</style>
