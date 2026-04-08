<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="logo" @click="$router.push('/')">
        <span class="logo-icon">🐾</span>
        <span class="logo-text">AnimeJS Demo</span>
      </div>
      
      <div class="nav-links">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: $route.path === link.path }"
        >
          {{ t(link.label) }}
        </router-link>
      </div>
      
      <div class="nav-actions">
        <LanguageToggle />
        <button @click="toggleTheme" class="theme-toggle">
          {{ isDarkTheme ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useLanguageStore } from '../stores/language'
import LanguageToggle from './LanguageToggle.vue'

export default {
  name: 'Navigation',
  components: {
    LanguageToggle
  },
  setup() {
    const isDarkTheme = ref(true)
    const languageStore = useLanguageStore()
    
    const t = languageStore.t
    
    const navLinks = [
      { path: '/', label: 'home' },
      { path: '/basic', label: 'basicAnimations' },
      { path: '/parameters', label: 'parameterControl' },
      { path: '/advanced', label: 'advancedAnimations' }
    ]
    
    function toggleTheme() {
      isDarkTheme.value = !isDarkTheme.value
      document.documentElement.setAttribute('data-theme', isDarkTheme.value ? 'dark' : 'light')
    }
    
    onMounted(() => {
      document.documentElement.setAttribute('data-theme', 'dark')
    })
    
    return {
      navLinks,
      isDarkTheme,
      toggleTheme,
      t
    }
  }
}
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .navigation {
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .logo {
  color: #666;
}

[data-theme="light"] .nav-link {
  color: rgba(0, 0, 0, 0.7);
}

[data-theme="light"] .nav-link:hover {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
}

[data-theme="light"] .nav-link.active {
  color: #333;
  background: rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .theme-toggle {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #666;
}

[data-theme="light"] .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>
