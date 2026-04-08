<template>
  <div class="advanced-animations">
    <div class="header">
      <h1>{{ t('advancedAnimations') }}</h1>
      <p>{{ t('exploreAnimations') }}</p>
    </div>
    
    <div class="animation-showcase">
      <div class="showcase-item">
        <h3>{{ t('sequenceAnimation') }}</h3>
        <div class="demo-container">
          <div class="sequence-demo">
            <div 
              v-for="i in 5" 
              :key="i"
              class="sequence-element"
              :data-index="i"
              @click="playSequenceAnimation"
            ></div>
          </div>
        </div>
        <button @click="playSequenceAnimation" class="demo-btn">{{ t('playAnimation') }}</button>
      </div>
      
      <div class="showcase-item">
        <h3>{{ t('staggerAnimation') }}</h3>
        <div class="demo-container">
          <div class="stagger-demo">
            <div 
              v-for="i in 8" 
              :key="i"
              class="stagger-element"
              :data-index="i"
              @click="playStaggerAnimation"
            ></div>
          </div>
        </div>
        <button @click="playStaggerAnimation" class="demo-btn">{{ t('playAnimation') }}</button>
      </div>
      
      <div class="showcase-item">
        <h3>{{ t('pathAnimation') }}</h3>
        <div class="demo-container">
          <div class="path-demo">
            <svg class="path-svg" viewBox="0 0 200 100">
              <path 
                d="M10,50 Q100,10 190,50" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                stroke-width="2"
              />
            </svg>
            <div 
              class="path-element"
              @click="playPathAnimation"
              ref="pathElement"
            ></div>
          </div>
        </div>
        <button @click="playPathAnimation" class="demo-btn">{{ t('playAnimation') }}</button>
      </div>
      
      <div class="showcase-item">
        <h3>{{ t('comboAnimation') }}</h3>
        <div class="demo-container">
          <div class="combo-demo">
            <div 
              class="combo-element"
              @click="playComboAnimation"
              ref="comboElement"
            ></div>
          </div>
        </div>
        <button @click="playComboAnimation" class="demo-btn">{{ t('playAnimation') }}</button>
      </div>
    </div>
    
    <div class="code-examples">
      <h2>Advanced Animation Code Examples</h2>
      <div class="code-tabs">
        <div 
          v-for="(example, index) in codeExamples" 
          :key="index"
          class="code-tab"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ t(example.key) }}
        </div>
      </div>
      <div class="code-content">
        <pre class="code-block"><code>{{ codeExamples[activeTab].code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { createAnimation } from '../utils/animal'
import { useLanguageStore } from '../stores/language'
import { ref, onMounted } from 'vue'

export default {
  name: 'AdvancedAnimations',
  setup() {
    const languageStore = useLanguageStore()
    const t = languageStore.t
    
    const pathElement = ref(null)
    const comboElement = ref(null)
    const activeTab = ref(0)
    const pathAnimation = ref(null)
    const comboAnimation = ref(null)
    const isPathPlaying = ref(false)
    const isComboPlaying = ref(false)
    
    const codeExamples = [
      {
        key: 'sequenceAnimation',
        code: `// Sequence Animation Example
const elements = document.querySelectorAll('.sequence-element')

async function playSequence() {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    
    // Reset element state
    element.style.transform = ''
    element.style.opacity = '1'
    
    const animation = element.animate([
      { transform: 'scale(0.5)', opacity: 0 },
      { transform: 'scale(1.2)', opacity: 1 },
      { transform: 'scale(1)', opacity: 1 }
    ], {
      duration: 600,
      fill: 'none'
    })
    
    await animation.finished
  }
}`
      },
      {
        key: 'staggerAnimation',
        code: `// Stagger Animation Example
const elements = document.querySelectorAll('.stagger-element')

function playStagger() {
  elements.forEach((element, index) => {
    // Reset element state
    element.style.transform = ''
    
    element.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-20px)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 800,
      delay: index * 100,
      iterations: 3,
      fill: 'none'
    })
  })
}`
      },
      {
        key: 'pathAnimation',
        code: `// Path Animation Example
const element = document.querySelector('.path-element')

function playPath() {
  if (element) {
    // Reset element state
    element.style.transform = ''
    
    element.animate([
      { 
        transform: 'translate(0px, 0px)',
        offset: 0 
      },
      { 
        transform: 'translate(180px, -40px)',
        offset: 1 
      }
    ], {
      duration: 2000,
      iterations: 1,
      direction: 'normal',
      fill: 'forwards'
    })
  }
}`
      },
      {
        key: 'comboAnimation',
        code: `// Combo Animation Example
const element = document.querySelector('.combo-element')

function playCombo() {
  if (element) {
    // Reset element state
    element.style.transform = ''
    element.style.background = ''
    element.style.borderRadius = ''
    
    element.animate([
      { 
        transform: 'rotate(0deg) scale(1)',
        background: '#ff6b6b',
        borderRadius: '12px'
      },
      { 
        transform: 'rotate(180deg) scale(1.5)',
        background: '#4ecdc4',
        borderRadius: '50%'
      },
      { 
        transform: 'rotate(360deg) scale(1)',
        background: '#ff6b6b',
        borderRadius: '12px'
      }
    ], {
      duration: 3000,
      iterations: 1,
      fill: 'forwards'
    })
  }
}`
      }
    ]
    
    async function playSequenceAnimation() {
      const elements = document.querySelectorAll('.sequence-element')
      
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        
        // 重置元素状态
        element.style.transform = ''
        element.style.opacity = '1'
        
        const animation = element.animate([
          { transform: 'scale(0.5)', opacity: 0 },
          { transform: 'scale(1.2)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 600,
          fill: 'none'
        })
        
        await animation.finished
      }
    }
    
    function playStaggerAnimation() {
      const elements = document.querySelectorAll('.stagger-element')
      
      elements.forEach((element, index) => {
        // 重置元素状态
        element.style.transform = ''
        
        element.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-20px)' },
          { transform: 'translateY(0)' }
        ], {
          duration: 800,
          delay: index * 100,
          iterations: 3,
          fill: 'none'
        })
      })
    }
    
    function playPathAnimation() {
      if (pathElement.value) {
        const element = pathElement.value
        
        // 如果动画正在播放，先停止
        if (pathAnimation.value) {
          pathAnimation.value.cancel()
        }
        
        // 重置元素状态
        element.style.transform = ''
        
        pathAnimation.value = element.animate([
          { 
            transform: 'translate(0px, 0px)',
            offset: 0 
          },
          { 
            transform: 'translate(180px, -40px)',
            offset: 1 
          }
        ], {
          duration: 2000,
          iterations: 1, // 只播放一次
          direction: 'normal',
          fill: 'forwards' // 播放完成后保持结束状态
        })
        
        isPathPlaying.value = true
        
        pathAnimation.value.onfinish = () => {
          isPathPlaying.value = false
          // 动画完成后，将元素恢复到初始位置
          setTimeout(() => {
            element.style.transform = ''
          }, 500)
        }
        
        pathAnimation.value.oncancel = () => {
          isPathPlaying.value = false
          element.style.transform = ''
        }
      }
    }
    
    function playComboAnimation() {
      if (comboElement.value) {
        const element = comboElement.value
        
        // 如果动画正在播放，先停止
        if (comboAnimation.value) {
          comboAnimation.value.cancel()
        }
        
        // 重置元素状态
        element.style.transform = ''
        element.style.background = ''
        element.style.borderRadius = ''
        
        comboAnimation.value = element.animate([
          { 
            transform: 'rotate(0deg) scale(1)',
            background: '#ff6b6b',
            borderRadius: '12px'
          },
          { 
            transform: 'rotate(180deg) scale(1.5)',
            background: '#4ecdc4',
            borderRadius: '50%'
          },
          { 
            transform: 'rotate(360deg) scale(1)',
            background: '#ff6b6b',
            borderRadius: '12px'
          }
        ], {
          duration: 3000,
          iterations: 1, // 只播放一次
          fill: 'forwards' // 播放完成后保持结束状态
        })
        
        isComboPlaying.value = true
        
        comboAnimation.value.onfinish = () => {
          isComboPlaying.value = false
          // 动画完成后，将元素恢复到初始状态
          setTimeout(() => {
            element.style.transform = ''
            element.style.background = ''
            element.style.borderRadius = ''
          }, 500)
        }
        
        comboAnimation.value.oncancel = () => {
          isComboPlaying.value = false
          element.style.transform = ''
          element.style.background = ''
          element.style.borderRadius = ''
        }
      }
    }
    
    onMounted(() => {
      // 页面加载时不自动播放动画，由用户手动控制
    })
    
    return {
      pathElement,
      comboElement,
      activeTab,
      codeExamples,
      playSequenceAnimation,
      playStaggerAnimation,
      playPathAnimation,
      playComboAnimation,
      isPathPlaying,
      isComboPlaying,
      t
    }
  }
}
</script>

