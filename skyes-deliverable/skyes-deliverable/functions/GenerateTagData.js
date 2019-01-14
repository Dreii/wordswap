const fauxNameList = (type, amnt) =>{
  let arr = []
  switch(type){
    case "clients": arr = ["retainer", "hourly", "credit", 'low budget', 'prospective']
    break
    case "projects": arr = ['Website', 'Brand', 'Logo', 'App', 'Consulting']
    break
    case "people": arr = ['Business Owner', 'Primary Contact', 'Purchaser', 'Developer', "teamate"]
    break
    default: arr = []
  }

  for(let i = 0; i < amnt; i++){
    shuffle(arr)
    arr.pop()
  }

  return arr
}

export const TagColors = [
  '#3c6382',
  '#4a69bd',
  '#6a89cc',
  '#079992',
  '#78e08f',
  '#b8e994',
  '#f6b93b',
  '#f8c291',
  '#e58e26',
  '#e55039',
  '#eb2f06',
  '#b71540',
]

const GenerateTagList = (type, amnt) => {
  let names = fauxNameList(type, amnt)
  return names.map((name)=> {
    let fauxColor = TagColors[Math.round(Math.random()*(TagColors.length-1))]
    return {name, color: fauxColor}
  })
}


function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

export default GenerateTagList
