import {JSDOM} from 'jsdom'

function normalize(url) {
    const urlObj = new URL(url)
    const {host, pathname} = urlObj
    let fullPath = `${host}${pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

function getURLsFromHTML(html, baseURL) {
    const dom = new JSDOM(html)
    const anchorElements = Array.from(dom.window.document.querySelectorAll('a'))
    const hrefs = anchorElements.map(element => element.href)
    const urls = []
    for (const href of hrefs) {
        if (href === null) continue
        try {
            const url = new URL(href, baseURL).href
            urls.push(url)
        } catch ({error, message}) {
            console.error(`${message}: ${href}`)
        }
    }
    return urls
}

async function crawlPage(baseURL, currentURL = baseURL, pages={}) {
    const currentURLHost = new URL(currentURL).hostname
    const baseURLHost = new URL(baseURL).hostname
    if (currentURLHost !== baseURLHost) {
        return pages
    }

    const normalizedCurrent = normalize(currentURL)
    if (pages[normalizedCurrent]) {
        pages[normalizedCurrent]++
        return pages
    }
    
    pages[normalizedCurrent] = 1

    console.log(`crawling ${currentURL}...`)
    let html
    try {
        html = await fetchAndParse(currentURL)
    } catch ({error, message}) {
        console.error(message)
    }

    const urls = getURLsFromHTML(html, baseURL)
    for (const url of urls) {
        pages = await crawlPage(baseURL, url, pages)
    }
    return pages
}

async function fetchAndParse (url) {
    let response
    try {
        response = await fetch(url)
    } catch ({ error, message }) {
        console.error(`Failed to fetch, with reason: ${message}`)
        throw new Error(`Got network error: ${message}`)
    }

    if (response.status >= 400) {
        console.error(`Website failed to load, status code: ${response.status}: ${response.statusText}`)
        return
    }
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.error(`Wrong content type: ${contentType}`)
        return
    }
    return await response.text()
}
export {normalize, getURLsFromHTML, crawlPage};