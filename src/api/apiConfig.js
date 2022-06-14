const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '253ee905cc28b80938c0c6ae31e78148',
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
}

export default apiConfig
