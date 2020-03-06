<template>
    <a-modal
        :title="title"
        v-model="visible"
        @ok="handleOk"
        @cancel='handelCancel'
        style="top:10%;height: 90%"
        cancelText="取消"
        okText="确定"
        :maskClosable="false">
        <a-form
            :form="form">
            <div class="form-wrapper">
                <a-form-item label='交付数量'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['payNum', {
                            initialValue: record.payNum,
                            rules: [{required: true, message: '请输入交付数量'}]
                        }]"
                    />
                </a-form-item>
            </div>
            <div class="form-wrapper">
                <a-form-item label='价格'>
                    <a-input-number
                        style="width:100%"
                        v-decorator="['price',{
                        initialValue:record.price,
                        rules: [{required: true, message: '请输入价格'}]
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
        </a-form>
    </a-modal>
</template>
<script>
import moment from 'moment'
import {addFertilizerDeliver,updateFertilizerDeliver} from '@/api/ddwbApi'
export default {
    props: {
        fertilizerId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            record: {}
        }
    },
    methods: {
        open(record) {
            this.form.resetFields()
            this.record = record || {}
            this.visible = true
            if (record) {
                this.title = '编辑交付情况'
            } else {
                this.title = '添加交付情况'
            }
        },
        handelCancel() {
            this.record = {}
            this.form.resetFields()
        },
        handleOk() {
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    const params = this.form.getFieldsValue()
                    params.payTime = moment(params.payTime).format('YYYY-MM-DD')
                    params.fertilizerId = this.fertilizerId
                    if (this.record.id) {
                        params.id = this.record.id
                        updateFertilizerDeliver(params).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.record = {}
                                this.visible = false
                                this.$emit('changeDetails')
                            }
                        })
                    } else {
                        addFertilizerDeliver(params).then(res => {
                            this.$message.info(res.message)
                            if (res.success) {
                                this.record = {}
                                this.visible = false
                                this.$emit('changeDetails')
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
<style lang="stylus" scoped>

</style>