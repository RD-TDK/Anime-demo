<template>
  <div class="parameter-control">
    <div class="header">
      <h1>{{ t('parameterControl') }}</h1>
      <p>{{ t('exploreAnimations') }}</p>
    </div>
    
    <div class="content">
      <div class="controls-section">
        <div class="control-group">
          <h3>{{ t('selectAnimation') }}</h3>
          <div class="animation-selector">
            <div 
              v-for="animation in animationTypes" 
              :key="animation.value"
              class="animation-option"
              :class="{ active: currentAnimation === animation.value }"
              @click="selectAnimation(animation.value)"
            >
              {{ t(animation.value) }}
            </div>
          </div>
        </div>
        
        <div class="parameter-controls">
          <div class="control-item">
            <label>{{ t('duration') }} (ms)</label>
            <div class="slider-container">
              <input 
                type="range" 
                :min="100" 
                :max="5000" 
                :step="100"
                v-model="animationDuration"
                @input="updateAnimation"
                class="slider"
              >
              <span class="value">{{ animationDuration }}ms</span>
            </div>
          </div>
          
          <div class="control-item">
            <label>{{ t('delay') }} (ms)</label>
            <div class="slider-container">
              <input 
                type="range" 
                :min="0" 
                :max="2000" 
                :step="100"
                v-model="animationDelay"
                @input="updateAnimation"
                class="slider"
              >
              <span class="value">{{ animationDelay }}ms</span>
            </div>
          </div>
          
          <div class="control-item">
            <label>{{ t('iterations') }}</label>
            <div class="slider-container">
              <input 
                type="range" 
                :min="1" 
                :max="10" 
                :step="1"
                v-model="animationIteration"
                @input="updateAnimation"
                class="slider"
              >
              <span class="value">{{ animationIteration === 'infinite' ? 'Infinite' : animationIteration }} {{ currentLanguage === 'zh' ? '次' : 'times' }}</span>
            </div>
          </div>
          
          <div class="control-item">
            <label>{{ t('direction') }}</label>
            <div class="radio-group">
              <label v-for="direction in directionOptions" :key="direction.value">
                <input 
                  type="radio" 
                  :value="direction.value" 
                  v-model="animationDirection"
                  @change="updateAnimation"
                >
                {{ t(direction.value) }}
              </label>
            </div>
          </div>
          
          <div class="control-item">
            <label>{{ t('fillMode') }}</label>
            <div class="radio-group">
              <label v-for="mode in fillModeOptions" :key="mode.value">
                <input 
                  type="radio" 
                  :value="mode.value" 
                  v-model="animationFillMode"
                  @change="updateAnimation"
                >
                {{ t(mode.value) }}
              </label>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button @click="playAnimation" class="btn primary">
            {{ isPlaying ? t('stopAnimation') : t('playAnimation') }}
          </button>
          <button @click="resetParameters" class="btn secondary">{{ t('reset') }}</button>
        </div>
      </div>
      
      <div class="preview-section">
        <div class="preview-container">
          <div 
            class="preview-element"
            :class="{ 'is-playing': isPlaying }"
            ref="previewElement"
          ></div>
        </div>
        
        <div class="code-preview">
          <h3>{{ t('currentConfigCode') }}</h3>
          <pre class="code-block"><code>{{ currentConfigCode }}</code></pre>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { useAnimationStore } from '../stores/animation'
import { useLanguageStore } from '../stores/language'
import { createAnimation } from '../utils/animal'
import { computed, ref, onMounted } from 'vue'

