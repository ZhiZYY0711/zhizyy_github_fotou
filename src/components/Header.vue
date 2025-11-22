<template>
  <header class="header">
    <div class="header-left">
      <span class="title">文物展示与诊断平台</span>
      <span class="divider">|</span>
      <span class="subtitle">佛像头部 - 唐代</span>
    </div>
    <div class="header-right">
      <button class="btn"><i class="icon">📄</i> 导入模型</button>
      <button class="btn"><i class="icon">📊</i> 导出报告</button>
      <button class="btn"><i class="icon">💾</i> 保存</button>
      <button class="btn"><i class="icon">🔗</i> 分享</button>
      <button class="btn-icon">⚙️</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 50px;
  background-color: #1e1e1e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #333;
  color: #fff;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.title {
  font-weight: bold;
  color: #409eff; /* Example accent color */
}

.divider {
  color: #666;
}

.subtitle {
  color: #ccc;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  background: #333;
  border: 1px solid #444;
  color: #fff;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  transition: background 0.2s;
}

.btn:hover {
  background: #444;
}

.btn-icon {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
}

.btn-icon:hover {
  color: #409eff;
}
</style>
