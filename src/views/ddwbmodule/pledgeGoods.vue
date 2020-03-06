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
            <pledgeGoodsModal @refreshYear='refreshYear' :curYear='curYear' ref="pledgeGoodsModal"></pledgeGoodsModal>
        </div>
    </div>
</template>
<script>
import pledgeGoodsModal from './pledgeGoodsModal'
import {getPledgeGoods,deletePledgeGoods} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    components: {
        pledgeGoodsModal
    },
    mixins: [contractTableMixin],
    data() {
        return {
            dataColumns: [
                {
                    title: '甲方',
                    dataIndex: 'baseInfo.baseName',
                    key: 'baseInfo.baseName'
                },
                {
                    title: '乙方',
                    dataIndex: 'partyB',
                    key: 'partyB'
                },
                {
                    title: '丙方',
                    dataIndex: 'partyC',
                    key: 'partyC'
                },
                {
                    title: '抵押数量(kg)',
                    dataIndex: 'pledgeNum',
                    key: 'pledgeNum'
                },
                {
                    title: '货物价格',
                    dataIndex: 'goodPrice',
                    key: 'goodPrice'
                },
                {
                    title: '总价值(元)',
                    dataIndex: 'totalValue',
                    key: 'totalValue'
                },
                {
                    title: '借款金额',
                    dataIndex: 'loanAmount',
                    key: 'loanAmount'
                },
                {
                    title: '借款月利率(‰)',
                    dataIndex: 'exchangeRate',
                    key: 'exchangeRate'
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
            getPledgeGoods({
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
            this.$refs.pledgeGoodsModal.open()
        },
        changeTable(page) {
            this.pageNo = page.current
            this.pageSize = page.pageSize
            this._loadData()
        },
        editData(record) {
            this.$refs.pledgeGoodsModal.open(record)
        },
        deleteData(record) {
            deletePledgeGoods({
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