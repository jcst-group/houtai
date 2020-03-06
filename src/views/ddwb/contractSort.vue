<template>
    <div style="background:white;padding:10px 0 10px 0; height:100%">
        <div style="margin:0 1% 0 0; overflow:hidden">
            <div>
                <!-- <div class="button">
                    <i-button class="review-btn btn" @click="handleReset">
                        <Icon type="md-sync" class="icon"/>
                        重置
                    </i-button>
                    <i-button class="search-btn btn" style="margin-right:10px"  @click="handleSearch">
                        <Icon type="md-search" class="icon"/>
                        查询
                    </i-button>
                </div> -->
                <div class="select">
                    <a-form
                        :form="form">
                        <div style="float:left;width:500px;height:50px;margin-bottom:10px;">
                            <span style="line-height:40px;margin-right:5px">种植起始年份：</span>
                            <a-form-item style="display:inline-block">
                                <a-select
                                @change="selectYear"
                                v-decorator="['year']"
                                style="width: 200px">
                                    <a-select-option 
                                        v-for="item in yearDatas"
                                        :key="item.id"
                                        :value='item.id'>
                                        {{item.year}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </div>
                    </a-form>
                </div>
            </div>
        </div>
        <div class="tab-wrapper" v-if="this.curYear" style="height:100%">
            <a-tabs defaultActiveKey='1' style="height:100%">
                <a-tab-pane :tab='item.name' v-for="item in tabArray" :key="item.id">
                    <component @refreshYear='refreshYear' :curYear='curYear' :is="item.component"></component>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div v-else class="no-year">
            请先选择种植起始年份
        </div>
    </div>
</template>
<script>
import {getContractYear, getLoanType} from '@/api/ddwbApi'
import basePurchase from '../ddwbmodule/basePurchase'
import fertilizerPurchase from '../ddwbmodule/fertilizerPurchase'
import laborDispatch from '../ddwbmodule/laborDispatch'
import standardPlan from '../ddwbmodule/standardPlan'
import orderContract from '../ddwbmodule/orderContract'
import insuranceContract from '../ddwbmodule/insuranceContract'
import pledgeGoods from '../ddwbmodule/pledgeGoods'
import loanContract from '../ddwbmodule/loanContract'
import {queryAllBase} from '@/api/allapi'
export default {
    name: 'contractSort',
    components: {
        basePurchase,
        standardPlan,
        fertilizerPurchase,
        laborDispatch,
        orderContract,
        pledgeGoods,
        insuranceContract,
        loanContract
    },
    provide() {
        return {
            contractVue: this
        }
    },
    data() {
        return {
            form: this.$form.createForm(this),
            curYear: '',
            yearDatas: [],
            base: [],
            loanData: [],
            tabArray: [
                {
                    name: '订单基地采购合同',
                    id: '1',
                    component: 'basePurchase'
                },
                {
                    name: '规范化种植协议',
                    id: '2',
                    component: 'standardPlan'
                },
                {
                    name: '肥料采购合同',
                    id: '3',
                    component: 'fertilizerPurchase'
                },
                {
                    name: '劳务派遣合同',
                    id: '4',
                    component: 'laborDispatch'
                },
                {
                    name: '订单采购合同',
                    id: '5',
                    component: 'orderContract'
                },
                {
                    name: '质押物权合同',
                    id: '6',
                    component: 'pledgeGoods'
                },
                {
                    name: '保险合同',
                    id: '7',
                    component: 'insuranceContract'
                },
                {
                    name: '贷款合同',
                    id: '8',
                    component: 'loanContract'
                },
            ]
        }
    },
    created() {
        this.refreshYear()
        queryAllBase().then((res)=>{
            if(res.success){
                this.base = res.result;
            }
        })
        getLoanType().then(res => {
            if(res.success){
                this.loanData = res.result;
            }
        })
    },
    methods: {
        selectYear(val) {
            this.curYear = val
        },
        refreshYear() {
            getContractYear().then(res => {
                if (res.success) {
                    this.yearDatas = res.result
                }
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
    .no-year
        font-weight 700
        font-size 18px
    .btn
        float right
        background #2c909c
        border-color #2c909c
        color #fff
        line-height 18px
        margin-top 6px
        .icon
            font-size 18px
            vertical-align middle
</style>