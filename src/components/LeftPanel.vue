<script setup>
import { ref } from 'vue'

const activeTab = ref('info') // 'info', 'diagnosis', 'measure'

const tabs = [
  { id: 'info', label: '文物信息' },
  { id: 'diagnosis', label: '病害诊断' },
  { id: 'measure', label: '测量分析' }
]
</script>

<template>
  <div class="left-panel">
    <div class="tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        class="tab" 
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </div>
    </div>
    
    <div class="panel-content">
      <!-- Tab 1: 文物信息 -->
      <div v-if="activeTab === 'info'">
        <div class="section-header">
          <span class="icon">ⓘ</span> 基本信息
        </div>
        <div class="card">
          <div class="card-label">文物名称</div>
          <div class="card-value">佛像头部</div>
        </div>
        <div class="card">
          <div class="card-label">文物编号</div>
          <div class="card-value">WHB-2024-0156</div>
        </div>
        <div class="card">
          <div class="card-label"><span class="icon-small">📅</span> 年代</div>
          <div class="card-value">唐代 (618-907年)</div>
        </div>
        <div class="card">
          <div class="card-label"><span class="icon-small">📍</span> 出土地点</div>
          <div class="card-value">陕西省西安市长安区</div>
        </div>

        <div class="section-header">
          <span class="icon">📏</span> 尺寸规格
        </div>
        <div class="grid-2">
          <div class="stat-row">
            <span>高度</span>
            <span class="stat-val">32.5 cm</span>
          </div>
          <div class="stat-row">
            <span>宽度</span>
            <span class="stat-val">21.8 cm</span>
          </div>
          <div class="stat-row">
            <span>深度</span>
            <span class="stat-val">24.3 cm</span>
          </div>
          <div class="stat-row">
            <span>⚖️ 重量</span>
            <span class="stat-val">约 8.5 kg</span>
          </div>
        </div>

        <div class="section-header">
          材质与工艺
        </div>
        <div class="card">
          <div class="card-label">主要材质</div>
          <div class="card-value">石灰岩</div>
        </div>
      </div>

      <!-- Tab 2: 病害诊断 -->
      <div v-if="activeTab === 'diagnosis'">
        <div class="section-header">
          <span class="icon">🔍</span> 诊断概览
        </div>
        <div class="card">
          <div class="card-label">病害类型</div>
          <div class="card-value">表面风化, 局部裂隙</div>
        </div>
        <div class="card">
          <div class="card-label">严重程度</div>
          <div class="card-value" style="color: #e6a23c;">中度</div>
        </div>
        
        <div class="section-header">
          <span class="icon">📋</span> 详细记录
        </div>
        <div class="diagnosis-item">
          <div class="diagnosis-title">裂隙 A-01</div>
          <div class="diagnosis-desc">位于左侧面颊，长度约 2.5cm，深度 0.3mm。</div>
          <div class="diagnosis-meta">2024-01-15 记录</div>
        </div>
        <div class="diagnosis-item">
          <div class="diagnosis-title">表面变色 B-03</div>
          <div class="diagnosis-desc">顶部发髻处存在黑色沉积物，疑似烟熏痕迹。</div>
          <div class="diagnosis-meta">2024-01-15 记录</div>
        </div>
      </div>

      <!-- Tab 3: 测量分析 -->
      <div v-if="activeTab === 'measure'">
        <div class="section-header">
          <span class="icon">📐</span> 测量工具
        </div>
        <div class="tool-grid">
          <button class="tool-btn">📏 距离测量</button>
          <button class="tool-btn">📐 角度测量</button>
          <button class="tool-btn">⭕ 面积计算</button>
          <button class="tool-btn">📦 体积估算</button>
        </div>

        <div class="section-header">
          <span class="icon">📊</span> 分析结果
        </div>
        <div class="empty-state">
          暂无测量数据，请使用工具进行测量。
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.left-panel {
  width: 280px;
  flex-shrink: 0;
  background: #1e1e1e;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #333;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
  cursor: pointer;
  color: #888;
  border-bottom: 2px solid transparent;
}

.tab.active {
  color: #fff;
  border-bottom: 2px solid #409eff;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.section-header {
  font-size: 14px;
  color: #fff;
  margin: 15px 0 10px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon {
  color: #888;
}

.card {
  background: #2a2a2a;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
}

.card-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.card-value {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.grid-2 {
  background: #2a2a2a;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #aaa;
  border-bottom: 1px solid #333;
  padding-bottom: 8px;
}

.stat-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.stat-val {
  color: #fff;
  font-weight: bold;
}

/* New Styles */
.diagnosis-item {
  background: #2a2a2a;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
  border-left: 3px solid #e6a23c;
}

.diagnosis-title {
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
}

.diagnosis-desc {
  font-size: 12px;
  color: #ccc;
  line-height: 1.4;
  margin-bottom: 8px;
}

.diagnosis-meta {
  font-size: 11px;
  color: #888;
  text-align: right;
}

.tool-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.tool-btn {
  background: #2a2a2a;
  border: 1px solid #333;
  color: #ccc;
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  text-align: center;
}

.tool-btn:hover {
  background: #333;
  color: #fff;
  border-color: #555;
}

.empty-state {
  text-align: center;
  color: #666;
  font-size: 13px;
  padding: 30px 0;
  border: 1px dashed #333;
  border-radius: 6px;
}

/* Custom scrollbar for webkit */
.panel-content::-webkit-scrollbar {
  width: 6px;
}
.panel-content::-webkit-scrollbar-track {
  background: #1e1e1e;
}
.panel-content::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 3px;
}
</style>
