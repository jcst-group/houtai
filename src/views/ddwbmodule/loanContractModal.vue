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
                <a-form-item label='抵押物'>
                    <a-input
                        v-decorator="['collateral',{
                        initialValue:record.collateral,
                        rules: [{required: true, message: '请输入抵押物'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='抵押物价值(元)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['collateralValue',{
                        initialValue:record.collateralValue,
                        rules: [{required: true, message: '请输入抵押物价值'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='借款金额(元)'>
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
                <a-form-item label='借款类型'>
                    <a-select
                        v-decorator="['type', {
                            initialValue: record.type ? record.type.code : null,
                            rules: [{required: true, message: '请选择借款类型'}]
                        }]">
                        <a-select-option v-for="v in loanData" :key="v.value" :value="v.code">{{v.displayName}}</a-select-option>
                    </a-select>
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
import {addLoanContract,updateLoanContract,} from '@/api/ddwbApi'
import moment from 'moment'
import contractModalMixin from '@/mixins/contractModalMixin'
export default {
    mixins: [contractModalMixin],
    components:{
        uploadImg
    },
    data() {
        return {
            imgUrl: 'addLoanContractPic',
            loanData: this.contractVue.loanData
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
                        updateLoanContract(params).then(res => {
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
                        addLoanContract(params).then(res => {
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
        moment,
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