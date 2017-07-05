import Backend from '../../config/backend'

export function fetchContentByUrl(url) {
    if (url === '/' || url === '/index.html'){
        return fetch(`${Backend()}/wp-json/headless/v1/home_page`)
            .then(response => response.json())
    }
    return fetch(`${Backend()}/wp-json/headless/v1/url_to_query${url}`)
        .then(response => response.json())
}
