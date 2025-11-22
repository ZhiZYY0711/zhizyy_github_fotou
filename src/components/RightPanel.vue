<script setup>
const emit = defineEmits(['changeView'])

const setView = (view) => {
  emit('changeView', view)
}
</script>

<template>
  <div class="right-panel">
    <div class="section">
      <div class="section-title">视角预设</div>
      <div class="preset-list">
        <button class="preset-btn" @click="setView('front')">正面视图</button>
        <button class="preset-btn" @click="setView('back')">背面视图</button>
        <button class="preset-btn" @click="setView('left')">左侧视图</button>
        <button class="preset-btn" @click="setView('right')">右侧视图</button>
        <button class="preset-btn" @click="setView('top')">顶部视图</button>
        <button class="preset-btn" @click="setView('bottom')">底部视图</button>
      </div>
    </div>

    <div class="section">
      <div class="section-title">图层控制</div>
      <div class="layer-list">
        <label class="layer-item">
          <input type="checkbox" checked> 主体模型
        </label>
        <label class="layer-item">
          <input type="checkbox" checked> 表面纹理
        </label>
        <label class="layer-item">
          <input type="checkbox"> 病害标注
        </label>
        <label class="layer-item">
          <input type="checkbox"> 测量线
        </label>
      </div>
    </div>

    <div class="help-btn">?</div>
  </div>
</template>

<style scoped>
.right-panel {
  width: 200px;
  flex-shrink: 0;
  background: #1e1e1e;
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: #fff;
  position: relative;
}

.section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.preset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preset-btn {
  background: #2a2a2a;
  border: 1px solid #333;
  color: #ccc;
  padding: 8px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
  transition: all 0.2s;
}

.preset-btn:hover {
  background: #333;
  color: #fff;
  border-color: #444;
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.layer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  cursor: pointer;
  color: #ccc;
}

.layer-item input {
  accent-color: #409eff;
}

.help-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  font-size: 14px;
}

.help-btn:hover {
  color: #fff;
  background: #444;
}
</style>
