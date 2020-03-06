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
                <a-form-item label='保险公司'>
                    <a-input
                        v-decorator="['insuranceCompany',{
                        initialValue:record.insuranceCompany,
                        rules: [{required: true, message: '请输入保险公司'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='被保险基地'>
                    <a-select
                        :filterOption="filterBatch"
                        :showSearch='true'
                        v-decorator="['baseId', {
                            initialValue:record.baseId,
                            rules: [{required: true, message: '请选择被保险基地'}]
                        }]">
                        <a-select-option v-for="v in base" :key="v.id" :value="v.id">{{v.baseName}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='保险数量'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['insuranceNum',{
                        initialValue:record.insuranceNum,
                        rules: [{required: true, message: '请输入保险数量'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='单位保险金额'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['unitInsuranceAmount',{
                        initialValue:record.unitInsuranceAmount,
                        rules: [{required: true, message: '请输入单位保险金额'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='保险金额'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['insuranceAmount', {
                            initialValue: record.insuranceAmount,
                            rules: [{required: true, message: '请输入保险金额'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='保险费率(‰)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['premiumRate', {
                            initialValue: record.premiumRate,
                            rules: [{required: true, message: '请输入保险费率'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='保险费'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['insurancePremium', {
                            initialValue: record.insurancePremium,
                            rules: [{required: true, message: '请输入保险费'}]
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
import {addInsuranceContract,updateInsuranceContract,} from '@/api/ddwbApi'
import moment from 'moment'
import contractModalMixin from '@/mixins/contractModalMixin'
export default {
    mixins: [contractModalMixin],
    components:{
        uploadImg
    },
    data() {
        return {
            imgUrl: 'addInsuranceContractPic'
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
                        updateInsuranceContract(params).then(res => {
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
                        addInsuranceContract(params).then(res => {
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