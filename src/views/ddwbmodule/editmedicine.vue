<template>
  <div>
    <div class="all_1">
    <a-modal
      title="编辑"
      v-model="visible"
      @ok="handleOk"
      @cancel="delNewPic"
      :confirmLoading="confirmLoading"
      okText="保存"
      cancelText="取消"
      :maskClosable="false"
      style="min-width:800px;"
      >
       <a-form :form="form">
        <a-row :gutter="16">
          <a-col :span="12">
        <a-form-item
          label="药材名称"
          v-bind="formItemLayout"
        >
         <a-input
            v-decorator="[
          'cropName',
          {
            initialValue:record.cropName,
            rules: [{
              required: true, message: '药材名称必须在0~20位内!',min:0,max:20
            }]
          }
        ]"
          />
        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item
          label="拼音码"
          v-bind="formItemLayout"
        >
       <a-input
            v-decorator="[
          'pinyinCode',
          {
            initialValue:record.pinyinCode,
            rules: [{
              required: true, message: '拼音码必须在0~20位内!',min:0,max:20
            }]
          }
        ]"
          />
        </a-form-item>
        </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
         <a-form-item
          label="药材描述"
          v-bind="formItemLayout"
        >
        <a-textarea
          :rows="4"
            v-decorator="[
          'describe',
          {
            initialValue:record.describe,
            rules: [{
              required: true, message: '药材描述必须在0~200位内!',min:0,max:200
            }]
          }
        ]"
            style="width: 100%"
          >
          </a-textarea>
        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item
          label="药材图片"
          :required="true"
          v-bind="formItemLayout1"
        >
          <a-upload
      name="file"
      action="/api/pictureInfo/addCropPic"
      listType="picture-card"
      :fileList="mfileList"
      @preview="mhandlePreview"
      :headers="headers"
      :beforeUpload="beforeUpload"
      @change="mhandleChange"
      :remove="removempic"
    >
      <div v-if="mfileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">药材图片</div>
      </div>
    </a-upload>
    <a-modal :visible="mpreviewVisible" :footer="null" @cancel="mhandleCancel">
      <img alt="example" style="width: 100%" :src="mpreviewImage" />
    </a-modal>
        </a-form-item>
        </a-col>
    </a-row>
    <a-row :gutter="16">
          <a-col :span="12">
        <a-form-item
          label="食用价值"
          v-bind="formItemLayout"
        >
         <a-textarea
          :rows="4"
            v-decorator="[
          'edibleValue',
          {
            initialValue:record.edibleValue,
            rules: [{
              required: true, message: '食用价值必须在0~200位内!',min:0,max:200
            }]
          }
        ]"
            style="width: 100%"
          >
          </a-textarea>
        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item
          label="食用价值图片"
          :required="true"
          v-bind="formItemLayout1"
        >
          <a-upload
      name="file"
      action="/api/pictureInfo/addEdibleValuePic"
      listType="picture-card"
      :fileList="efileList"
      @preview="ehandlePreview"
      :beforeUpload="beforeUpload"
      :headers="headers"
      @change="ehandleChange"
      :remove="removeepic"
    >
      <div v-if="efileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">食用价值图片</div>
      </div>
    </a-upload>
    <a-modal :visible="epreviewVisible" :footer="null" @cancel="ehandleCancel">
      <img alt="example" style="width: 100%" :src="epreviewImage" />
    </a-modal>
        </a-form-item>
        </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
        <a-form-item
          label="药用价值"
          v-bind="formItemLayout"
        >
        <a-textarea
          :rows="4"
            v-decorator="[
          'medicinalValue',
          {
            initialValue:record.medicinalValue,
            rules: [{
              required: true, message: '药用价值必须在0~200位内!',min:0,max:200
            }]
          }
        ]"
            style="width: 100%"
          >
          </a-textarea>

        </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item
          label="药用价值图片"
          :required="true"
          v-bind="formItemLayout1"
        >
         <a-upload
      name="file"
      action="/api/pictureInfo/addMedicinalValuePic"
      listType="picture-card"
      :fileList="yfileList"
      :beforeUpload="beforeUpload"
      @preview="yhandlePreview"
      :headers="headers"
      @change="yhandleChange"
      :remove="removeypic"
    >
      <div v-if="yfileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">药用价值图片</div>
      </div>
    </a-upload>
    <a-modal :visible="ypreviewVisible" :footer="null" @cancel="yhandleCancel">
      <img alt="example" style="width: 100%" :src="ypreviewImage" />
    </a-modal>
        </a-form-item>
        </a-col>
        </a-row>
        <a-button type="primary" icon="plus" @click="addcaishou">新增采收品</a-button>
      </a-form>
       <br/>
       <a-table :pagination="false" :columns="columns" :dataSource="data"  :rowKey="record=>record.key" bordered>
    <template slot="harvestedName" slot-scope="text, record">
        <a-input
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, 'harvestedName')"
        />
    </template>
     <template slot="type" slot-scope="text, record">
       <a-select
         style="width:100%;"
         :value="text"
         @change="e=> handleChange(e,record.key,'type')"
         >
              <a-select-option v-for="(v,k) in type" :value="v.code" :key="k">{{v.displayName}}</a-select-option>
      </a-select>
    </template>
     <template slot="describe" slot-scope="text, record">
       <a-input
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, 'describe')"
        />
    </template>
    <span slot="ation" slot-scope="text, record">
       <span><a href="javascript:;" @click="addcanchengpin(record)">产成品管理</a></span>
       <a-divider type="vertical" />
       <span><a-popconfirm title="删除后将无法恢复，确定删除吗？" @confirm="delcsp(record)" okText="确定" cancelText="取消">
          <a href="javascript:;">删除</a>
        </a-popconfirm></span> 
        
    </span>
     <!-- <span slot="ation" slot-scope="text, record">
        <a href="javascript:;" @click="addcanchengpin(record)">添加产成品</a>
        <a-popconfirm title="删除后将无法恢复，确定删除吗？" @confirm="delcsp(record)" okText="确定" cancelText="取消">
          <a href="javascript:;">删除采收品</a>
        </a-popconfirm>
    </span> -->
  </a-table>
   <a-modal
      title="添加产成品"
      v-model="visible2"
      @ok="handleOk2"
      okText="确定"
      cancelText="取消"
      style="min-width:700px;"
      :maskClosable="false"
      >
      <a-button style="margin-bottom:10px;" type="primary" icon="plus" @click="addcanchen">新增产成品</a-button>
       <a-table :pagination="false"  :columns="columns1" :dataSource="data1"  :rowKey="record=>record.id" bordered>
    <template v-for="col in ['productName', 'level','describe']" :slot="col" slot-scope="text, record">
      <div :key="col">
        <a-input
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange1(e.target.value, record.id, col)"
        />
      </div>
    </template>
     <span slot="ation1" slot-scope="text, record">
          <a href="javascript:;" @click="delccp(record.id)">删除</a>
    </span>
  </a-table>
       </a-modal>
    </a-modal>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { editCrop,delPic,getPucType,delCsp } from '@/api/ddwbApi'

