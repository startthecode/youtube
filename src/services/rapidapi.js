import axios from 'axios';
let baseURL = 'https://youtube138.p.rapidapi.com/'


export async function fetchingData(url,searchQuery = null){
let data;

    const options = {
        method: 'GET',
        url: `${baseURL}${url}/`,
        params:searchQuery ? {
          ...searchQuery,
          hl: 'en',
          gl: 'US'

        }:{  
          
          hl: 'en',
          gl: 'US'},

        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_KEY,  
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };

	const response = await axios.request(options);

  
    data = await response.data

return data
}


export async function forHome(){
  let data = await fetchingData('home');
return data.contents;
}


export async function forSuggetions(param){

  let data = await fetchingData('search',{q:param});

return data.contents;
}


export async function autoComplete(param){

  let data = await fetchingData('auto-complete',{q:param});

return data.results;
}


export async function VideoDTL(param){

  let data = await fetchingData('auto-complete',{id:param});

return data.results;
}

export async function relatedVideos(param){

  let data = await fetchingData('video/related-contents',{id:param});

return data.contents;
}



export async function VideoComments(param){

  let data = await fetchingData('video/comments',{id:param});

return data.comments;
}



export async function VideoDetails(param){

  let data = await fetchingData('video/details',{id:param});

return data;
}


export async function channelDetails(param){


  let data = await fetchingData('channel/details',{id:param});
return data;
}

export async function channelVideos(param){
console.log('videoList')

 try{
  let fetchedData = await fetchingData('channel/videos',{id:param});
let {contents:videoList} = fetchedData
let data = videoList.filter(val=> val.type === 'video').map(val=> val.video)

  return data;

 }catch(err){
throw new Error('Failed to fetch')
 }
 
}


// export async function channelsubChannels(param){
//   console.log('videoList')
  
//    try{
//     let fetchedData = await fetchingData('channel/channels',{id:param});
//   let {contents:videoList} = fetchedData
//   // let data = videoList.filter(val=> val.type === 'channel').map(val=> val.channel)
//   console.log(fetchedData)
//     // return data;
  
//    }catch(err){
//   console.log(err)

//   throw new Error('Failed to fetch')
//    }
   
//   }
  





