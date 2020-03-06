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
                    <a-popconfirm title="确定删除么？" @confirm='deleteData(record)'>
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <div class="modal-wrapper">
            <orderContractModal @refreshYear='refreshYear' :curYear='curYear' ref="orderContractModal"></orderContractModal>
        </div>
    </div>
</template>
<script>
import orderContractModal from './orderContractModal'
import {getOrderContract,deleteOrderContract} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    components: {
        orderContractModal
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
                    title: '签订时间',
                    dataIndex: 'signTime',
                    key: 'signTime'
                },
                {
                    title: '产品',
                    dataIndex: 'product',
                    key: 'product'
                },
                {
                    title: '等级',
                    dataIndex: 'level',
                    key: 'level'
                },
                {
                    title: '价格(元/kg)',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '数量(kg)',
                    dataIndex: 'total',
                    key: 'total'
                },
                {
                    title: '金额',
                    dataIndex: 'totalMoney',
                    key: 'totalMoney'
                },
                {
                    title: '交货日期',
                    dataIndex: 'deliveryTime',
                    key: 'deliveryTime'
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
            getOrderContract({
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
            this.$refs.orderContractModal.open()
        },
        editData(record) {
            this.$refs.orderContractModal.open(record)
        },
        deleteData(record) {
            deleteOrderContract({
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