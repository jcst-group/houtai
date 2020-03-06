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
                    <a @click="peyDetails(record)">交付情况</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定删除么？" @confirm='deleteData(record)'>
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <div class="modal-wrapper">
            <fertilizerPurchaseModal :curYear='curYear' ref="fertilizerPurchaseModal"></fertilizerPurchaseModal>
        </div>
        <div class="modal-wrapper">
            <payDetailsModal @refreshYear='refreshYear' ref="payDetailsModal"></payDetailsModal>
        </div>
    </div>
</template>
<script>
import fertilizerPurchaseModal from './fertilizerPurchaseModal'
import payDetailsModal from './payDetailsModal'
import {getFertilizerPurchase,deleteFertilizerPurchase} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    components: {
        fertilizerPurchaseModal,
        payDetailsModal
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
                    title: '肥料名称',
                    dataIndex: 'materialName',
                    key: 'materialName'
                },
                {
                    title: '总量(kg)',
                    dataIndex: 'total',
                    key: 'total'
                },
                {
                    title: '价格(元/kg)',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '签订时间',
                    dataIndex: 'signTime',
                    key: 'signTime'
                },
                // {
                //     title: '交付数量',
                //     dataIndex: 'payNum',
                //     key: 'payNum'
                // },
                // {
                //     title: '交付时间',
                //     dataIndex: 'payTime',
                //     key: 'payTime'
                // },
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
            getFertilizerPurchase({
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
            this.$refs.fertilizerPurchaseModal.open()
        },
        editData(record) {
            this.$refs.fertilizerPurchaseModal.open(record)
        },
        deleteData(record) {
            deleteFertilizerPurchase({
                id: record.id
            }).then(res => {
                this.$message.info(res.message)
                if (res.success) {
                    this._loadData()
                }
            })
        },
        peyDetails(record) {
            this.$refs.payDetailsModal.open(record)
        }
    },
}
</script>
<style lang="stylus" scoped>

</style>