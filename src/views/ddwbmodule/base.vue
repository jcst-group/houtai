<template>
  <div>
    <a-modal
      v-model="visible"
      title="查看详情"
      @ok="handleOk"
      okText="退出"
      ref="modal"
      cancelText="取消"
      :maskClosable="false"
      style="min-width:800px;"
    >
    <div class="jcxx">
      <div class="title">
        <span class="title_1"></span>
        <span class="title_2">基础信息</span>
      </div>
      <div class="jcxx_main">
        <table>
          <tr>
            <td>基地名称：</td>
            <td>{{record.baseName}}</td>
            <td>基地范畴：</td>
            <td>{{record.category?record.category.displayName:null}}</td>
          </tr>
          <tr>
            <td>基地类型：</td>
            <td>{{record.baseType?record.baseType.displayName:null}}</td>
            <td>土壤类型：</td>
            <td>{{record.soilType?record.soilType.displayName:null}}</td>
          </tr>
          <tr>
            <td>前茬茬口：</td>
            <td>{{record.frontStubble}}</td>
            <td>面积(亩)：</td>
            <td>{{record.acreage}}</td>
          </tr>
          <tr>
            <td>方位：</td>
            <td>{{position}}</td>
            <td>坡度：</td>
            <td>{{record.slope}}</td>
          </tr>
          <tr>
            <td>经度：</td>
            <td>{{record.longitude}}</td>
            <td>纬度：</td>
            <td>{{record.latitude}}</td>
          </tr>
          <tr>
            <td>基地地址：</td>
            <td colspan="4" style="width:90%">{{record.address?record.address.province:null}} {{record.address?record.address.city:null}} {{record.address?record.address.area:null}} {{record.address?record.address.street:null}}</td>
          </tr>
          <tr>
            <td>简介：</td>
            <td colspan="4" style="width:90%">{{record.survey}}</td>
          </tr>
          <tr>
            <td valign="top">基地图片：</td>
            <td valign="top">
              <img v-if="record.basePic" style="width:100px;height:100px;cursor: pointer;" @click="lookpic(record.basePic?record.basePic.pictureUrl:null)" :src="getpic(record.basePic?record.basePic.pictureUrl:null)"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="jcxx">
      <div class="title">
        <span class="title_1"></span>
        <span class="title_2">水源检测</span>
      </div>
      <div class="jcxx_main">
        <table>
          <template v-for="(v,k) in water">
              <tr :key="v.envStandardsId" v-if="k % 2 == 0">
                  <td>{{v.item}}：</td>
                  <td>{{v.value}}</td>
                  <td v-if="k< water.length-1">{{water[k+1].item}}：</td>
                  <td v-if="k< water.length-1">{{water[k+1].value}}</td>
              </tr>
          </template>
          <tr>
            <td valign="top">水源检测图片：</td>
            <td valign="top">
              <img v-if="record.waterPic" style="width:100px;height:100px;cursor: pointer;" @click="lookpic(record.waterPic?record.waterPic.pictureUrl:null)" :src="getpic(record.waterPic?record.waterPic.pictureUrl:null)"/>
              <img v-if="!record.waterPic" style="width:100px;height:100px;" src="../../assets/nopic.png"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="jcxx">
      <div class="title">
        <span class="title_1"></span>
        <span class="title_2">大气检测</span>
      </div>
      <div class="jcxx_main">
        <table>
          <template v-for="(v,k) in air">
              <tr :key="v.envStandardsId" v-if="k % 2 == 0">
                  <td>{{v.item}}：</td>
                  <td>{{v.value}}</td>
                  <td v-if="k< air.length-1">{{air[k+1].item}}：</td>
                  <td v-if="k< air.length-1">{{air[k+1].value}}</td>
              </tr>
          </template>
          <tr>
            <td valign="top">大气检测图片：</td>
            <td valign="top">
              <img v-if="record.airPic" style="width:100px;height:100px;cursor: pointer;" @click="lookpic(record.airPic?record.airPic.pictureUrl:null)" :src="getpic(record.airPic?record.airPic.pictureUrl:null)"/>
              <img v-if="!record.airPic" style="width:100px;height:100px;" src="../../assets/nopic.png"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="jcxx">
      <div class="title">
        <span class="title_1"></span>
        <span class="title_2">土壤检测</span>
      </div>
      <div class="jcxx_main">
        <table>
          <template v-for="(v,k) in soil">
              <tr :key="v.envStandardsId" v-if="k % 2 == 0">
                  <td>{{v.item}}：</td>
                  <td>{{v.value}}</td>
                  <td v-if="k< soil.length-1">{{soil[k+1].item}}：</td>
                  <td v-if="k< soil.length-1">{{soil[k+1].value}}</td>
              </tr>
          </template>
          <tr>
            <td valign="top">土壤检测图片：</td>
            <td valign="top">
              <img v-if="record.soilPic" style="width:100px;height:100px;cursor: pointer;" @click="lookpic(record.soilPic?record.soilPic.pictureUrl:null)" :src="getpic(record.soilPic?record.soilPic.pictureUrl:null)"/>
              <img v-if="!record.soilPic" style="width:100px;height:100px;" src="../../assets/nopic.png"/>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- <div class="all_1">
    <div class="all">
    <a-form
    :form="form"
  >
  <div class="title">基础信息</div>
  <a-row :gutter="16">
    <a-col :span="12" style="text-align:right;">
       <a-form-item
      v-bind="formItemLayout"
      label="基地名称"
    >
     <span>{{record.baseName}}</span>
    </a-form-item>
    </a-col>
    <a-col :span="12" style="text-align:right;">
       <a-form-item
          label="基地范畴"
          v-bind="formItemLayout"
        >
         <span>{{record.category?record.category.displayName:null}}</span>
        </a-form-item>
    </a-col>
  </a-row>
  <a-row :gutter="16">
    <a-col :span="12" style="text-align:right;">
        <a-form-item
      v-bind="formItemLayout"
      label="基地类型"
    >
      <span>{{record.baseType?record.baseType.displayName:null}}</span>
    </a-form-item>
    </a-col>
    <a-col :span="12" style="text-align:right;">
       <a-form-item
      v-bind="formItemLayout"
      label="土壤类型"
    >
      <span>{{record.soilType?record.soilType.displayName:null}}</span>
    </a-form-item>
    </a-col>
  </a-row>
   <a-row :gutter="16">
     <a-col :span="12" style="text-align:right;">
        <a-form-item
      v-bind="formItemLayout"
      label="前茬茬口"
    >
      <span>{{record.frontStubble}}</span>
    </a-form-item>
     </a-col>
     <a-col :span="12" style="text-align:right;">
       <a-form-item
      v-bind="formItemLayout"
      label="面积(亩)"
    >
      <span>{{record.acreage}}</span>
    </a-form-item>
     </a-col>
   </a-row>
   <a-row :gutter="16">
     <a-col :span="12" style="text-align:right;">
       <a-form-item
      v-bind="formItemLayout"
      label="方位"
    >
      <span>{{position}}</span>
    </a-form-item>
     </a-col>
     <a-col :span="12" style="text-align:right;">
      <a-form-item
      v-bind="formItemLayout"
      label="坡度"
    >
      <span>{{record.slope}}</span>
    </a-form-item>
     </a-col>
   </a-row>
    <a-row :gutter="16">
     <a-col :span="12" style="text-align:right;">
       <a-form-item
      v-bind="formItemLayout"
      label="经度"
    >
         <span>{{record.longitude}}</span>
    </a-form-item>
     </a-col>
     <a-col :span="12" style="text-align:right;">
       <a-form-item
      v-bind="formItemLayout"
      label="纬度"
    >
         <span>{{record.latitude}}</span>
    </a-form-item>
     </a-col>
   </a-row>
   <a-row :gutter="16">
     <a-col :span="20">
       <a-form-item
      v-bind="formItemLayout1"
      label="基地地址"
    >
    <a-row :gutter="16">
      <a-col :span="8">
        <div class="inp">{{record.address?record.address.province:null}}</div>
      </a-col>
      <a-col :span="8">
        <div class="inp">{{record.address?record.address.city:null}}</div>
      </a-col>
      <a-col :span="8">
        <div class="inp">{{record.address?record.address.area:null}}</div>
      </a-col>
    </a-row>
      <div class="inp">{{record.address?record.address.street:null}}</div>
    </a-form-item>
     </a-col>
   </a-row>
    <a-form-item
      v-bind="formItemLayout1"
      label="简介"
    >
      <div class="inp">{{record.survey}}</div>
    </a-form-item>
   <a-row :gutter="16">
     <a-col :span="12">
       <a-form-item

      label="基地图片"
    >
     <img style="width:100px;height:100px;" :src="getpic(record.basePic?record.basePic.pictureUrl:null)"/>
     <a-button class="look-btn" type="primary" @click="lookpic(record.basePic?record.basePic.pictureUrl:null)">查看</a-button>
    </a-form-item>
     </a-col>
     <a-col :span="12">
       <a-form-item

      label="水源检测图片"
    >
     <img style="width:100px;height:100px;" :src="getpic(record.waterPic?record.waterPic.pictureUrl:null)"/>
     <a-button class="look-btn" type="primary" @click="lookpic(record.waterPic?record.waterPic.pictureUrl:null)">查看</a-button>
    </a-form-item>
     </a-col>
   </a-row>
   <a-row :gutter="16">
     <a-col :span="12">
       <a-form-item

      label="大气检测图片"
    >
     <img style="width:100px;height:100px;" :src="getpic(record.airPic?record.airPic.pictureUrl:null)"/>
     <a-button class="look-btn" type="primary" @click="lookpic(record.airPic?record.airPic.pictureUrl:null)">查看</a-button>
    </a-form-item>
     </a-col>
     <a-col :span="12">
       <a-form-item

      label="土壤检测图片"
    >
     <img style="width:100px;height:100px;" :src="getpic(record.soilPic?record.soilPic.pictureUrl:null)"/>
     <a-button class="look-btn" type="primary" @click="lookpic(record.soilPic?record.soilPic.pictureUrl:null)">查看</a-button>
    </a-form-item>
     </a-col>
   </a-row>
  <div style="clear:both"></div>
   <div class="title">水源检测</div>
   <div style="width:50%;float:left;" v-for="v in water" :key="v.envStandardsId">
      <a-form-item
      v-bind="formItemLayout"
      :label="v.item"
    >
     <div class="inp">{{v.value}}</div>
    </a-form-item>
   </div>
