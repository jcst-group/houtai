<template>
    <div class="total-wrapper">
        <div style="margin: 0 0 16px 0;">
            <a-button
                type="primary"
                icon="plus"
                @click="addContract"
            >
                添加协议
            </a-button>
        </div>
        <div class="table-wrapper">
            <a-table
                :columns="dataColumns"
                :dataSource="dataSource"
                :pagination="pagination"
                :loading="loading"
                rowKey="id"
                bordered
                @change="changeTable">
                <span slot="action" slot-scope="text, record">
                    <a @click="editData(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确认删除么？" @confirm='deleteData(record)'>
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <div class="modal-wrapper">
            <standardPlanModal @refreshYear='refreshYear' :curYear='curYear' ref="standardPlanModal"></standardPlanModal>
        </div>
    </div>
</template>
<script>
import standardPlanModal from './standardPlanModal'
import {getStandardPlan,deleteStandardPlan} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    mixins: [contractTableMixin],
    components: {
        standardPlanModal
    },
    data() {
        return {
            dataColumns: [
                {
                    title: '甲方',
                    dataIndex: 'partyA',
                    key: 'partyA'
                },
                {
                    title: '乙方',
                    dataIndex: 'baseInfo.baseName',
                    key: 'baseInfo.baseName'
                },
                {
                    title: '土地面积(亩)',
                    dataIndex: 'acreage',
                    key: 'acreage'
                },
                {
                    title: '农资投入品标准（元/亩）',
                    dataIndex: 'investMu',
                    key: 'investMu'
                },
                {
                    title: '签订时间',
                    dataIndex: 'signTime',
                    key: 'signTime'
                },
                {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    key: 'startTime'
                },
                {
                    title: '结束时间',
                    dataIndex: 'endTime',
                    key: 'endTime'
                },
                {
                    title: '操作',
                    dataIndex: "action",
                    key: "action",
                    scopedSlots: { customRender: "action" },
                    align: "center"
                }
            ]
        }
    },
    methods: {
        _loadData() {
            let yearId = this.curYear
            this.loading = true
            getStandardPlan({
                yearId: yearId,
                pageNo: this.pageNo,
                pageSize: this.pageSize
            }).then(res => {
                if (res.success) {
                    this.dataSource = res.result.list
                    this.$set(this.pagination, 'total', res.result.total)
                    this.$set(this.pagination, 'pageSize', res.result.pageSize)
                    this.$set(this.pagination, 'current', res.result.pageNum)
                }
                this.loading = false
            })
        },
        addContract() {
            this.$refs.standardPlanModal.open()
        },
        editData(record) {
            this.$refs.standardPlanModal.open(record)
        },
        deleteData(record) {
            deleteStandardPlan({
                id: record.id
            }).then(res => {
                this.$message.info(res.message)
                if (res.success) {
                    this._loadData()
                }
            })
        }
    },
}
</script>
<style lang="stylus" scoped>

</style>