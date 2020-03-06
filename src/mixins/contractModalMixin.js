export default {
    props: {
        curYear: ''
    },
    inject: ['contractVue'],
    data() {
        return {
            visible: false,
            title: '',
            form: this.$form.createForm(this),
            record: {},
            base: this.contractVue.base
        }
    },
    methods: {
        filterBatch(val, node) {
            return node.componentOptions.children[0].text.trim().indexOf(val) > -1
        },
        emitLoadData() {
            this.$parent._loadData()
            this.$emit('refreshYear')
        },
        open(record) {
            this.form.resetFields()
            this.record = record || {}
            this.visible = true
            this.$nextTick(() => {
                this.$refs.uploadImg.record = record
                this.$refs.uploadImg.getImg()
            })
            if (record) {
                this.title = '编辑合同'
            } else {
                // this.$refs.uploadImg.record = null
                this.title = '添加合同'
            }
        },
        handelCancel() {
            this.record = {}
            this.form.resetFields()
            this.$refs.uploadImg.fileList = []
            this.$refs.uploadImg.fileId = []
        },
    },
}