const body = document.body
const btn = document.querySelector('#toggle')
const text = document.querySelector('#theme')
const Light = 'light'
const Dark = 'dark'

let themeDom = new Proxy(text, {
  set(target, property, value, receiver) {
    if (property === 'theme') {
      body.classList.toggle(Dark)
      target.innerText = value
    }
    return Reflect.set(target, property, value, receiver)
  },
  get(target, property, receiver) {
    if (property === 'theme') {
      return target.innerText.toLowerCase()
    }
    return Reflect.get(target, property, receiver)
  }
})

function toggle(isDark) {
  if (typeof isDark === 'undefined') {
    const prevTheme = themeDom.theme
    isDark = prevTheme === Light
  }
  const next = isDark? Dark: Light

  themeDom.theme = next
  isDark && updateImagePos(0, 0)
  window[!isDark? 'removeEventListener': 'addEventListener']('mousemove', handleMouseMove)

  return next
}

function updateImagePos(x, y) {
  body.style.backgroundPositionX = `${x - 250}px`
  body.style.backgroundPositionY = `${y - 250}px`
}

function handleMouseMove(e) {
  const { pageX, pageY } = e
  updateImagePos(pageX, pageY)
}

btn.addEventListener('click', () => {
  toggle()
})

;(function init() {
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark && toggle(true)
})()
