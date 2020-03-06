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
                    <a-input
                        v-decorator="['partyA',{
                        initialValue:record.partyA,
                        rules: [{required: true, message: '请输入甲方'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='乙方'>
                    <a-select
                        :filterOption="filterBatch"
                        :showSearch='true'
                        v-decorator="['partyB', {
                            initialValue:record.partyB,
                            rules: [{required: true, message: '请选择乙方'}]
                        }]">
                        <a-select-option v-for="v in base" :key="v.id" :value="v.id">{{v.baseName}}</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='土地面积(亩)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['acreage',{
                        initialValue:record.acreage,
                        rules: [{required: true, message: '请输入土地面积'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='农资投入品标准(元/亩)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['investMu',{
                        initialValue:record.investMu,
                        rules: [{required: true, message: '请输入农资投入品标准(元/亩)'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='签订时间'>
                    <a-date-picker 
                        style="width:100%"
                        v-decorator="['signTime', {
                            initialValue: record.signTime ? moment(record.signTime, 'YYYY-MM-DD') : null,
                            rules: [{required: true, message: '请选择签订时间'}]
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
            <!-- <div class="form-wrapper" style="width:100%">
                <a-form-item label='备注'>
                    <a-textarea :autosize={minRows:2,maxRows:6} v-decorator="[
                        'remark',
                        {
                            initialValue:record.remark
                        }
                    ]" />
                </a-form-item>
            </div> -->
        </a-form>
    </a-modal>
</template>
<script>
import uploadImg from './uploadImg'
import moment from 'moment'
import {addStandardPlan,updateStandardPlan} from '@/api/ddwbApi'
import contractModalMixin from '@/mixins/contractModalMixin'
export default {
    mixins: [contractModalMixin],
    components:{
        uploadImg
    },
    data() {
        return {
            imgUrl: 'addStandardPlanPic'
        }
    },
    methods: {
        handleOk() {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const params = this.form.getFieldsValue()
                    params.signTime = moment(params.signTime).format('YYYY-MM-DD')
                    params.startTime = moment(params.startTime).format('YYYY-MM-DD')
                    params.endTime = moment(params.endTime).format('YYYY-MM-DD')
                    params.yearId = this.curYear
                    if (this.record.id) {
                        params.id = this.record.id
                        updateStandardPlan(params).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.record = {}
                                this.visible = false
                                this.emitLoadData()
                            }
                        })
                    } else {
                        params.pictureInfos = this.$refs.uploadImg.fileId
                        addStandardPlan(params).then(res => {
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