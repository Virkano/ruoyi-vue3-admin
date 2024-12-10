<script setup>
import useTagsViewStore from '@/store/modules/tagsView'
import iframeToggle from './IframeToggle/index'

const route = useRoute()
const tagsViewStore = useTagsViewStore()

onMounted(() => {
  addIframe()
})

watch((route) => {
  addIframe()
})

function addIframe() {
  if (route.meta.link) {
    useTagsViewStore().addIframeView(route)
  }
}
</script>

<template>
  <section class="app-main">
    <div class="app-assign">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="tagsViewStore.cachedViews">
            <component :is="Component" v-if="!route.meta.link" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
      <iframe-toggle />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: var(--content-bg, #141414);
  .app-assign {
    min-height: calc(100vh - 115px);
    max-height: calc(100vh - 115px);
    margin: 15px;
    background: var(--el-bg-color, #141414);
    overflow-y: scroll;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
