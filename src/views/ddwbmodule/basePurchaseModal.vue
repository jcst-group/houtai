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
                <a-form-item label='交付产品'>
                    <a-input
                        v-decorator="['payPro',{
                        initialValue:record.payPro,
                        rules: [{required: true, message: '请输入交付产品'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='交付面积(亩)'>
                    <a-input-number
                        style="width: 100%"
                        v-decorator="['payAcreage',{
                        initialValue:record.payAcreage,
                        rules: [{required: true, message: '请输入交付面积'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='交付时间'>
                    <a-date-picker 
                        style="width:100%"
                        v-decorator="['payTime', {
                            initialValue: record.payTime ? moment(record.payTime, 'YYYY-MM-DD') : null,
                            rules: [{required: true, message: '请选择交付时间'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='价格(元/公斤)'>
                    <a-input-number
                        style="width: 100%"
                        placeholder="不填则按实时市场价格执行"
                        v-decorator="['price', {
                            initialValue:record.price
                        }]" />
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
import {addBasePurchase,updateBasePurchase,} from '@/api/ddwbApi'
import moment from 'moment'
import contractModalMixin from '@/mixins/contractModalMixin'
export default {
    mixins: [contractModalMixin],
    components:{
        uploadImg
    },
    data() {
        return {
            imgUrl: 'addBasePurchasePic'
        }
    },
    methods: {
        handleOk() {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const params = this.form.getFieldsValue()
                    params.signTime = moment(params.signTime).format('YYYY-MM-DD')
                    params.payTime = moment(params.payTime).format('YYYY-MM-DD')
                    if (this.record.id) {
                        params.id = this.record.id
                        params.price = params.price ? params.price : null
                        updateBasePurchase(params).then(res => {
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
                        addBasePurchase(params).then(res => {
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