<div style="clear:both"></div>
   <div class="title">大气检测</div>
    <div style="width:50%;float:left;" v-for="v in air" :key="v.envStandardsId">
      <a-form-item
      v-bind="formItemLayout"
      :label="v.item"
    >
     <div class="inp">{{v.value}}</div>
    </a-form-item>
   </div>
   <div style="clear:both"></div>
   <div class="title">土壤检测</div>
   <div style="width:50%;float:left;" v-for="v in soil" :key="v.envStandardsId">
      <a-form-item
      v-bind="formItemLayout"
      :label="v.item"
    >
     <div class="inp">{{v.value}}</div>
     
    </a-form-item>
   </div>
  </a-form>
</div>
</div>-->
    </a-modal>
     <a-modal
      v-model="ispic"
      title="查看图片"
      @ok="pic_handleOk"
      okText="退出"
      style="min-width:500px;max-width:1000px;"
    >
    <img style="width:100%;height:100%;" :src="pic_url" /> 
     </a-modal>
  </div>
</template>
<script>
  import {saveWalker,updateWalker} from '@/api/allapi'
  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { getBaseCategoryEnum,getBaseTypeEnum,getChinaArea,getSecondArea,getSoilTypeEnum,getBaseAllTest,addBase,editBase } from '@/api/ddwbApi'
  import { insertBase,updateBase,basenamecheck } from '@/api/allapi'
  import { getmap } from '@/api/userApi'
  import {pick} from 'lodash'
  import MapLoader from '@/utils/loadMap.js'
  import axios from 'axios'
  export default {
    name:'workerModal',
    data() {
      return {
        form: this.$form.createForm(this),
        formItemLayout: {
        labelCol: {
          xs: { span: 24},
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      formItemLayout1:{
        labelCol: {
          xs: { span: 24},
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
        visible: false,
        title:"操作",
        record:{},
        water:[],
        air:[],
        soil:[],
        ispic:false,
        pic_url:'',
        position:'',
      }
    },
    methods: {
      lookpic(a){
        this.pic_url='/api/pictureInfo/show/'+a;
        this.ispic=true;
      },
      pic_handleOk(){
        this.ispic=false;
      },
      getpic(a){
         let imageUrl='/api/pictureInfo/show/'+a;
         return imageUrl;
      },
      look(record){
        this.water=[];
        this.air=[];
        this.soil=[];
       this.record=record;
       if(record.position==1){
         this.position='阴坡';
       }
       if(record.position==2){
         this.position='阳坡';
       }
       if(record.position==3){
         this.position='平地';
       }
       if(this.record.baseTestingVoList.length>0){
         for(let i=0;i<this.record.baseTestingVoList.length;i++){
           if(this.record.baseTestingVoList[i].itemName.code=='AIR'){
             this.air.push(this.record.baseTestingVoList[i]);
           }
           if(this.record.baseTestingVoList[i].itemName.code=='WATER'){
             this.water.push(this.record.baseTestingVoList[i]);
           }
           if(this.record.baseTestingVoList[i].itemName.code=='SOIL'){
             this.soil.push(this.record.baseTestingVoList[i]);
           }
         }
       }
       this.visible=true;
      },

      handleOk(){
        this.visible=false;
      },
      showModal() {
        this.visible = true
      },
      hideModal() {
        this.visible = false
      },
    }
  }
</script>
<style scoped>
.jcxx{
  width:100%;
}
.title_1{
  vertical-align: middle;
  display: inline-block;
  width:5px;
  height:20px;
  background:rgba(19,176,104,1);
  border-radius:3px;
  margin-right:10px;
}
.title_2{
  vertical-align: middle;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
.jcxx_main{
  padding:10px 20px;
}
.jcxx_main table{
  width:100%;
}
.jcxx_main table td{
  padding: 10px 0;
}
.jcxx_main table tr td:first-child{
  width:15%;
  text-align: right;
  font-weight: bold; 
}
.jcxx_main table tr td:first-child + td{
  width:35%;
  text-align: left;
}
.jcxx_main table tr td:first-child + td + td{
  width:15%;
  text-align: right;
  font-weight: bold;
}
.jcxx_main table tr td:last-child{
  width:35%;
  text-align: left;
}
</style>

