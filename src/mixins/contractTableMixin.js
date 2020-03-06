export default {
    props: {
        curYear: {
            default: ''
        }
    },
    watch: {
        curYear() {
            this._loadData()
        }
    },
    data() {
        return {
            dataSource: [],
            loading: false,
            pageNo: null,
            pageSize: null,
            pagination: {
                pageSizeOptions: ["10", "20", "50"],
                showTotal: (total, range) => {
                    return range[0] + "-" + range[1] + " 共" + total + "条";
                },
                showQuickJumper: true,
                showSizeChanger: true,
            }
        }
    },
    created() {
        this._loadData()
    },
    methods: {
        changeTable(page) {
            this.pageNo = page.current
            this.pageSize = page.pageSize
            this._loadData()
        },
        refreshYear() {
            this.$emit('refreshYear')
        }
    },
}