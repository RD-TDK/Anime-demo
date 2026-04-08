<template>
  <button 
    class="language-toggle"
    @click="toggleLanguage"
    :title="currentLanguage === 'zh' ? 'Switch to English' : '切换到中文'"
  >
    <span class="language-text">{{ currentLanguage === 'zh' ? 'EN' : '中文' }}</span>
  </button>
</template>

<script>
import { useLanguageStore } from '../stores/language'
import { computed } from 'vue'

export default {
  name: 'LanguageToggle',
  setup() {
    const languageStore = useLanguageStore()
    
    const currentLanguage = computed(() => languageStore.currentLanguage)
    
    function toggleLanguage() {
      languageStore.toggleLanguage()
    }
    
    return {
      currentLanguage,
      toggleLanguage
    }
  }
}
</script>

<style scoped>
.language-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.language-text {
  font-weight: 600;
}

[data-theme="light"] .language-toggle {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #666;
}

[data-theme="light"] .language-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}
</style>