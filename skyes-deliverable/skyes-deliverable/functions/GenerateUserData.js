// import GenerateTagList from './GenerateTagData'
const GenerateUserData = (tags) => {
  const fauxId = Math.round(1000+Math.random()*1000)
  const fauxNameList = ['Matt Inglis', 'Sean Verhaagen', 'Steve Massaro', 'Tobi Mcguire', 'Adrienne Wilson', 'Logan Alcott', 'Leila Hubbard', 'Ian Ross', 'Skye Aoki', 'Sarah Reggis', 'Don Juan', 'Wilson']
  const fauxName = fauxNameList[Math.round(Math.random()*(fauxNameList.length-1))]
  const fauxImage = Math.random() > 0.3 ? `https://picsum.photos/114/114/?image=${10+Math.round(Math.random()*100)}` : ""
  const fauxLevel = Math.random() > 0.9 ? "admin" : "user"
  const fauxRoleList = ['Graphic Designer', 'UI Designer', 'UX Designer', 'Writer', 'Javascript Developer', 'CEO', 'Marketing Director', 'Backend Developer', 'Frontend Developer', 'Mobile Developer', 'Brand Manager']
  const fauxRole = fauxRoleList[Math.round(Math.random()*(fauxRoleList.length-1))]
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
    level: fauxLevel,
    tags: fauxTags,
    role: fauxRole
  }
}

const GenerateTeamList = (amt, tags) => {
  let list = []
  for(let i=0; i<amt; i++){
    list.push(GenerateUserData(tags))
  }
  list[list.length-1].level = "admin"
  return list
}

export default GenerateTeamList
