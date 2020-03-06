<template>
    <a-modal
        title="交付情况"
        v-model="visible"
        style="top:10%;height: 90%"
        :footer='null'
        :maskClosable="false"
        class="base-purchase">
        <div style="margin: 0 0 16px 0;">
            <a-button
                type="primary"
                icon="plus"
                @click="addPayDetails"
            >
                添加交付情况
            </a-button>
        </div>
        <div class="table-wrapper">
            <a-table
                :columns="dataColumns"
                :dataSource="dataSource"
                :pagination="false"
                :loading="loading"
                rowKey="id"
                bordered>
                <span slot="action" slot-scope="text, record">
                    <a @click="editData(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定删除么？" @confirm='deleteData(record)'>
                        <a>删除</a>
                    </a-popconfirm>
                </span>
            </a-table>
        </div>
        <addPayDetails @changeDetails='_loadData()' :fertilizerId='record.id' ref="addPayDetails"></addPayDetails>
    </a-modal>
</template>
<script>
import addPayDetails from './addPayDetails'
import {getFertilizerDeliver,deleteFertilizerDeliver} from '@/api/ddwbApi'
export default {
    components: {
        addPayDetails
    },
    data() {
        return {
            visible: false,
            dataSource: [],
            loading: false,
            record: {},
            dataColumns: [
                {
                    title: '交付数量',
                    dataIndex: 'payNum',
                    key: 'payNum'
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    key: 'price'
                },
                {
                    title: '交付时间',
                    dataIndex: 'payTime',
                    key: 'payTime'
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
        open(record) {
            this.record = record
            this.visible = true
            this._loadData()
        },
        _loadData() {
            this.loading = true
            getFertilizerDeliver({
                fertilizerId: this.record.id
            }).then(res => {
                if (res.success) {
                    this.dataSource = res.result
                }
                this.loading = false    
            })
        },
        addPayDetails() {
            this.$refs.addPayDetails.open()
        },
        editData(record) {
            this.$refs.addPayDetails.open(record)
        },
        deleteData(record) {
            deleteFertilizerDeliver({
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