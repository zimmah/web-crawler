function normalize(url) {
    const pattern = /^(?:https?:\/\/)?(\w+\.\w+(?:\.\w+)?(?:\/\w+)?)\/?$/
    return url.match(pattern)[1]
}

export {normalize};