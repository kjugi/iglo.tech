import Backend from '../../config/backend'

export function urlToQuery(url) {
    return fetch(`${Backend()}/wp-json/headless/v1/url_to_query${url}`)
        .then(response => response.json())
}
