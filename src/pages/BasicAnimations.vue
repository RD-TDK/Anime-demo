<template>
  <div class="basic-animations">
    <div class="header">
      <h1>{{ t('basicAnimations') }}</h1>
      <p>{{ t('exploreAnimations') }}</p>
    </div>
    
    <div class="animation-grid">
      <div 
        v-for="animation in animationTypes" 
        :key="animation.value"
        class="animation-card"
        @click="playAnimation(animation.value)"
      >
        <div 
          class="animation-preview"
          :class="{ 'is-playing': currentAnimation === animation.value && isPlaying }"
          :data-animation="animation.value"
        >
          <div class="demo-element"></div>
        </div>
        <div class="animation-info">
          <h3>{{ t(animation.value) }}</h3>
          <p>{{ animation.description }}</p>
        </div>
      </div>
    </div>
    
    <div class="controls">
      <button @click="togglePlay" class="control-btn primary">
        {{ isPlaying ? t('stopAnimation') : t('playAnimation') }}
      </button>
      <button @click="resetAnimation" class="control-btn secondary">{{ t('reset') }}</button>
    </div>
    
    <div class="code-section">
      <h3>Animation Code Example</h3>
      <pre class="code-block"><code>{{ currentCodeExample }}</code></pre>
    </div>
  </div>
</template>

<script>
import { useAnimationStore } from '../stores/animation'
import { useLanguageStore } from '../stores/language'
import { createAnimation } from '../utils/animal'
import { computed, onMounted, ref } from 'vue'

export default {
  name: 'BasicAnimations',
  setup() {
    const animationStore = useAnimationStore()
    const languageStore = useLanguageStore()
    const demoElement = ref(null)
    
    const t = languageStore.t
    
    const currentCodeExample = computed(() => {
      const animation = animationStore.currentAnimation
      return `// ${animationStore.animationTypes.find(a => a.value === animation)?.label}
const element = document.querySelector('.demo-element')
const animation = createAnimation(element)

animation
  .keyframes(${JSON.stringify(getKeyframes(animation), null, 2)})
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
    
    function playAnimation(animationType) {
      animationStore.setCurrentAnimation(animationType)
      
      console.log('播放动画:', animationType)
      
      // 使用更简单的选择器
      const element = document.querySelector(`.animation-preview[data-animation="${animationType}"] .demo-element`)
      console.log('找到元素:', element)
      
      if (element) {
        // 先重置元素状态，确保元素可见
        element.style.transform = ''
        element.style.opacity = '1'
        
        const keyframes = getKeyframes(animationType)
        console.log('关键帧:', keyframes)
        
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
          console.log('动画播放完成')
          animationStore.isPlaying = false
          
          // 动画结束后，强制将元素恢复到可见状态
          // 特别是对于淡出动画，确保元素重新显示
          if (animationType.includes('Out') || animationType === 'fadeOut' || animationType === 'zoomOut') {
            setTimeout(() => {
              element.style.opacity = '1'
              element.style.transform = ''
            }, 100)
          }
        }
        
        // 添加动画取消时的恢复逻辑
        animation.oncancel = () => {
          console.log('动画被取消')
          animationStore.isPlaying = false
          element.style.opacity = '1'
          element.style.transform = ''
        }
        
        console.log('动画已开始播放')
      } else {
        console.error('未找到动画元素')
      }
    }
    
    function togglePlay() {
      if (animationStore.isPlaying) {
        animationStore.isPlaying = false
      } else if (animationStore.currentAnimation) {
        playAnimation(animationStore.currentAnimation)
      }
    }
    
    function resetAnimation() {
      animationStore.resetAnimation()
      const elements = document.querySelectorAll('.demo-element')
      elements.forEach(el => {
        // 清除所有动画相关的样式，确保元素可见
        el.style.transform = ''
        el.style.opacity = '1'
        el.style.scale = ''
        el.style.rotate = ''
        el.style.translate = ''
        el.style.background = ''
        el.style.borderRadius = ''
      })
      console.log('所有动画已重置')
    }
    
    onMounted(() => {
      animationStore.setCurrentAnimation('fadeIn')
    })
    
    return {
      animationTypes: animationStore.animationTypes,
      currentAnimation: computed(() => animationStore.currentAnimation),
      isPlaying: computed(() => animationStore.isPlaying),
      currentCodeExample,
      playAnimation,
      togglePlay,
      resetAnimation,
      t
    }
  }
}
</script>

<style scoped>
.basic-animations {
  min-height: 100vh;
  padding: 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
}

[data-theme="light"] .basic-animations {
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

.animation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.animation-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.animation-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

[data-theme="light"] .animation-card {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

[data-theme="light"] .animation-card:hover {
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.animation-preview {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
}

.demo-element {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.animation-info {
  padding: 1.5rem;
}

.animation-info h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #ff6b6b;
}

.animation-info p {
  opacity: 0.8;
  line-height: 1.5;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.control-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn.primary {
  background: #4ecdc4;
  color: white;
}

.control-btn.primary:hover {
  background: #3db8af;
  transform: translateY(-2px);
}

.control-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.control-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.code-section {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .code-section {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.code-section h3 {
  margin-bottom: 1rem;
  color: #4ecdc4;
}

.code-block {
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  color: #f8f8f2;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .basic-animations {
    padding: 1rem;
  }
  
  .animation-grid {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}
</style>
