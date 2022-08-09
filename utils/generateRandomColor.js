const COLOR_RANGE = (256 * 256 * 256) - 1

const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * COLOR_RANGE).toString(16)
}

export default generateRandomColor