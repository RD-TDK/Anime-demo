class AnimalJS {
  constructor(element) {
    this.element = element
    this.animation = null
    this.options = {
      duration: 1000,
      delay: 0,
      iterations: 1,
      direction: 'normal',
      fill: 'forwards'
    }
    this.keyframes = []
    this.isPlaying = false
  }

  keyframes(keyframes) {
    this.keyframes = keyframes
    return this
  }

  duration(duration) {
    this.options.duration = duration
    return this
  }

  delay(delay) {
    this.options.delay = delay
    return this
  }

  iterations(iterations) {
    this.options.iterations = iterations
    return this
  }

  direction(direction) {
    this.options.direction = direction
    return this
  }

  fill(fill) {
    this.options.fill = fill
    return this
  }

  play() {
    if (!this.keyframes || this.keyframes.length === 0) {
      console.error('No keyframes defined')
      return this
    }

    // 重置元素状态
    this.resetElement()
    
    // 使用 Web Animations API
    this.animation = this.element.animate(this.keyframes, {
      duration: this.options.duration,
      delay: this.options.delay,
      iterations: this.options.iterations,
      direction: this.options.direction,
      fill: this.options.fill
    })

    this.isPlaying = true

    // 动画结束后的处理
    this.animation.onfinish = () => {
      this.isPlaying = false
      // 根据 fill 模式设置最终状态
      if (this.options.fill === 'forwards' || this.options.fill === 'both') {
        const lastKeyframe = this.keyframes[this.keyframes.length - 1]
        this.applyStyles(lastKeyframe)
      }
    }

    this.animation.oncancel = () => {
      this.isPlaying = false
      this.resetElement()
    }

    return this
  }

  // 应用样式到元素
  applyStyles(styles) {
    Object.keys(styles).forEach(property => {
      if (property === 'offset') return
      this.element.style[property] = styles[property]
    })
  }

  // 重置元素状态
  resetElement() {
    // 清除所有动画相关的样式
    this.element.style.transform = ''
    this.element.style.opacity = ''
    this.element.style.scale = ''
    this.element.style.rotate = ''
    this.element.style.translate = ''
    this.element.style.background = ''
    this.element.style.borderRadius = ''
  }

  // 停止动画
  stop() {
    if (this.animation) {
      this.animation.cancel()
      this.isPlaying = false
    }
    return this
  }

  // 完成 Promise
  get finished() {
    return this.animation ? this.animation.finished : Promise.resolve()
  }

  // 事件监听
  onfinish(callback) {
    if (this.animation) {
      this.animation.onfinish = callback
    }
    return this
  }

  oncancel(callback) {
    if (this.animation) {
      this.animation.oncancel = callback
    }
    return this
  }

  onstart(callback) {
    if (this.animation) {
      this.animation.onstart = callback
    }
    return this
  }
}

// 创建动画实例
export function createAnimation(element) {
  return new AnimalJS(element)
}

// 预定义动画配置
export const animations = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 }
  ],
  fadeOut: [
    { opacity: 1 },
    { opacity: 0 }
  ],
  slideInLeft: [
    { transform: 'translateX(-100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
  ],
  slideInRight: [
    { transform: 'translateX(100%)', opacity: 0 },
    { transform: 'translateX(0)', opacity: 1 }
  ],
  slideInUp: [
    { transform: 'translateY(100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ],
  slideInDown: [
    { transform: 'translateY(-100%)', opacity: 0 },
    { transform: 'translateY(0)', opacity: 1 }
  ],
  zoomIn: [
    { transform: 'scale(0.5)', opacity: 0 },
    { transform: 'scale(1)', opacity: 1 }
  ],
  zoomOut: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: 'scale(0.5)', opacity: 0 }
  ],
  rotateIn: [
    { transform: 'rotate(-180deg)', opacity: 0 },
    { transform: 'rotate(0deg)', opacity: 1 }
  ],
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

export const animationNames = Object.keys(animations)
