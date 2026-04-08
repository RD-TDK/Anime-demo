import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 语言包定义
export const translations = {
  zh: {
    // 通用
    home: '首页',
    basicAnimations: '基础动画',
    parameterControl: '参数控制',
    advancedAnimations: '高级动画',
    playAnimation: '播放动画',
    stopAnimation: '停止动画',
    reset: '重置',
    duration: '持续时间',
    delay: '延迟',
    iterations: '重复次数',
    direction: '方向',
    fillMode: '填充模式',
    
    // 首页
    welcome: '欢迎使用 AnimeJS 动画演示',
    intro: '这是一个展示 AnimeJS 常见动画效果的演示项目',
    exploreAnimations: '探索动画效果',
    
    // 基础动画
    fadeIn: '淡入',
    fadeOut: '淡出',
    slideInLeft: '左侧滑入',
    slideInRight: '右侧滑入',
    slideInUp: '上滑入',
    slideInDown: '下滑入',
    zoomIn: '放大进入',
    zoomOut: '缩小退出',
    rotateIn: '旋转进入',
    bounce: '弹跳',
    shake: '抖动',
    pulse: '脉冲',
    
    // 参数控制
    selectAnimation: '选择动画类型',
    currentConfigCode: '当前配置代码',
    animationHistory: '动画历史',
    
    // 高级动画
    sequenceAnimation: '序列动画',
    staggerAnimation: '交错动画',
    pathAnimation: '路径动画',
    comboAnimation: '组合动画',
    
    // 方向选项
    normal: '正常',
    reverse: '反向',
    alternate: '交替',
    alternateReverse: '反向交替',
    
    // 填充模式选项
    none: '无',
    forwards: '保持结束状态',
    backwards: '保持开始状态',
    both: '双向保持'
  },
  en: {
    // 通用
    home: 'Home',
    basicAnimations: 'Basic Animations',
    parameterControl: 'Parameter Control',
    advancedAnimations: 'Advanced Animations',
    playAnimation: 'Play Animation',
    stopAnimation: 'Stop Animation',
    reset: 'Reset',
    duration: 'Duration',
    delay: 'Delay',
    iterations: 'Iterations',
    direction: 'Direction',
    fillMode: 'Fill Mode',
    
    // 首页
    welcome: 'Welcome to AnimeJS Animation Demo',
    intro: 'This is a demonstration project showcasing common AnimeJS animation effects',
    exploreAnimations: 'Explore Animation Effects',
    
    // 基础动画
    fadeIn: 'Fade In',
    fadeOut: 'Fade Out',
    slideInLeft: 'Slide In Left',
    slideInRight: 'Slide In Right',
    slideInUp: 'Slide In Up',
    slideInDown: 'Slide In Down',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    rotateIn: 'Rotate In',
    bounce: 'Bounce',
    shake: 'Shake',
    pulse: 'Pulse',
    
    // 参数控制
    selectAnimation: 'Select Animation Type',
    currentConfigCode: 'Current Configuration Code',
    animationHistory: 'Animation History',
    
    // 高级动画
    sequenceAnimation: 'Sequence Animation',
    staggerAnimation: 'Stagger Animation',
    pathAnimation: 'Path Animation',
    comboAnimation: 'Combo Animation',
    
    // 方向选项
    normal: 'Normal',
    reverse: 'Reverse',
    alternate: 'Alternate',
    alternateReverse: 'Alternate Reverse',
    
    // 填充模式选项
    none: 'None',
    forwards: 'Forwards',
    backwards: 'Backwards',
    both: 'Both'
  }
}

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('zh') // 默认中文
  
  // 切换语言
  function setLanguage(lang) {
    if (translations[lang]) {
      currentLanguage.value = lang
    }
  }
  
  // 切换中英文
  function toggleLanguage() {
    currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
  }
  
  // 获取翻译文本
  const t = computed(() => (key) => {
    return translations[currentLanguage.value]?.[key] || key
  })
  
  return {
    currentLanguage,
    setLanguage,
    toggleLanguage,
    t
  }
})