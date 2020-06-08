const NEWS_API_URL = `http://newsapi.org/v2/`;
const NEWS_API_KEY = `87ef4069c9734fccb5e8dc32bd0a83e7`;

export const getHeadlines = (callback, callbackError, country = "us", page = 1, pageSize = 10) => {
    let url = NEWS_API_URL + 
    `top-headlines?` +
    `country=${country}&` +
    `page=${page}&` +
    `pageSize=${pageSize}&` +
    `apiKey=${NEWS_API_KEY}`;
    let request = new Request(url);

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
            callback(request, result)
        },
        (error) => {
            callbackError(request, error)
        }
    );
}

export const getEverything = (callback, callbackError, q="*", page = 1, pageSize = 10) => {
    if (q === "") {
        q = "*";
    }
   
    let url = NEWS_API_URL + 
    `everything?` +
    `q=${q}&` +
    `sortBy=publishedAt&` +
    `page=${page}&` +
    `pageSize=${pageSize}&` +
    `apiKey=${NEWS_API_KEY}`;
    let request = new Request(url);

    fetch(request)
      .then(res => res.json())
      .then(
        (result) => {
            callback(request, result)
        },
        (error) => {
            callbackError(request, error)
        }
    );
}