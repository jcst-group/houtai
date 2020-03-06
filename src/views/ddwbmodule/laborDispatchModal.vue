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
                <a-form-item label='供方'>
                    <a-input
                        v-decorator="['partyA',{
                        initialValue:record.partyA,
                        rules: [{required: true, message: '请输入供方'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='需方'>
                    <a-input
                        v-decorator="['partyB',{
                        initialValue:record.partyB,
                        rules: [{required: true, message: '请输入需方'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='派遣时间'>
                    <a-date-picker 
                        style="width:100%"
                        v-decorator="['dispatchTime', {
                            initialValue: record.dispatchTime ? moment(record.dispatchTime, 'YYYY-MM-DD') : null,
                            rules: [{required: true, message: '请选择派遣时间'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='派遣数量(人)'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['total',{
                        initialValue:record.total,
                        rules: [{required: true, message: '请输入派遣数量（人）'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='派遣月数'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['dispatchMonth',{
                        initialValue:record.dispatchMonth,
                        rules: [{required: true, message: '请输入派遣月数'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='平均月工资'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['price',{
                        initialValue:record.price,
                        rules: [{required: true, message: '请输入平均月工资'}]
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
            <div class='img-wrapper'>
                <uploadImg @changeImg='emitLoadData' :imgUrl='imgUrl' ref="uploadImg"></uploadImg>
            </div>
        </a-form>
    </a-modal>
</template>
<script>
import uploadImg from './uploadImg'
import {addLaborDispatch,updateLaborDispatch,} from '@/api/ddwbApi'
import moment from 'moment'
import contractModalMixin from '@/mixins/contractModalMixin'
export default {
    mixins: [contractModalMixin],
    components:{
        uploadImg
    },
    data() {
        return {
            imgUrl: 'addLaborDispatchPic'
        }
    },
    methods: {
        handleOk() {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const params = this.form.getFieldsValue()
                    params.signTime = moment(params.signTime).format('YYYY-MM-DD')
                    params.dispatchTime = moment(params.dispatchTime).format('YYYY-MM-DD')
                    if (this.record.id) {
                        params.id = this.record.id
                        updateLaborDispatch(params).then(res => {
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
                        addLaborDispatch(params).then(res => {
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