const getDemoData = (data, qty) => {
  let result = []
  for (let i = 1; i<qty; i++) {
    result.push({...data, id:i})
  }
  return result
}

const soundDemo = {
  title:'sound',
  srcImage:'./images/christmas-tree.png',
  srcSound:'',
  active: false,
  volume: 5,
}

const screenDemo = {
  title:'screen',
  srcImage:'./images/christmas-tree.png'
}

const moodDemo = {
  title: 'mood',
  video: screenDemo,
  sounds: getDemoData(soundDemo, 4)
}



export const soundList = getDemoData(soundDemo, 15)

export const screenList = getDemoData(screenDemo, 15)

export const moodList = getDemoData(moodDemo, 7)
