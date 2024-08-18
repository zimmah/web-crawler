function sortPages(pages) {
    const pagesEntries = Object.entries(pages)
    return pagesEntries.sort((a, b) => b[1] - a[1])
}

function printReport(pages) {
    const sortedPages = sortPages(pages)
    for (const [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`)
    }
}

export {printReport}