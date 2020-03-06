<template>
    <a-modal
        :title="title"
        v-model="visible"
        @ok="handleOk"
        @cancel='handelCancel'
        style="top:10%;height: 90%"
        cancelText="取消"
        okText="确定"
        :maskClosable="false"
        class="base-purchase">
        <a-form
            :form="form">
            <div class="form-wrapper">
                <a-form-item label='甲方'>
                    <a-select
                        :filterOption="filterBatch"
                        :showSearch='true'
                        v-decorator="['partyA', {
                            initialValue:record.partyA,
                            rules: [{required: true, message: '请选择甲方'}]
                        }]">
                        <a-select-option v-for="v in base" :key="v.id" :value="v.id">{{v.baseName}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='乙方'>
                    <a-input
                        v-decorator="['partyB',{
                        initialValue:record.partyB,
                        rules: [{required: true, message: '请输入乙方'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='丙方'>
                    <a-input
                        style="width:100%"
                        v-decorator="['partyC',{
                        initialValue:record.partyC,
                        rules: [{required: true, message: '请输入丙方'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='抵押数量(kg)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['pledgeNum',{
                        initialValue:record.pledgeNum,
                        rules: [{required: true, message: '请输入抵押数量'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='货物价格'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['goodPrice', {
                            initialValue: record.goodPrice,
                            rules: [{required: true, message: '请输入货物价格'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='总价值(元)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['totalValue', {
                            initialValue: record.totalValue,
                            rules: [{required: true, message: '请输入总价值'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='借款金额'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['loanAmount', {
                            initialValue: record.loanAmount,
                            rules: [{required: true, message: '请输入借款金额'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='借款月利率(‰)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['exchangeRate', {
                            initialValue: record.exchangeRate,
                            rules: [{required: true, message: '请输入借款月利率'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='开始时间'>
                    <a-date-picker 
                        style="width:100%"
                        v-decorator="['startTime', {
                            initialValue: record.startTime ? moment(record.startTime, 'YYYY-MM-DD') : null,
                            rules: [{required: true, message: '请选择开始时间'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='结束时间'>
                    <a-date-picker 
                        style="width:100%"
                        v-decorator="['endTime', {
                            initialValue: record.endTime ? moment(record.endTime, 'YYYY-MM-DD') : null,
                            rules: [{required: true, message: '请选择结束时间'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class='img-wrapper'>
                <uploadImg @changeImg='emitLoadData' :imgUrl='imgUrl' ref="uploadImg"></uploadImg>
            </div>
        </a-form>
    </a-modal>
</template>
<script>
import uploadImg from './uploadImg'
import {addPledgeGoods,updatePledgeGoods,} from '@/api/ddwbApi'
import moment from 'moment'
import contractModalMixin from '@/mixins/contractModalMixin'
export default {
    mixins: [contractModalMixin],
    components:{
        uploadImg
    },
    data() {
        return {
            imgUrl: 'addPledgeGoodsPic'
        }
    },
    methods: {
        handleOk() {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const params = this.form.getFieldsValue()
                    params.startTime = moment(params.startTime).format('YYYY-MM-DD')
                    params.endTime = moment(params.endTime).format('YYYY-MM-DD')
                    if (this.record.id) {
                        params.id = this.record.id
                        updatePledgeGoods(params).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.record = {}
                                this.visible = false
                                this.emitLoadData()
                            }
                        })
                    } else {
                        params.yearId = this.curYear
                        params.pictureInfos = this.$refs.uploadImg.fileId
                        addPledgeGoods(params).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.record = {}
                                this.visible = false
                                this.emitLoadData()
                            }
                        })
                    }
                }
            })
        },
        moment
    },
}
</script>
<style lang="stylus">
    .base-purchase
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
</style>