<template>
    <div class="test">
        <div id="container"></div>
    </div>
</template>
<script>
import {MapLoader} from '@/MapDemo/AMap.js'
export default {
    data(){
        return{
            map:null
        }
    },
    mounted(){
        let that=this
        MapLoader().then(AMap=>{
            console.log('地图加载成功')
            that.map=new AMap.Map('container',{
                center:[24.2884400000,116.1226400000],
                zoom:11
            })
        },e=>{
            console.log('地图加载失败',e)
        })
    }
}
</script>

