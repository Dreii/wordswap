export default function ShakePlayerInputError(){
  this.setState({playerInputErrorShake: true})
  this.shaker = window.setTimeout(ShakeItAllAbout.bind(this), 100)
}

export function ClearShakePlayerInput(){
  window.clearTimeout(this.shaker)
}

function ShakeItAllAbout(){
  this.setState({playerInputErrorShake: false})
}
