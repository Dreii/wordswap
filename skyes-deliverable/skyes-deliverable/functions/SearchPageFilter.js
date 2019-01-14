const SearchPageFilter = (searchString, filter, data, tags, dataName, searchSecond) => {
  //if there is text in the searchString, filter through each entry in data,
  //returning any datapoint that contains the search string
  searchString = searchString.toLowerCase()

  if(searchString !== "") data = data.filter((point)=>{
    console.log(searchString, point[searchSecond].toLowerCase(), point[searchSecond].toLowerCase().includes(searchString))
    return(
      point.name.toLowerCase().includes(searchString)
        ||
      point[searchSecond].toLowerCase().includes(searchString)
    )
  })

  //if there are any tags selected in the filter, filter through the tags to find only those selected.
  if(filter.length > 0) tags = tags.filter((tag, i)=>{
    return filter.includes(i)
  })

  //if there are any tags left after filtering, filter through the remaining tags,
  //and filter out any data in the tag collection that doesnt fit the search filter
  tags = tags ? tags.map((tag, i) => ({
    [dataName]: data.filter((point) => point.tags.filter(dataTag => dataTag.name === tag.name).length > 0),
    ...tag
  })):[]

  // clientTagData.sort((a, b) => a.clients.length > 0 ? -1 : 1)

  return {
    points: data,
    tags,
  }
}

export default SearchPageFilter
