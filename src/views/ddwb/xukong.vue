<template>
    <div>
        <a-tabs @change="callback" type="card" style="overflow:inherit">
            <a-tab-pane tab="工单审核" key="1">
                <div style="width: 100%">
                    <a-table
                    :columns="overviewColumns"
                    :dataSource="workDatas"
                    :pagination="pagination"
                    :loading="loading"
                    :rowKey="(record) => record.id"
                    bordered
                    @change="changeTable"
                    style="max-width: 100%"
                    >
                        <span slot="role" slot-scope="text, record">
                            <span v-for="item in record.roleList" :key="item.id" style="margin-right : 5px">
                                <a-tag color='blue'>{{item.name}}</a-tag>
                            </span>
                        </span>
                        <span slot="user" slot-scope="text, record">
                            <span style="margin-right : 5px">
                                {{record.user ? record.user.userName : ''}}
                            </span>
                        </span>
                        <span slot="allowedExecute" slot-scope="text, record">
                            <a-switch @change="val => changeWork(val, record)" :defaultChecked='record.allowedExecute'></a-switch>
                        </span>
                        <span slot="action" slot-scope="text, record">
                            <a @click="handleEdit(record)">审核</a>
                        </span>
                    </a-table>
                </div>
                <examine ref="examine" @fatherMethod="fatherMethods"></examine>
            </a-tab-pane>
            <a-tab-pane tab="工单申请处理" key="2">
              <div style="width: 100%">
                <a-form :form='form'>
                  <div class="search-wrapper" style="display:block">
                    <span style="line-height:40px;margin-right:5px">审核状态：</span>
                    <a-form-item style="display:inline-block">
                      <a-radio-group
                        @change="() => {this.$nextTick(_loadapplyData)}"
                        v-decorator="['status', {
                            initialValue: 'undispose'
                        }]">
                        <a-radio
                          v-for="item in statusDatas"
                          :key="item.value"
                          :value="item.code">
                          {{item.displayName}}
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </a-form>
                <a-table
                  :columns="applyLists"
                  :dataSource="applyDatas"
                  :pagination="applypagination"
                  :loading="loadingapply"
                  :rowKey="(record) => record.id"
                  bordered
                  @change="applychangeTable"
                  style="max-width: 100%"
                >
                    <span slot="action" slot-scope="text, record">
                         <a  @click="applyhandleEdit(record)">处理</a>
                    </span>
                  </a-table>
              </div>
              <applydis ref="applydis" @fatherMethod="fatherMethod"></applydis>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import { getAllWorklist,getOrderByApply,updateAllowedExecute } from '@/api/permissonApi'
