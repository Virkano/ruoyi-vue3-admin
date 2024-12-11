<script setup>
import {
  downloadFileFromBase64,
  downloadFileFromBlobPart,
  downloadFileFromImageUrl,
  downloadFileFromUrl,
} from '@/utils/fileDownload'
import imageBase64 from './base64'
</script>

<template>
  <div>
    <div class="relative px-15 py-15 border-bottom">
      <div class="mb-4 flex text-18 font-semibold">
        文件下载示例
      </div>
    </div>
    <div class="app-container">
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>根据文件地址下载文件</span>
          </div>
        </template>
        <el-button
          type="primary"
          @click="
            downloadFileFromUrl({
              source:
                'https://codeload.github.com/vbenjs/vue-vben-admin-doc/zip/main',
              target: '_self',
            })
          "
        >
          Download File
        </el-button>
      </el-card>

      <el-card class="mt-15" shadow="never">
        <template #header>
          <div class="card-header">
            <span>根据地址下载图片</span>
          </div>
        </template>
        <el-button
          type="primary"
          @click="
            downloadFileFromImageUrl({
              source:
                'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
              fileName: 'vben-logo.png',
            })
          "
        >
          Download File
        </el-button>
      </el-card>

      <el-card class="mt-15" shadow="never">
        <template #header>
          <div class="card-header">
            <span>base64流下载</span>
          </div>
        </template>
        <el-button
          type="primary"
          @click="
            downloadFileFromBase64({
              source: imageBase64,
              fileName: 'image.png',
            })
          "
        >
          Download File
        </el-button>
      </el-card>

      <el-card class="mt-15" shadow="never">
        <template #header>
          <div class="card-header">
            <span>文本下载</span>
          </div>
        </template>
        <el-button
          type="primary"
          @click="
            downloadFileFromBlobPart({
              source: 'text content',
              fileName: 'test.txt',
            })
          "
        >
          Download Txt
        </el-button>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid var(--tags-item-border, rgba(5, 5, 5, 0.06));
}
</style>