<style scoped>
.advanced-animations {
  min-height: 100vh;
  padding: 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
}

[data-theme="light"] .advanced-animations {
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

.animation-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.showcase-item {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

[data-theme="light"] .showcase-item {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.showcase-item h3 {
  margin-bottom: 1rem;
  color: #ff6b6b;
  font-size: 1.3rem;
}

.demo-container {
  margin-bottom: 1rem;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sequence-demo {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.sequence-element {
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sequence-element:hover {
  transform: scale(1.1);
}

.stagger-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  width: 100%;
}

.stagger-element {
  width: 100%;
  height: 20px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stagger-element:hover {
  transform: scaleY(1.2);
}

.path-demo {
  position: relative;
  width: 200px;
  height: 100px;
}

.path-svg {
  width: 100%;
  height: 100%;
}

.path-element {
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: 20px;
  background: #ff6b6b;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.path-element:hover {
  transform: translate(-50%, -50%) scale(1.2);
}

.combo-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.combo-element {
  width: 60px;
  height: 60px;
  background: #ff6b6b;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.combo-element:hover {
  transform: scale(1.1);
}

.demo-btn {
  padding: 0.5rem 1rem;
  background: #4ecdc4;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.demo-btn:hover {
  background: #3db8af;
  transform: translateY(-2px);
}

.code-examples {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.code-examples h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #4ecdc4;
}

.code-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.code-tab {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.code-tab:hover {
  background: rgba(255, 255, 255, 0.2);
}

.code-tab.active {
  background: #4ecdc4;
  color: white;
  border-color: #4ecdc4;
}

.code-content {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  overflow: hidden;
}

.code-block {
  background: #1a1a1a;
  padding: 1.5rem;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  color: #f8f8f2;
  line-height: 1.5;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .advanced-animations {
    padding: 1rem;
  }
  
  .animation-showcase {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .code-tabs {
    flex-direction: column;
  }
  
  .code-tab {
    text-align: center;
  }
}
</style>
