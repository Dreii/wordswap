export const GenerateClientData = (tags) => {
  const fauxId = Math.round(1000+Math.random()*1000)
  const fauxNameList = ['Punzal Vision', 'CRDesign + Construction', 'Kauai Juice Co.', 'Honolulu Design Co.', 'Smalltown Coffee', 'Java Kai', 'Kauai Cookie', 'Aloha Beer Co.', 'Furniture Plus Design', 'Nike', 'Majestic Casual', 'Apple']
  const fauxName = fauxNameList[Math.round(Math.random()*(fauxNameList.length-1))]
  const fauxImage = Math.random() > 0.5 ? `https://picsum.photos/114/114/?image=${Math.round(Math.random()*100)}` : ""
  const fauxWebsite = `${fauxName.replace(/[^A-Z0-9]/ig, "")}.com`.toLowerCase()
  const fauxTags = ((tags)=>{
    let amnt = Math.round(Math.random()*2)
    let arr = []
    for(let i = 0; i < amnt; i++){
      arr.push(tags[Math.round(Math.random()*(tags.length-1))])
    }
    return arr
  })(tags)

  return {
    _id: fauxId,
    name: fauxName,
    image: fauxImage,
    website: fauxWebsite,
    tags: fauxTags,
  }
}

const GenerateClientList = (amt, tags) => {
  let list = []
  for(let i=0; i<amt; i++){
    list.push(GenerateClientData(tags))
  }

  return list
}

export default GenerateClientList
