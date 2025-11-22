<script setup>
import Header from './components/Header.vue'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'
import Viewer3D from './components/Viewer3D.vue'
import { ref } from 'vue'

const viewerRef = ref(null)

const handleViewChange = (viewName) => {
  if (viewerRef.value) {
    viewerRef.value.setCameraView(viewName)
  }
}
</script>

<template>
  <div class="app-container">
    <Header />
    <div class="main-content">
      <LeftPanel />
      <div class="viewer-area">
        <Viewer3D ref="viewerRef" />
      </div>
      <RightPanel @changeView="handleViewChange" />
    </div>
  </div>
</template>

<style>
/* Global Reset */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #111;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.viewer-area {
  flex: 1;
  position: relative;
  background: #000;
  min-width: 0; /* Crucial for preventing flex item overflow */
}
</style>