export default {
  name: 'ParameterControl',
  setup() {
    const animationStore = useAnimationStore()
    const languageStore = useLanguageStore()
    const previewElement = ref(null)
    
    const t = languageStore.t
    const currentLanguage = computed(() => languageStore.currentLanguage)
    
    const directionOptions = [
      { value: 'normal' },
      { value: 'reverse' },
      { value: 'alternate' },
      { value: 'alternate-reverse' }
    ]
    
    const fillModeOptions = [
      { value: 'none' },
      { value: 'forwards' },
      { value: 'backwards' },
      { value: 'both' }
    ]
    
    const currentConfigCode = computed(() => {
      return `const animation = createAnimation(element)

animation
  .keyframes(${JSON.stringify(getKeyframes(animationStore.currentAnimation), null, 2)})
  .duration(${animationStore.animationDuration})
  .delay(${animationStore.animationDelay})
  .iterations(${animationStore.animationIteration})
  .direction('${animationStore.animationDirection}')
  .fill('${animationStore.animationFillMode}')
  .play()`
    })
    
    function getKeyframes(animationType) {
      const keyframesMap = {
        fadeIn: [{ opacity: 0 }, { opacity: 1 }],
        fadeOut: [{ opacity: 1 }, { opacity: 0 }],
        slideInLeft: [{ transform: 'translateX(-100%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
        slideInRight: [{ transform: 'translateX(100%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }],
        slideInUp: [{ transform: 'translateY(100%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        slideInDown: [{ transform: 'translateY(-100%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        zoomIn: [{ transform: 'scale(0.5)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
        zoomOut: [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0.5)', opacity: 0 }],
        rotateIn: [{ transform: 'rotate(-180deg)', opacity: 0 }, { transform: 'rotate(0deg)', opacity: 1 }],
        bounce: [
          { transform: 'translateY(0)' },
          { transform: 'translateY(-30px)' },
          { transform: 'translateY(0)' },
          { transform: 'translateY(-15px)' },
          { transform: 'translateY(0)' }
        ],
        shake: [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(0)' }
        ],
        pulse: [
          { transform: 'scale(1)' },
          { transform: 'scale(1.1)' },
          { transform: 'scale(1)' }
        ]
      }
      return keyframesMap[animationType] || keyframesMap.fadeIn
    }
    
    function getAnimationLabel(animationType) {
      const animation = animationStore.animationTypes.find(a => a.value === animationType)
      return animation ? animation.label : animationType
    }
    
    function formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString()
    }
    
    function selectAnimation(animationType) {
      animationStore.setCurrentAnimation(animationType)
      updateAnimation()
    }
    
    function updateAnimation() {
      if (animationStore.isPlaying) {
        playAnimation()
      }
    }
    
    function playAnimation() {
      if (previewElement.value) {
        const element = previewElement.value
        
        // 先重置元素状态，确保元素可见
        element.style.transform = ''
        element.style.opacity = '1'
        
        const keyframes = getKeyframes(animationStore.currentAnimation)
        
        // 直接使用 Web Animations API
        const animation = element.animate(keyframes, {
          duration: animationStore.animationDuration,
          delay: animationStore.animationDelay,
          iterations: animationStore.animationIteration,
          direction: animationStore.animationDirection,
          fill: 'none' // 设置为 none，让元素在动画结束后恢复初始状态
        })
        
        animationStore.isPlaying = true
        
        animation.onfinish = () => {
          animationStore.isPlaying = false
          
          // 动画结束后，强制将元素恢复到可见状态
          // 特别是对于淡出动画，确保元素重新显示
          if (animationStore.currentAnimation.includes('Out') || animationStore.currentAnimation === 'fadeOut' || animationStore.currentAnimation === 'zoomOut') {
            setTimeout(() => {
              element.style.opacity = '1'
              element.style.transform = ''
            }, 100)
          }
        }
        
        // 添加动画取消时的恢复逻辑
        animation.oncancel = () => {
          animationStore.isPlaying = false
          element.style.opacity = '1'
          element.style.transform = ''
        }
      }
    }
    
    function resetParameters() {
      animationStore.resetAnimation()
      if (previewElement.value) {
        const element = previewElement.value
        // 清除所有动画相关的样式，确保元素可见
        element.style.transform = ''
        element.style.opacity = '1'
        element.style.scale = ''
        element.style.rotate = ''
        element.style.translate = ''
        element.style.background = ''
        element.style.borderRadius = ''
      }
    }
    
    function loadHistory(historyItem) {
      animationStore.setCurrentAnimation(historyItem.animation)
      animationStore.setDuration(historyItem.options.duration)
      animationStore.setDelay(historyItem.options.delay)
      animationStore.setIteration(historyItem.options.iterations)
      animationStore.setDirection(historyItem.options.direction)
      animationStore.setFillMode(historyItem.options.fill)
      updateAnimation()
    }
    
    onMounted(() => {
      animationStore.setCurrentAnimation('fadeIn')
    })
    
    return {
      animationTypes: animationStore.animationTypes,
      currentAnimation: computed(() => animationStore.currentAnimation),
      animationDuration: computed({
        get: () => animationStore.animationDuration,
        set: (value) => animationStore.setDuration(Number(value))
      }),
      animationDelay: computed({
        get: () => animationStore.animationDelay,
        set: (value) => animationStore.setDelay(Number(value))
      }),
      animationIteration: computed({
        get: () => animationStore.animationIteration,
        set: (value) => animationStore.setIteration(Number(value))
      }),
      animationDirection: computed({
        get: () => animationStore.animationDirection,
        set: (value) => animationStore.setDirection(value)
      }),
      animationFillMode: computed({
        get: () => animationStore.animationFillMode,
        set: (value) => animationStore.setFillMode(value)
      }),
      isPlaying: computed(() => animationStore.isPlaying),
      animationHistory: computed(() => animationStore.animationHistory),
      directionOptions,
      fillModeOptions,
      currentConfigCode,
      previewElement,
      selectAnimation,
      updateAnimation,
      playAnimation,
      resetParameters,
      loadHistory,
      getAnimationLabel,
      formatTime,
      t,
      currentLanguage
    }
  }
}
</script>

<style scoped>
.parameter-control {
  min-height: 100vh;
  padding: 2rem;
  color: white;
  max-width: 1400px;
  margin: 0 auto;
}

[data-theme="light"] .parameter-control {
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #4ecdc4;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.controls-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

[data-theme="light"] .controls-section {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.control-group {
  margin-bottom: 2rem;
}

.control-group h3 {
  margin-bottom: 1rem;
  color: #ff6b6b;
}

.animation-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
}

.animation-option {
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.animation-option:hover {
  background: rgba(255, 255, 255, 0.2);
}

.animation-option.active {
  background: #4ecdc4;
  color: white;
  border-color: #4ecdc4;
}

.parameter-controls {
  margin-bottom: 2rem;
}

.control-item {
  margin-bottom: 1.5rem;
}

.control-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4ecdc4;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4ecdc4;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4ecdc4;
  cursor: pointer;
  border: none;
}

.value {
  min-width: 60px;
  text-align: right;
  font-weight: 600;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

.radio-group input[type="radio"] {
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.btn.primary {
  background: #4ecdc4;
  color: white;
}

.btn.primary:hover {
  background: #3db8af;
  transform: translateY(-2px);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.preview-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.preview-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-element {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.code-preview {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.code-preview h3 {
  margin-bottom: 1rem;
  color: #4ecdc4;
}

.code-block {
  background: #1a1a1a;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  color: #f8f8f2;
  line-height: 1.4;
  font-size: 0.9rem;
}

.history-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.history-section h3 {
  margin-bottom: 1rem;
  color: #4ecdc4;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.animation-name {
  font-weight: 600;
}

.time {
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 1024px) {
  .content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .parameter-control {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .animation-selector {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>