export default {
  data(){
    return{
      columns:[{
  title:()=>{
          return(
            <div>
              <span style='color:red;margin-right:5px'>*</span>
              <span>采收品名称</span>
            </div>
          )
        },
  key:'harvestedName',
  dataIndex: 'harvestedName',
  width: '20%',
  scopedSlots: { customRender: 'harvestedName' },
}, {
  title:()=>{
          return(
            <div>
              <span style='color:red;margin-right:5px'>*</span>
              <span>采收品类型</span>
            </div>
          )
        },
  key:'type',
  dataIndex: 'type',
  width: '20%',
  scopedSlots: { customRender: 'type' },
}, {
  title: '采收品描述',
  key:'describe',
  dataIndex: 'describe',
  width: '30%',
  scopedSlots: { customRender: 'describe' },
}, {
  title:'操作',
  key:'ation',
  dataIndex:'ation',
  align:'center',
  width:'30%',
  scopedSlots:{ customRender: 'ation' },
}],
      data:[],
      columns1:[{
  title:()=>{
          return(
            <div>
              <span style='color:red;margin-right:5px'>*</span>
              <span>产成品名称</span>
            </div>
          )
        },
  key:'productName',
  dataIndex: 'productName',
  width: '25%',
  scopedSlots: { customRender: 'productName' },
}, {
  title:()=>{
          return(
            <div>
              <span style='color:red;margin-right:5px'>*</span>
              <span>产成品等级</span>
            </div>
          )
        },
  key:'level',
  dataIndex: 'level',
  width: '25%',
  scopedSlots: { customRender: 'level' },
}, {
  title: '产成品描述',
  key:'describe',
  dataIndex: 'describe',
  width: '40%',
  scopedSlots: { customRender: 'describe' },
}, {
  title:'操作',
  key:'ation1',
  dataIndex:'ation1',
  width:'10%',
  scopedSlots:{ customRender: 'ation1' },
}],
      data1:[],
      dataindex:0,
      dataindex1:0,
      nowcaishoupingid:'',
      visible1:false,
      visible2:false,
       cropPic:'',
       ediblePic:'',
       medicinalPic:'',
       visible:false,
       confirmLoading:false,
       mfileList:[],
       mpreviewVisible:false,
       mpreviewImage:'',
       efileList:[],
       epreviewVisible:false,
       epreviewImage:'',
       yfileList:[],
       ypreviewVisible:false,
       ypreviewImage:'',
       headers:{},
       formItemLayout: {
        labelCol: {
          xs: { span: 24},
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      formItemLayout1: {
        labelCol: {
          xs: { span: 24},
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      form: this.$form.createForm(this),
      type:[],
      record:{},
      newpic:[],
    }
  },
  created(){
    const token = Vue.ls.get(ACCESS_TOKEN);
    this.headers = {"X-Access-Token":token};
    getPucType().then(res=>{
      if(res.success){
        this.type=res.result;
      }
    })
  },
  mounted() {

  },
  methods:{
    delccp(id){
      let bb=[];
      for(let i=0;i<this.data1.length;i++){
        if(this.data1[i].id!=id){
          bb.push(this.data1[i]);
        }
      }
      this.data1=bb;
    },
    delcsp(record){
      if(record.id!==undefined){
        delCsp({id:record.id}).then(res=>{
          if(res.success){
            this.$message.success("删除成功！");
            let aa=[];
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].id!=record.id){
                aa.push(this.data[i]);
              }
            }
            this.data=aa;
          }else{
            this.$message.warning("无法删除！");
          }
        })
      }else{
      let bb=[];
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].key!=record.key){
          bb.push(this.data[i]);
        }
      }
      this.data=bb;
      }
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
     handleChange1 (value, key, column) {
      const newData1 = [...this.data1]
      const target1 = newData1.filter(item => key === item.id)[0]
      if (target1) {
        target1[column] = value
        this.data1 = newData1
      }
    },
    handleOk2(){
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].id==this.nowcaishoupingid){
          this.data[i].cropProductList=this.data1;
        }
      }
       this.visible2=false;
    },
    mhandlePreview(file){
      this.mpreviewImage = file.url || file.thumbUrl
      this.mpreviewVisible = true
    },
    mhandleChange(info){
      if(info.file.status === 'uploading'){
        this.mfileList=info.fileList;
        return
      }
      if (info.file.status === 'done') {
        this.newpic.push(info.file.response.result.id);
        this.cropPic=info.file.response.result.id
      }
    },
    removempic(file){
      let delid='';
       if(this.cropPic){
         delid=this.cropPic;
          let a=this.newpic.indexOf(delid);
         delete this.newpic[a];
       }else{
         delid=file.uid;
       }
       delPic({id:delid}).then(res=>{
         if(res.success){
           this.$message.success(res.message);
            this.cropPic='';
            this.mfileList=[];
            this.$parent.loadData();
         }
       })
       return true;
    },
    mhandleCancel(){
       this.mpreviewVisible = false;
    },
     ehandlePreview(file){
      this.epreviewImage = file.url || file.thumbUrl
      this.epreviewVisible = true
    },
    ehandleChange(info){
      if(info.file.status === 'uploading'){
        this.efileList=info.fileList;
        return
      }
      if (info.file.status === 'done') {
        this.newpic.push(info.file.response.result.id);
        this.ediblePic=info.file.response.result.id
      }
    },
    removeepic(file){
       let delid='';
       if(this.ediblePic){
         delid=this.ediblePic;
          let a=this.newpic.indexOf(delid);
         delete this.newpic[a];
       }else{
         delid=file.uid;
       }
       delPic({id:delid}).then(res=>{
         if(res.success){
           this.$message.success(res.message);
            this.ediblePic='';
            this.efileList=[];
            this.$parent.loadData();
         }
       })
       return true;
    },
    ehandleCancel(){
       this.epreviewVisible = false;
    },

    yhandlePreview(file){
      this.ypreviewImage = file.url || file.thumbUrl
      this.ypreviewVisible = true
    },
    yhandleChange(info){
      if(info.file.status === 'uploading'){
        this.yfileList=info.fileList;
        return
      }
      if (info.file.status === 'done') {
        this.newpic.push(info.file.response.result.id);
        this.medicinalPic=info.file.response.result.id
      }
    },
    removeypic(file){
       let delid='';
       if(this.medicinalPic){
         delid=this.medicinalPic;
          let a=this.newpic.indexOf(delid);
         delete this.newpic[a];
       }else{
         delid=file.uid;
       }
       delPic({id:delid}).then(res=>{
         if(res.success){
           this.$message.success(res.message);
            this.medicinalPic='';
            this.yfileList=[];
            this.$parent.loadData();
         }
       })
       return true;
    },
    yhandleCancel(){
       this.ypreviewVisible = false;
    },
    // delAllPic(){
    //   if(this.cropPic){
    //      delPic({id:this.cropPic}).then(res=>{
    //      if(res.success){
    //        this.cropPic='';
    //      }
    //    })
    //   }
    // },
     delNewPic(){
       this.$parent.loadData();
      for(let a=0;a<this.newpic.length;a++){
        if(this.newpic[a]){
        delPic({id:this.newpic[a]}).then(res=>{});
        }
      }
    },
    beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        if (!(isPNG||isJPG)) {
          this.$message.error('只允许上传jpg/png格式图片')
        }
        const isLt5M = file.size / 1024 / 1024 < 5
        if (!isLt5M) {
          this.$message.error('图片大小不能大于5M')
        }
        return (isJPG || isPNG) && isLt5M
    },
    addcaishou(){
      this.data.push({key:this.dataindex});
      this.dataindex++;
    },
    addcanchen(){
          this.data1.push({id:this.dataindex1});
          this.dataindex1++;
    },
    addcanchengpin(record){
        this.nowcaishoupingid=record.id;
        if(record.cropProductList.length>0){
          let aalist=[];
          for(let i=0;i<record.cropProductList.length;i++){
            aalist.push(record.cropProductList[i].id);
          }
          this.dataindex1=Math.max.apply(null, aalist)+1;
          this.data1=record.cropProductList;
        }else{
          this.dataindex1=0;
          this.data1=[];
        }
        this.visible2=true;
    },

    edit(record){
      this.newpic=[];
      this.form.resetFields();
      this.record={};
      this.record=record;
      this.data=[];
      this.data=record.harvestedProductList;
      this.dataindex=0;
      // let aalist=[];
      for(let i=0;i<this.data.length;i++){
              this.data[i].type=this.data[i].type.code;
              this.data[i].key=this.dataindex;
              this.dataindex++;
              // aalist.push(this.data[i].key);
            }
      // this.dataindex=Math.max.apply(null, aalist)+1;
      this.mfileList=[];
      this.efileList=[];
      this.yfileList=[];
      this.cropPic='';
      this.ediblePic='';
      this.medicinalPic='';
       if(record.cropPic){
       let a={
        uid: record.cropPic.id,
        name: record.cropPic.pictureUrl,
        status: 'done',
        url: '/api/pictureInfo/show/'+record.cropPic.pictureUrl,
      };
       this.mfileList.push(a);
       this.cropPic='';
       }else{
         this.cropPic='';
       }
       if(record.ediblePic){
       let a={
        uid: record.ediblePic.id,
        name: record.ediblePic.pictureUrl,
        status: 'done',
        url: '/api/pictureInfo/show/'+record.ediblePic.pictureUrl,
      };
       this.efileList.push(a);
       this.ediblePic='';
       }else{
         this.ediblePic='';
       }
        if(record.medicinalPic){
       let a={
        uid: record.medicinalPic.id,
        name: record.medicinalPic.pictureUrl,
        status: 'done',
        url: '/api/pictureInfo/show/'+record.medicinalPic.pictureUrl,
      };
       this.yfileList.push(a);
       this.medicinalPic='';
       }else{
         this.medicinalPic='';
       }
      this.visible=true;
    },
    handleOk(){
        this.form.validateFields((err, values) => {
          if(!err){
            let par = values;
            if(this.cropPic){
            par.cropPic={id:this.cropPic};
            }
            else{
              par.cropPic=null;
            }
            if(this.ediblePic){
            par.ediblePic={id:this.ediblePic};
            }else{
              par.ediblePic=null
            }
            if(this.medicinalPic){
            par.medicinalPic={id:this.medicinalPic};
            }else{
              par.medicinalPic=null;
            }
            par.harvestedProductList=this.data;
            par.id=this.record.id;
            editCrop(par).then(res=>{
              if(res.success){
                this.$message.success(res.message);
                this.$parent.loadData();
                this.visible=false;
              }else{
                this.$message.warning(res.message);
              }
            })
          }
        });
    },
  },
}
</script>
<style scoped>
.all_1{
  width:100%;
  overflow-y: auto;
}
</style>