import examine from '@/views/system/modules/examine.vue'
import applydis from '@/views/system/modules/applydis.vue'
export default {
    name: 'waitHandle',
    components:{
        examine,
        applydis

    },
    data(){
        return{
            status:'',
            statusDatas: [{
              value: -1,
              displayName: '全部',
              code:''
            },{
              value: 0,
              displayName: '未处理',
              code:'undispose'
            },{
              value:1,
              displayName: '已处理',
              code:'dispose'
            }],
            form: this.$form.createForm(this),
            loading:false,
            loadingapply:false,
            pageSize: null,
            pageNo: null,
            applypageSize: null,
            applypageNo: null,
            workDatas:[],
            applyDatas:[],
            overviewColumns: [
            {
              title: '计划执行日期',
              dataIndex: 'executionTime',
              key: 'executionTime'
            },
            {
              title: '实际执行日期',
              dataIndex: 'subTime',
              key: 'subTime'
            },
            {
              title: '节气',
              dataIndex: 'solarTerm.displayName',
              key: 'solarTerm.displayName'
            },
            {
              title: '种植批次',
              dataIndex: 'cropBatch.batchName',
              key: 'cropBatch.batchName'
            },
            {
              title: '农事名称',
              dataIndex: 'farmingItem.farmingName',
              key: 'farmingItem.farmingName'
            },
            {
              title: '对应角色',
              dataIndex: 'role',
              key: 'role',
              scopedSlots: { customRender: "role" },
              width: 300
            },
            {
              title: '执行人员',
              dataIndex: 'user.realName',
              key: 'user.realName'
            },
            {
              title: '工单类型',
              dataIndex: 'type.displayName',
              key: 'type.displayName'
            },
            {
              title: '审核状态',
              dataIndex: 'status.displayName',
              key: 'status.displayName'
            },
            {
              title: '允许时间外执行',
              dataIndex: "allowedExecute",
              key: "allowedExecute",
              scopedSlots: { customRender: "allowedExecute" },
              align: "center"
            },
            {
              title: '操作',
              dataIndex: "action",
              key: "action",
              scopedSlots: { customRender: "action" },
              align: "center"
            }
          ],
          applyLists: [
            {
              title: '种植批次',
              dataIndex: 'batchName',
              key: 'batchName'
            },
            {
              title: '农事名称',
              dataIndex: 'farmingName',
              key: 'farmingName'
            },
            {
              title: '计划开始时间',
              dataIndex: 'executionTime',
              key: 'executionTime'
            },
            {
              title: '计划结束时间',
              dataIndex: 'endTime',
              key: 'endTime'
            },
            {
              title: '工单状态',
              dataIndex: 'status.displayName',
              key: 'status.displayName'
            },
            {
              title: '操作',
              dataIndex: "action",
              key: "action",
              scopedSlots: { customRender: "action" },
              align: "center"
            }
          ],
            pagination: {
                pageSizeOptions: ["10", "20", "50"],
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条";
                },
                showQuickJumper: true,
                showSizeChanger: true,
            },
            applypagination: {
              pageSizeOptions: ["10", "20", "50"],
              showTotal: (total, range) => {
                return range[0] + "-" + range[1] + " 共" + total + "条";
              },
              showQuickJumper: true,
              showSizeChanger: true,
            },
        }
    },
    created(){
        this._loadData();
        this._loadapplyData('undispose');
    },
    methods:{
        changeWork(val, record) {
          updateAllowedExecute({
            id: record.id,
            allowedExecute: val
          }).then(res => {
            this.$message.info(res.message)
          })
        },
        changeTable(page) {
            this.pageSize = page.pageSize
            this.pageNo = page.current
            this._loadData()
        },
        applychangeTable(page) {
          this.applypageSize = page.pageSize
          this.applypageNo = page.current
          this._loadapplyData()
        },
         _loadData() {
            let params={}
            params.pageNo = this.pageNo
            params.pageSize = this.pageSize
            params.status='NOT_AUDITED'
            this.loading = true
            getAllWorklist(params).then(res => {
                if (res.success) {
                    this.workDatas = res.result.list
                    this.$set(this.pagination, 'total', res.result.total)
                    this.$set(this.pagination, 'pageSize', res.result.pageSize)
                    this.$set(this.pagination, 'current', res.result.pageNum)
                }
                this.loading = false
            })
        },
        _loadapplyData(status){
          this.loadingapply = true
          let applyparams = this.form.getFieldsValue()
          if(status=='undispose'){
            applyparams.status = 'undispose'
          }
          this.status = applyparams.status
          applyparams.pageNo = this.applypageNo
          applyparams.pageSize = this.applypageSize
          getOrderByApply(applyparams).then(res => {
            if (res.success) {
              this.applyDatas = res.result.list
              this.$set(this.applypagination, 'total', res.result.total)
              this.$set(this.applypagination, 'pageSize', res.result.pageSize)
              this.$set(this.applypagination, 'current', res.result.pageNum)
            }
            this.loadingapply = false
          })
        },
        handleEdit(record) {
            if (record.status.displayName === '待审核') {
                this.$refs.examine.title = '审核',
                this.$refs.examine.cancelText = '审核不通过',
                this.$refs.examine.okText = '审核通过'
                this.$refs.examine.lock = false
            } else if (record.status.displayName === '审核已通过') {
                this.$refs.examine.title = '查看详情'
                this.$refs.examine.cancelText = '关闭',
                this.$refs.examine.okText = '退回审核'
                this.$refs.examine.lock = false
            } else {
                this.$refs.examine.title = '查看'
                this.$refs.examine.lock = true
            }
            this.$refs.examine.visible = true
            this.$refs.examine.open(record)
        },
        applyhandleEdit(record) {
          this.$refs.applydis.title = '申请记录'
          this.$refs.applydis.open(record.id,this.status)
        },
        callback(key) {

        },
        fatherMethod(){
          this.$store.dispatch('user/getapplyNumber');
          this._loadapplyData();
        },
        fatherMethods(){
          this.$store.dispatch('user/getapplyNumber');
          this._loadData();
        },
    }
}
</script>
<style scoped>

</style>
