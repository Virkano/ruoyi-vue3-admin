<script setup>
import { ElLoading } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DocumentHandler from '../components/DocumentHandler.vue'

const showCreateDialog = ref(false)
const selectedFile = ref(null)
const documentHandler = ref(null)
const docmentObj = ref(null)

function onCreateNew(ext) {
  docmentObj.value = {
    fileName: `新建文档${ext}`,
    file: null,
  }
  showCreateDialog.value = false
}

async function onOpenDocument() {
  // 创建文件选择器，选择Office文档
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.docx,.xlsx,.pptx,.doc,.xls,.ppt'

  input.onchange = (event) => {
    const file = (event.target).files?.[0]
    if (file) {
      showCreateDialog.value = false
      docmentObj.value = {
        fileName: file.name,
        file,
      }
    }
  }

  input.click()
}
// 页面初始化后根据路由地址获取文件 并自动打开
async function initFileUrl() {
  const route = useRoute()
  const url = route.query.url
  // const url ="http://101.132.143.49:8010/prod-api/profile/upload/2025/05/09/附件2：万贝医疗健康科技（上海）有限公司企业欠薪明细表v6_20250509094431A100.xls"
  const filenameParam = route.query.filename
  if (!url) {
    console.warn('未提供文件 URL')
    return
  }
  const laodingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    const res = await fetch(url)

    if (!res.ok)
      throw new Error('文件请求失败')
    laodingInstance.close()
    const blob = await res.blob()
    let fileName = ''

    // 1. 从 query 参数获取 filename
    if (filenameParam) {
      fileName = filenameParam
    }

    // 2. 如果没有 filename 参数，尝试从 URL 末尾解析
    if (!fileName) {
      const match = decodeURIComponent(url).match(/\/([^/?#]+)$/)
      if (match && match[1].includes('.')) {
        fileName = match[1]
      }
    }

    // 3. 如果 URL 也解析失败，尝试从 Content-Disposition 响应头获取
    if (!fileName) {
      const disposition = res.headers.get('Content-Disposition')
      if (disposition) {
        const match = disposition.match(/filename\*=UTF-8''(.+)|filename="?([^"]+)"?/)
        if (match) {
          fileName = decodeURIComponent(match[1] || match[2])
        }
      }
    }

    // 4. 最终还拿不到文件名，拒绝处理
    if (!fileName) {
      console.error('无法确定文件名，拒绝打开')
      return
    }

    const file = new File([blob], fileName, { type: blob.type })
    // debugger
    docmentObj.value = { fileName, file }
    showCreateDialog.value = false
  }
  catch (err) {
    console.error('加载文件失败:', err)
    laodingInstance.close()
  }
}
onMounted(() => {
  initFileUrl()
})
</script>

<template>
  <div class="app-container">
    <div class="home">
      <!-- 顶部操作区域 v-if="!docmentObj?.fileName" -->
      <div class="top-operation-bar">
        <el-button type="primary" @click="showCreateDialog = true">
          新建/打开文件
        </el-button>
      </div>
      <div class="editor-content">
        <DocumentHandler
          v-if="docmentObj?.fileName"
          ref="documentHandler"
          style="height: calc(100vh - 200px); width: 100%"
          :file="docmentObj"
        />
        <!-- 主要内容区域 -->
        <div v-else class="main-content">
          <h1>欢迎使用文档编辑器</h1>
          <p>点击顶部按钮开始创建或打开文档</p>
        </div>
      </div>

      <!-- 使用DocumentHandler组件，通过prop传递文件 -->

      <!-- 面板转换为对话框 -->
      <el-dialog v-model="showCreateDialog" title="新建/打开文件" width="450px" center>
        <div id="panel-createnew">
          <div class="header">
            新建
          </div>
          <div class="thumb-list">
            <div class="thumb-wrap" template="WORD" @click="onCreateNew('.docx')">
              <div class="thumb" style="background-image: url('./img/doc-formats/docx.png')" />
              <div class="title">
                文档
              </div>
            </div>
            <div class="thumb-wrap" template="EXCEL" @click="onCreateNew('.xlsx')">
              <div class="thumb" style="background-image: url('./img/doc-formats/xlsx.png')" />
              <div class="title">
                表格
              </div>
            </div>
            <div class="thumb-wrap" template="PPT" @click="onCreateNew('.pptx')">
              <div class="thumb" style="background-image: url('./img/doc-formats/pptx.png')" />
              <div class="title">
                演示文稿
              </div>
            </div>
          </div>
          <div class="header">
            打开
          </div>
          <div class="open-container">
            <el-button type="info" size="large" plain @click="onOpenDocument">
              打开本地文件
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  // height: 100vh;
  background-color: #f5f5f5;
}

.top-operation-bar {
  background-color: white;
  padding: 12px 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.editor-content {
  flex-grow: 1;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    margin-bottom: 20px;
  }
}

#panel-createnew {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  .header {
    font-size: 18px;
    padding: 0 0 0 25px;
    white-space: nowrap;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .thumb-list {
    display: flex;
    justify-content: space-around;

    .thumb-wrap {
      display: inline-block;
      text-align: center;
      width: auto;
      cursor: pointer;
      vertical-align: top;
      border-radius: 4px;

      .thumb {
        width: 96px;
        height: 96px;
        background-repeat: no-repeat;
        background-position: center;
        margin: 12px 12px 0px 12px;
        background-size: contain;
      }

      .title {
        width: 104px;
        font-size: 14px;
        line-height: 14px;
        height: 28px;
        margin: 8px 8px 12px 8px;
        word-break: break-word;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      &:hover {
        background-color: #e0e0e0;
      }

      &:active {
        color: rgba(0, 0, 0, 0.8);
        background-color: #cbcbcb;
      }
    }
  }
}
.open-container {
  text-align: center;
  padding-bottom: 25px;
  margin-top: 20px;
}
</style>
