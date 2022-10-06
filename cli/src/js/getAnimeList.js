async function getAnimeT() {

    const animeId = Math.floor(Math.random() * (5000 - 1) + 1)
    const url = `https://kitsu.io/api/edge/anime/1`

    // GET request using fetch with error handling
    let data = await fetch(url)
    data = await data.json();    
    return data
}

export default getAnimeT;