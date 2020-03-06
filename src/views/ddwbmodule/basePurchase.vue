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
                <span slot="price" slot-scope="text">
                    {{text ? text : '实时市场价格'}}
                </span>
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
            <basePurchaseModal @refreshYear='refreshYear' :curYear='curYear' ref="basePurchaseModal"></basePurchaseModal>
        </div>
    </div>
</template>
<script>
import basePurchaseModal from './basePurchaseModal'
import {getBasePurchase,deleteBasePurchase} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    components: {
        basePurchaseModal
    },
    mixins: [contractTableMixin],
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
                    title: '签订时间',
                    dataIndex: 'signTime',
                    key: 'signTime'
                },
                {
                    title: '交付产品',
                    dataIndex: 'payPro',
                    key: 'payPro'
                },
                {
                    title: '交付面积(亩)',
                    dataIndex: 'payAcreage',
                    key: 'payAcreage'
                },
                {
                    title: '交付时间',
                    dataIndex: 'payTime',
                    key: 'payTime'
                },
                {
                    title: '价格(元/公斤)',
                    dataIndex: 'price',
                    scopedSlots: { customRender: "price" },
                    key: 'price'
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
            getBasePurchase({
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
            this.$refs.basePurchaseModal.open()
        },
        editData(record) {
            this.$refs.basePurchaseModal.open(record)
        },
        deleteData(record) {
            deleteBasePurchase({
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