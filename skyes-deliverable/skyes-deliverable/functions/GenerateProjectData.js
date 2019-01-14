export const GenerateProjectData = (client, team, tags) => {
  const fauxId = Math.round(1000+Math.random()*1000)
  const fauxNameList = ['Big Sky Website: Phase II', 'Big Logs', 'Workplace', 'Work Flow', 'Next Facebook', 'Instagram Killer', 'Wordswap', 'Clean website', 'Rebranding Project', 'Conquer the world', 'Move offices', 'Create app']
  const fauxName = fauxNameList[Math.round(Math.random()*(fauxNameList.length-1))]
  const fauxImage = Math.random() > 0.3 ? `https://picsum.photos/114/114/?image=${Math.round(Math.random()*100)}` : ""
  // const fauxTagList = [null, null, null, null, 'Website', 'App', 'Brand', 'Logo']
  // const fauxTag = fauxTagList[Math.round(Math.random()*(fauxTagList.length-1))]
  const fauxClientId = client._id
  const fauxClientName = client.name
  const fauxTeamMembersList = team.filter((member, i)=>{
    switch(Math.round(Math.random()*3)){
      case 0: return member._id % 2
      case 1: return i % 2
      case 2: return !(i % 2)
      case 3: return !(member.id % 2)
      default: return member._id % 2
    }
  })
  const fauxTag = ((tags)=>{
    let arr = []
    arr.push(tags[Math.round(Math.random()*(tags.length-1))])
    return arr
  })(tags)

  return {
    _id: fauxId,
    name: fauxName,
    image: fauxImage,
    // tag: fauxTags,
    clientId: fauxClientId,
    clientName: fauxClientName,
    projectTeam: fauxTeamMembersList,
    tags: fauxTag,
  }
}

const GenerateProjectList = (clientList, amntPerClient, teamList, tags) => {
  let list = []
  clientList.forEach((client, i)=>{
    for(let j=0; j<amntPerClient; j++){
      list.push(GenerateProjectData(client, teamList, tags))
    }
  })

  return list
}

export default GenerateProjectList
