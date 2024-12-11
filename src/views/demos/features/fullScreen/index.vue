<script setup>
import { useFullscreen } from '@vueuse/core'

const domRef = ref()
const { enter, exit, isFullscreen, toggle } = useFullscreen()

const { isFullscreen: isDomFullscreen, toggle: toggleDom }
  = useFullscreen(domRef)
</script>

<template>
  <div>
    <div class="relative px-15 py-15 border-bottom">
      <div class="mb-4 flex text-18 font-semibold">
        全屏示例
      </div>
    </div>
    <div class="app-container">
      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>Window Full Screen</span>
          </div>
        </template>
        <el-button :disabled="isFullscreen" type="primary" @click="enter">
          全屏进入窗口
        </el-button>
        <el-button
          type="primary"
          @click="toggle"
        >
          切换窗口全屏
        </el-button>
        <el-button :disabled="!isFullscreen" danger @click="exit">
          退出窗口全屏
        </el-button>
        <span class="text-nowrap"> Current State: {{ isFullscreen }} </span>
      </el-card>

      <el-card class="mt-15" shadow="never">
        <template #header>
          <div class="card-header">
            <span>Dom 全屏</span>
          </div>
        </template>
        <el-button
          type="primary"
          @click="toggleDom"
        >
          Dom全屏
        </el-button>
      </el-card>

      <div
        ref="domRef"
        class="mx-auto mt-10 flex h-300 w-1/2 items-center justify-center rounded-8 bg-yellow-400"
      >
        <el-button class="mr-2" type="primary" @click="toggleDom">
          {{ isDomFullscreen ? 'Exit Dom Full Screen' : 'Enter Dom Full Screen' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid var(--tags-item-border, rgba(5, 5, 5, 0.06));
}
</style>
