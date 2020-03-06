<template>
    <div class="total-wrapper">
        <div style="margin: 0 0 16px 0;">
            <a-button
                type="primary"
                icon="plus"
                @click="addContract"
            >
                添加合同
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
                    <a-popconfirm title="确定删除么" @confirm='deleteData(record)'>
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <div class="modal-wrapper">
            <laborDispatchModal @refreshYear='refreshYear' :curYear='curYear' ref="laborDispatchModal"></laborDispatchModal>
        </div>
    </div>
</template>
<script>
import laborDispatchModal from './laborDispatchModal'
import {getLaborDispatch,deleteLaborDispatch} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    components: {
        laborDispatchModal
    },
    mixins: [contractTableMixin],
    data() {
        return {
            dataColumns: [
                {
                    title: '供方',
                    dataIndex: 'partyA',
                    key: 'partyA'
                },
                {
                    title: '需方',
                    dataIndex: 'partyB',
                    key: 'partyB'
                },
                {
                    title: '派遣时间',
                    dataIndex: 'dispatchTime',
                    key: 'dispatchTime'
                },
                {
                    title: '派遣数量（人）',
                    dataIndex: 'total',
                    key: 'total'
                },
                {
                    title: '派遣月数',
                    dataIndex: 'dispatchMonth',
                    key: 'dispatchMonth'
                },
                {
                    title: '平均月工资',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '签订时间',
                    dataIndex: 'signTime',
                    key: 'signTime'
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
            getLaborDispatch({
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
            this.$refs.laborDispatchModal.open()
        },
        editData(record) {
            this.$refs.laborDispatchModal.open(record)
        },
        deleteData(record) {
            deleteLaborDispatch({
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