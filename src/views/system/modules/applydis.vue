<template>
  <a-modal :title="title" v-model="visible"  style="top:5%;height: 90%"
           :maskClosable="false" class="standard-modal" @ok="handleOk">
      <div style="width: 100%">
        <a-table
          :columns="disLists"
          :dataSource="disDatas"
          :pagination="disination"
          :loading="loading"
          :rowKey="(record) => record.id"
          bordered
          @change="changeTable"
          style="max-width: 100%"
        >
                    <span slot="action" slot-scope="text, record">
                            <a v-if="!isshow(record)" @click="handleEdit(record)">查看</a>
                            <a v-if="isshow(record)" @click="handleEdit(record)">处理</a>
                    </span>
        </a-table>
        <applyover ref="applyover" @fatherMethod="fatherMethod"></applyover>
      </div>
  </a-modal>
</template>
<script>
  import {getOrderApply} from '@/api/permissonApi'
  import applyover from '@/views/system/modules/applyover.vue'

  export default {
    components: {
      applyover
    },
    data() {
      return {
        status:'',
        ids:'',
        loading:false,
        pageSize: null,
        pageNo: null,
        visible: false,
        title: '',
        disLists: [
          {
            title: '申请人',
            dataIndex: 'user.realName',
            key: 'user.realName'
          },
          {
            title: '申请时间',
            dataIndex: 'subTime',
            key: 'subTime'
          },
          {
            title: '申请内容',
            dataIndex: 'applyContent',
            key: 'applyContent'
          },
          {
            title: '状态',
            dataIndex: 'agree.displayName',
            key: 'agree.displayName'
          },
          {
            title: '操作',
            dataIndex: "action",
            key: "action",
            scopedSlots: { customRender: "action" },
            align: "center"
          }
        ],
        disDatas:[],
        disination: {
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total, range) => {
            return range[0] + "-" + range[1] + " 共" + total + "条";
          },
          showQuickJumper: true,
          showSizeChanger: true,
        },
      }
    },
    created() {
    },
    methods: {
      open(ids,status) {
        this.visible = true;
        this.ids = ids;
        this.status = status;
        this._loadData(ids,this.status);
      },
      _loadData(ids,status){
        let params={}
        params.status = this.status;
        params.pageNo = this.pageNo
        params.pageSize = this.pageSize
        params.orderId = ids
        this.loading = true
        getOrderApply(params).then(res => {
          if (res.success) {
            this.disDatas = res.result.list
            this.$set(this.disination, 'total', res.result.total)
            this.$set(this.disination, 'pageSize', res.result.pageSize)
            this.$set(this.disination, 'current', res.result.pageNum)
          }
          this.loading = false
        })
      },
      handleOk() {
        this.visible = false;
        this.$emit('fatherMethod');
      },
      changeTable(page) {
        this.pageSize = page.pageSize
        this.pageNo = page.current
        this._loadData()
      },
      handleEdit(record){
        if (record.agree.displayName === '未处理') {
          this.$refs.applyover.cancelText = '不同意',
          this.$refs.applyover.okText = '同意'
          this.$refs.applyover.lock = false
          this.$refs.applyover.title = '申请信息处理'
        } else {
          this.$refs.applyover.title = '查看'
          this.$refs.applyover.lock = true
        }
        this.$refs.applyover.open(record)
      },
      isshow(record){
        if(record.agree.displayName=='未处理'){
          return true
        }
        return false
      },
      fatherMethod(){
        this._loadData(this.ids);
      }
    }
  }
</script>
<style lang="stylus">
  .standard-modal
    width: 900px !important

    .form-wrapper
      width 45%
      display inline-block

      .ant-form-item
        width 100%
        display inline-block

        .ant-form-item-control-wrapper
          width 60%
          display inline-block

        .ant-form-item-label
          width 150px
          vertical-align top

  .ant-input-number
    width: 200px

  .ant-modal-body
    padding: 12px

  .tab-box01 /deep/ .ant-form-item
    margin-bottom: 5px;

  .standard-modal /deep/ .ant-modal-body
    overflow-y: inherit;
    max-height 517px !important;

  .standard-modal /deep/ .ant-btn-default
    display: none
</style>
