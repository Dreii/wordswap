const RandomSeed = (seed) => {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export default RandomSeed
