<template>
  <div class="debug-box" :class="{ minimized }" @click="minimized = !minimized">
    <div v-if="!minimized">
      <div class="debug-header">
        🔍 Debug Info
        <span class="close">✕</span>
      </div>
      <div class="debug-content">
        <slot></slot>
      </div>
    </div>
    <div v-else class="debug-icon">🔍</div>
  </div>
</template>

<script>
export default {
  name: 'DebugBox',
  data() {
    return {
      minimized: false
    };
  }
};
</script>

<style scoped>
.debug-box {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #ffeb3b;
  border: 2px solid #333;
  border-radius: 4px;
  z-index: 9999;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.debug-header {
  padding: 8px 12px;
  font-weight: bold;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
}

.debug-content {
  padding: 8px 12px;
  max-height: 400px;
  overflow-y: auto;
}

.debug-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.close {
  cursor: pointer;
}
</style>