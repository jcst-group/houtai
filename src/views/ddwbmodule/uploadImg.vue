<template>
    <div class="form-wrapper" style="width:100%">
        <a-form-item
            label="文件图片"
            class="form-passsword change-display"
        >
            <div 
                class="upload-wrapper">
                <a-upload
                    name="file"
                    listType="picture-card"
                    :multiple='true'
                    :action="`/api/pictureInfo/${imgUrl}`"
                    :data='test'
                    :beforeUpload="beforeUpload"
                    :headers="headers"
                    :fileList='fileList'
                    @change="handleIndentChange"
                    @preview="handlePreview"
                    :remove='removePic'
                >
                    <div v-if="fileList.length < 4">
                        <a-icon type="plus" style="font-size:20px"  />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <a-modal :visible="picVisible" :footer="null" @cancel="handleImgCancel">
                    <img alt="example" style="width: 100%" :src="picImage" />
                </a-modal>
            </div>
        </a-form-item>
    </div>
</template>
<script>
import Vue from "vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import {notification} from 'ant-design-vue'
import {delpicture} from '@/api/userApi'
export default {
    props: {
        imgUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            headers: "",
            picVisible: false,
            fileList: [],
            fileId: [],
            picImage: '',
            record: null
        }
    },
    created() {
        const token = Vue.ls.get(ACCESS_TOKEN);
        this.headers = { "X-Access-Token": token };
    },
    methods: {
        getImg() {
            this.fileList = []
            this.fileId = []
            if (this.record) {
                let imgshowapi = "/api/pictureInfo/show/"
                this.record.pictureInfos.forEach(item => {
                    this.fileList.push({
                        uid: item.id,
                        name: item.pictureUrl,
                        status:'done',
                        url: imgshowapi + item.pictureUrl
                    })
                })
            }
        },
        test() {
            return this.record ? {recordId: this.record.id} : null
        },
        handleIndentChange(info) {
            if(info.file.status === 'uploading'){
                this.fileList = info.fileList
                return
            }
            if (info.file.status === 'error') {
                switch (info.file.error.status) {
                    case 403:
                        notification.error({ message: '系统提示', description: '拒绝访问',duration: 4})
                        break
                    case 404:
                        notification.error({ message: '系统提示', description:'很抱歉，资源未找到!',duration: 4})
                        break
                    case 504:
                        notification.error({ message: '系统提示', description: '网络超时'})
                        break
                    case 401:
                        notification.error({ message: '系统提示', description:'该账号无此权限!',duration: 4})
                        break
                    default:
                        notification.error({
                            message: '系统提示',
                            description: info.file.error.message,
                            duration: 4
                        })
                        break
                }
            }
            if (info.file.status === 'done') {
                if (info.file.response.success) {
                    this.$emit('changeImg')
                    this.fileId.push({
                        id: info.file.response.result.id
                    })
                }
                this.$message.success('图片上传成功')
            }
            
        },
        beforeUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            if (!(isPNG || isJPG)) {
                this.$message.error("只允许上传jpg/png格式图片");
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error("图片大小不能大于5M");
            }
            return (isJPG || isPNG) && isLt5M;
        },
        handlePreview(file) {
            this.picVisible = true
            this.picImage = file.url || file.thumbUrl
        },
        handleImgCancel() {
            this.picVisible = false
        },
        removePic(file) {
            if (!file.response && !file.uid) {
                return
            }
            return new Promise((resolve) => {
                var that = this
                this.$confirm({
                    title: '确定要删除该图片么',
                    onCancel() {
                        return resolve(false)
                    },
                    onOk() {
                        delpicture({
                            id: file.response ? file.response.result.id : file.uid 
                        }).then(res => {
                            that.$message.info(res.message)
                            if (res.success) {
                                that.$emit('changeImg')
                                let delId = file.response ? file.response.result.id : file.uid
                                that.fileList = that.fileList.filter(item => {
                                    let id = item.response ? item.response.result.id : item.uid 
                                    return id !== delId
                                })
                                return resolve(true)
                            }
                        })
                    }
                })
            }).then(res => {
                return res
            })
        },
    },
}
</script>
<style lang="stylus" scoped>
    
</style>