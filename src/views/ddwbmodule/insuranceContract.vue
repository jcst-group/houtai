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
            <insuranceContractModal @refreshYear='refreshYear' :curYear='curYear' ref="insuranceContractModal"></insuranceContractModal>
        </div>
    </div>
</template>
<script>
import insuranceContractModal from './insuranceContractModal'
import {getInsuranceContract,deleteInsuranceContract} from '@/api/ddwbApi'
import contractTableMixin from '@/mixins/contractTableMixin'
export default {
    components: {
        insuranceContractModal
    },
    mixins: [contractTableMixin],
    data() {
        return {
            dataColumns: [
                {
                    title: '保险公司',
                    dataIndex: 'insuranceCompany',
                    key: 'insuranceCompany'
                },
                {
                    title: '被保险基地',
                    dataIndex: 'baseInfo.baseName',
                    key: 'baseInfo.baseName'
                },
                {
                    title: '保险数量',
                    dataIndex: 'insuranceNum',
                    key: 'insuranceNum'
                },
                {
                    title: '单位保险金额',
                    dataIndex: 'unitInsuranceAmount',
                    key: 'unitInsuranceAmount'
                },
                {
                    title: '保险金额',
                    dataIndex: 'insuranceAmount',
                    key: 'insuranceAmount'
                },
                {
                    title: '保险费率(‰)',
                    dataIndex: 'premiumRate',
                    key: 'premiumRate'
                },
                {
                    title: '保险费',
                    dataIndex: 'insurancePremium',
                    key: 'insurancePremium'
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
            getInsuranceContract({
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
            this.$refs.insuranceContractModal.open()
        },
        editData(record) {
            this.$refs.insuranceContractModal.open(record)
        },
        deleteData(record) {
            deleteInsuranceContract({
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