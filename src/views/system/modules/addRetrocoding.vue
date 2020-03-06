<template>
    <a-modal
        title="添加追溯"
        v-model="visible"
        @ok="handleOk"
        @cancel='handleCancel'
        style="top:10%;height: 90%"
        cancelText="取消"
        okText="确定"
        :maskClosable="false"
        class="add-retrocoding">
        <a-form
            :form="form">
            <div class="form-wrapper">
                <a-form-item label='批次类型'>
                    <a-select
                        @change="showRecorvery"
                        v-decorator="['retroCodeInfo.type',{
                            rules: [{required: true, message: '请选择批次类型'}]
                        }]">
                        <a-select-option 
                            v-for="item in typeDatas"
                            :key="item.value"
                            :value='item.code'>
                            {{item.displayName}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='批次编码'>
                    <a-select
                        :filterOption="filterBatch"
                        :showSearch='true'
                        @change="showCropDatas"
                        placeholder="请先选择批次类型"
                        v-decorator="['retroCodeInfo.initId', {
                            rules: [{required: true, message: '请选择批次编码'}]
                        }]">
                        <a-select-option
                            v-for="item in batchDatas"
                            :key="item.id"
                            :value='item.id'>
                            <div class='hide-name' style="color: rgba(0,0,0,0.4)">{{item.relationName}}</div>
                            <div class="crop-text">{{item.batchCode}}</div>
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-wrapper" v-if="showRec">
                <a-form-item label='种植信息选择'>
                    <a-select
                        :filterOption="filterBatch"
                        :showSearch='true'
                        placeholder="请先选择批次编码"
                        v-decorator="['retroCodeInfo.recoId',{
                            rules: [{required: true, message: '请选择种植信息'}]
                        }]">
                        <a-select-option 
                            v-for="item in cropDatas"
                            :key="item.id"
                            :value='item.id'>
                            <div class='hide-name' style="color: rgba(0,0,0,0.4)">{{item.batchName}}</div>
                            <div class="crop-text">{{item.recoveryCode}}</div>
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='批次重量(kg)'>
                    <a-input
                        disabled
                        placeholder="选择批次编码后自动填入"
                        v-decorator="['residualOutput',{
                        rules: [{required: true, message: '请输入批次重量'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='包装净重'>
                    <a-input
                        type='number'
                        v-decorator="['retroCodeInfo.netWeight', {
                        rules: [{required: true, message: '请输入包装净重'}]
                    }]">
                        <a-select slot="addonAfter" :value='curUnit' style="width: 90px" @change="selectUnit">
                            <a-select-option
                                v-for="item in unitDatas"
                                :key="item.value"
                                :value="item.code">
                                {{item.displayName}}
                            </a-select-option>
                        </a-select>
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='追溯码数量'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['codeQuantity',{
                        rules: [{required: true, message: '请输入追溯码数量'}]
                    }]">
                    </a-input-number>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='药材规格'>
                    <a-input
                        v-decorator="['retroCodeInfo.specifications',{
                        rules: [{required: true, message: '请输入药材规格'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='质检员'>
                    <a-input
                        v-decorator="['retroCodeInfo.qc',{
                        rules: [{required: true, message: '请输入质检员'}]
                    }]">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='执行标准'>
                    <a-input
                        v-decorator="['retroCodeInfo.executeStandard']">
                    </a-input>
                </a-form-item>
            </div>
            <div class="form-wrapper" style="display:block; width:120%">
                <a-form-item label='注意事项'>
                    <a-textarea
                        :autosize='{minRows: 2, maxRows: 6}'
                        v-decorator="['retroCodeInfo.remarks']">
                    </a-textarea>
                </a-form-item>
            </div>
        </a-form>
    </a-modal>
</template>
<script>
import {getRetrocodingUnit, getBatchByType, getWeightAndRec, addRetrocoding} from '@/api/permissonApi'
export default {
    props: {
        typeDatas: {
            type: Array,
            dafault() {
                return []
            }
        }
    },
    created () {
        getRetrocodingUnit().then(res => {
            if (res.success) {
                this.unitDatas = res.result
                this.curUnit = res.result[0].code
            }
        })
    },
    data() {
        return {
            curVal: '',
            curUnit: '',
            visible: false,
            showRec: false,
            form: this.$form.createForm(this),
            batchDatas: [],
            cropDatas: [],
            unitDatas: []
        }
    },
    methods: {
        filterBatch(val, node) {
            return node.componentOptions.children[0].children[0].text.indexOf(val) > -1 || node.componentOptions.children[1].children[0].text.indexOf(val) > -1
        },
        open() {
            this.visible = true
        },
        showRecorvery(val) {
            this.form.resetFields(['retroCodeInfo.initId', 'retroCodeInfo.recoId', 'residualOutput'])
            this.curVal = val
            this.showRec = val === 'INIT_BATCH'
            getBatchByType({
                type: val
            }).then(res => {
                if (res.success) {
                    this.batchDatas = res.result
                }
            })
        },
        showCropDatas(val) {
            getWeightAndRec({
                batchId: val,
                type: this.curVal
            }).then((res) => {
                if (res.success) {
                    if (res.result.recoveryList) {
                        this.cropDatas = res.result.recoveryList
                    }
                    this.form.setFieldsValue({'residualOutput': res.result.yield})
                }
            })
        },
        judgeValue(e) {
            var reg = /\D/
            if (e && reg.test(e.target.value)) {
                e.target.value = ''
            }
        },
        selectUnit(val) {
            this.curUnit = val
        },
        handleOk() {
            this.form.validateFieldsAndScroll(err => {
                if (!err) {
                    let params = this.form.getFieldsValue()
                    params.retroCodeInfo.unit = this.curUnit
                    if (params.codeQuantity < 0) {
                        params.codeQuantity = Math.abs(params.codeQuantity)
                    }
                    if (params.retroCodeInfo.netWeight < 0) {
                        params.retroCodeInfo.netWeight = Math.abs(params.retroCodeInfo.netWeight)
                    }
                    if (this.curVal !== 'INIT_BATCH') {
                        params.retroCodeInfo.recoId = params.retroCodeInfo.initId
                        delete params.retroCodeInfo.initId
                    }
                    addRetrocoding(params).then(res => {
                        this.$message.info(res.message)
                        if (res.success) {
                            this.visible = false
                            this.$parent._loadData()
                            this.curUnit = this.unitDatas[0].code
                            this.showRec = false
                            this.batchDatas = []
                            this.cropDatas = []
                            this.form.resetFields()
                        }
                    })
                }
            })
        },
        handleCancel() {
            this.curUnit = this.unitDatas[0].code
            this.showRec = false
            this.batchDatas = []
            this.cropDatas = []
            this.form.resetFields()
        }
    }
}
</script>
<style lang="stylus">
    .add-retrocoding
        width: 900px !important
        .form-wrapper
            width 45%
            display inline-block
            .ant-select-selection-selected-value
                .hide-name
                    display: none
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