<template>
  <a-modal
    width=41%
    v-model="visible"
    :title="title"
    ref="modal"
    :maskClosable="false"
    style="position: relative;min-width:900px"
    class="examine-modal"
  >
    <div class="flex-wrapper">
      <div class="title">
        <span>申请内容：</span>
      </div>
      <div class="order-content">
        <span class="order-desc">{{orderContent}}</span>
      </div>
    </div>
    <div class="flex-wrapper">
      <div class="title">
        <span>语音备注：</span>
      </div>
      <audio v-if="visible" controls='controls' ref="audio" style="vertical-align: top; margin-right: 30px"></audio>
    </div>
    <div class="flex-wrapper">
      <div class="title">
        <span>审批备注：</span>
      </div>
      <div class="order-content" v-if="remark!=null" style="text-align: left">
        <span class="order-desc">{{remark}}</span>
      </div>
      <div class="desc" v-if="remark==null">
        <a-textarea placeholder="审批备注" v-model="desc" :autosize='{minRows: 2, maxRows: 6}'/>
      </div>
    </div>
    <div slot='footer'>
      <a-button v-if="!lock" @click="handelCancel" style="background:#d9534f;color:#fff;border-color:#d9534f">{{cancelText}}</a-button>
      <a-button v-if="!lock" @click="handleOk" style="background:#1ABC9C;color:#fff;border-color:#1ABC9C">{{okText}}</a-button>
    </div>
  </a-modal>
</template>

<script>
  import {updateOrderApply} from '@/api/permissonApi'
  export default {
    data() {
      return {
        visible: false,
        lock:false,
        imgModal: false,
        title: '111',
        curUrl: '',
        okText: '',
        desc: '',
        cancelText: '',
        record: {},
        materialDatas: [],
        deviceDatas: [],
        personDatas: [],
        imgDatas: [],
        spinning:false,
        islookmap:false,
        mapinfo:{},
        map:null,
        basemarker:null,
        polygons:[],
        orderContent:'',
        datas:{},
        remark:null,
      }
    },
    methods: {
      open(record) {
        this.visible = true;
        this.islookmap=false;
        this.curUrl = ''
        this.record = record
        this.remark = this.record.remark
        this.desc = record.remark ? record.remark : ''
        this.orderContent = record.applyContent
        if (record.fileInfo && record.fileInfo !== null) {
          this.$nextTick(() => {
            this.$refs.audio.src = '/api/fileInfo/getAudio' + (!record.fileInfo ? '' : '?fileUrl=' + record.fileInfo.fileUrl)
          })
        }
      },
      handleOk() {
        let that = this;
        this.datas = {
          id: this.record.id,
          orderId: this.record.orderId,
          remark: this.desc,
          agree: 'Agree'
        }
        if (this.title === '申请信息处理') {
          updateOrderApply(this.datas).then(res => {
            that.$message.info(res.message)
            that.$emit('fatherMethod');
          })
        }
        this.desc = ''
        this.visible = false
      },
      handelCancel() {
        let that = this;
        this.islookmap = false
        this.datas = {
          id: this.record.id,
          orderId: this.record.orderId,
          remark: this.desc,
          agree: 'Disagree'
        }
        if (this.title === '申请信息处理') {
          updateOrderApply(this.datas).then(res => {
            that.$message.info(res.message)
            that.$emit('fatherMethod');
          })
        }
        this.desc = ''
        this.visible = false
      },
      handleImgCancel() {
        this.imgModal = false
        this.curUrl = ''
      }
    }
  }
</script>
<style scoped>
  #container >>> .amap-info-content {
    background-color:rgba(35, 35, 35, 0.6);
    border-radius:10px 10px;
    box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 10px;
  }
  #container >>> .amap-info-sharp{
    border-top: 8px solid rgba(35, 35, 35, 0.6);
  }
</style>
<style lang='stylus'>
  .examine-modal
    .flex-wrapper, .fater
      position relative
      text-align center
      display flex
      margin-bottom 30px
      .title
        font-size 20px
        width: 150px
        margin-right: 10px
        font-weight 600
        text-align left
        &::before
          content: " "
          display inline-block
          height 20px
          width 4px
          border-radius 2px
          background-color #2C909C
          margin-right 5px
          position relative
          top 3px
      #container
        width 400px
        height 300px
      .loading
        position absolute
        top 50%
        left 50%
      .order-content
        height 54px
        display inline-block
        .order-title
          font-size 20px
          font-weight 700
        .order-desc
          font-size 20px
          color #000
      .desc
        width 400px
      .btn-wrapper
        display inline-block
        margin-right 10px
        img
          width 100%
          height 100%
        .show-img
          position relative
          width 120px
          height 120px
          .img-mask
            position absolute
            top 0
            right 0
            left 0
            bottom 0
            background-color rgba(0, 0, 0, 0.5)
            opacity 0
            z-index 99
            transition all 0.3s
            i
              font-size 30px
              color rgba(255, 255, 255, 0.85)
              transform translate(-50%, -50%)
              position absolute
              top 50%
              left 50%
          &:hover
            .img-mask
              opacity 1
  .examine-body
    margin-bottom 30px
    .title
      font-size 20px
      width: 150px
      margin-right: 10px
      font-weight 600
      text-align left
      margin-bottom 10px
      &::before
        content: " "
        display inline-block
        height 20px
        width 4px
        border-radius 2px
        background-color #2C909C
        margin-right 5px
        position relative
        top 3px
</style>
