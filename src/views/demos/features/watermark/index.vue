<script setup>
import { useWatermark } from '@/hook/useWatermark'

const { destroyWatermark, updateWatermark, watermark } = useWatermark()

async function recreateWaterMark() {
  destroyWatermark()
  await updateWatermark({
    content: 'hello world',
  })
}

async function createWaterMark() {
  await updateWatermark({
    advancedStyle: {
      colorStops: [
        {
          color: 'red',
          offset: 0,
        },
        {
          color: 'blue',
          offset: 1,
        },
      ],
      type: 'linear',
    },
    content: `hello my watermark\n${new Date().toLocaleString()}`,
    globalAlpha: 0.5,
    gridLayoutOptions: {
      cols: 2,
      gap: [20, 20],
      matrix: [
        [1, 0],
        [0, 1],
      ],
      rows: 2,
    },
    height: 200,
    layout: 'grid',
    rotate: 22,
    width: 200,
  })
}
</script>

<template>
  <div>
    <div class="relative px-15 py-15 border-bottom">
      <div class="mb-4 flex text-18 font-semibold">
        水印
      </div>
      <div class="text-14 mt-2">
        水印使用了
        <a
          class="text-primary"
          href="https://zhensherlock.github.io/watermark-js-plus/"
          target="_blank"
        >
          watermark-js-plus
        </a>
        开源插件，详细配置可见插件配置。
      </div>
    </div>
    <div class="app-container">
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>使用</span>
          </div>
        </template>
        <el-button
          :disabled="!!watermark"
          type="primary"
          class="mr-2"
          @click="recreateWaterMark"
        >
          创建水印
        </el-button>
        <el-button
          :disabled="!watermark"
          class="mr-2"
          type="primary"
          @click="createWaterMark"
        >
          更新水印
        </el-button>
        <el-button :disabled="!watermark" danger @click="destroyWatermark">
          移除水印
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
