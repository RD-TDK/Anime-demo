<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="title">{{ t('welcome') }}</h1>
      <p class="subtitle">{{ t('intro') }}</p>
    </div>
    
    <div class="features-section">
      <div class="feature-grid">
        <div class="feature-card" @click="$router.push('/basic')">
          <div class="feature-icon">🎬</div>
          <h3>{{ t('basicAnimations') }}</h3>
          <p>{{ t('exploreAnimations') }}</p>
        </div>
        
        <div class="feature-card" @click="$router.push('/parameters')">
          <div class="feature-icon">⚙️</div>
          <h3>{{ t('parameterControl') }}</h3>
          <p>{{ t('exploreAnimations') }}</p>
        </div>
        
        <div class="feature-card" @click="$router.push('/advanced')">
          <div class="feature-icon">🚀</div>
          <h3>{{ t('advancedAnimations') }}</h3>
          <p>{{ t('exploreAnimations') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLanguageStore } from '../stores/language'

export default {
  name: 'Home',
  setup() {
    const languageStore = useLanguageStore()
    const t = languageStore.t
    
    return {
      t
    }
  }
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: 2rem;
  color: white;
}

[data-theme="light"] .home {
  color: #333;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-top: 200px;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.features-section {
  margin-bottom: 4rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .feature-card {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #333;
}

[data-theme="light"] .feature-card:hover {
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4ecdc4;
}

.feature-card p {
  opacity: 0.8;
  line-height: 1.6;
}

.info-section {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.info-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
}

.info-section p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.info-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .info-item {
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.info-item strong {
  display: block;
  font-size: 1.1rem;
  color: #4ecdc4;
  margin-bottom: 0.5rem;
}

.info-item span {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
