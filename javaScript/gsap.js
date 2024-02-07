const words = ['Забор из проф настила', 'Металический штакетник', 'Забор из сетки рабицы', 'Монолитно-кирпичный забор', 'Профильный забор', 'Панельный забор', 'Оцинкованные заборы', 'Забор для дачи', 'Заборы для дома', 'Заборы для котеджа', 'Ограничения для спортплощадок', 'Ограничение для парковок']

let mainTimeLine = gsap.timeline({
  repeat: -1
})

words.forEach(word => {
  let textTimeLine = gsap.timeline({
    repeat: 1,
    yoyo: true, 
    repeatDelay: 2
  })
  textTimeLine.to("#typewrite", {
    text: word,
    duration: 1,
    onUpdate: () => {
      cursorTimeLine.restart()
      cursorTimeLine.pause()
    },
    onComplete: () => {
      cursorTimeLine.play()
    }
  })
  
  mainTimeLine.add(textTimeLine)
})  

let cursorTimeLine = gsap.timeline({
  repeat: -1,
  repeatDelay: .8
})

cursorTimeLine.to("#cursor", {
  opacity: 1,
  duration: 0
}).to("#cursor", {
  opacity: 0,
  duration: 0,
  delay: .8
})