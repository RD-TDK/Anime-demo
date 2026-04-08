import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAnimationStore = defineStore('animation', () => {
  const currentAnimation = ref('fadeIn')
  const animationDuration = ref(1000)
  const animationDelay = ref(0)
  const animationIteration = ref(1)
  const animationDirection = ref('normal')
  const animationFillMode = ref('forwards')
  const isPlaying = ref(false)
  const animationHistory = ref([])

  const animationOptions = computed(() => ({
    duration: animationDuration.value,
    delay: animationDelay.value,
    iterations: animationIteration.value,
    direction: animationDirection.value,
    fill: animationFillMode.value
  }))

  const animationTypes = [
    { value: 'fadeIn', label: '淡入', description: '元素从透明逐渐变为不透明' },
    { value: 'fadeOut', label: '淡出', description: '元素从不透明逐渐变为透明' },
    { value: 'slideInLeft', label: '从左滑入', description: '元素从左侧滑入' },
    { value: 'slideInRight', label: '从右滑入', description: '元素从右侧滑入' },
    { value: 'slideInUp', label: '从下滑入', description: '元素从下方滑入' },
    { value: 'slideInDown', label: '从上滑入', description: '元素从上方滑入' },
    { value: 'zoomIn', label: '放大进入', description: '元素从小到大放大出现' },
    { value: 'zoomOut', label: '缩小退出', description: '元素从大到小缩小消失' },
    { value: 'rotateIn', label: '旋转进入', description: '元素旋转进入' },
    { value: 'bounce', label: '弹跳', description: '元素产生弹跳效果' },
    { value: 'shake', label: '抖动', description: '元素左右抖动' },
    { value: 'pulse', label: '脉冲', description: '元素产生脉冲效果' }
  ]

  function setCurrentAnimation(animation) {
    currentAnimation.value = animation
    animationHistory.value.unshift({
      animation,
      timestamp: new Date().toISOString(),
      options: { ...animationOptions.value }
    })
    if (animationHistory.value.length > 20) {
      animationHistory.value.pop()
    }
  }

  function setDuration(duration) {
    animationDuration.value = duration
  }

  function setDelay(delay) {
    animationDelay.value = delay
  }

  function setIteration(iteration) {
    animationIteration.value = iteration
  }

  function setDirection(direction) {
    animationDirection.value = direction
  }

  function setFillMode(mode) {
    animationFillMode.value = mode
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function resetAnimation() {
    isPlaying.value = false
    animationDuration.value = 1000
    animationDelay.value = 0
    animationIteration.value = 1
    animationDirection.value = 'normal'
    animationFillMode.value = 'forwards'
  }

  return {
    currentAnimation,
    animationDuration,
    animationDelay,
    animationIteration,
    animationDirection,
    animationFillMode,
    isPlaying,
    animationHistory,
    animationOptions,
    animationTypes,
    setCurrentAnimation,
    setDuration,
    setDelay,
    setIteration,
    setDirection,
    setFillMode,
    togglePlay,
    resetAnimation
  }
})
