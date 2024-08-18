import {test, expect} from "@jest/globals";
import { getURLsFromHTML, normalize } from "./crawl.js";

const urls = ['https://blog.boot.dev/path/',
'https://blog.boot.dev/path',
'http://blog.boot.dev/path/',
'http://blog.boot.dev/path',
'blog.boot.dev/path/',
'blog.boot.dev/path',
'BLOG.BoOt.DeV/pAtH'
]

const html = `<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
</body>
</html>`

const html2 = `<html>
<body>
    <a href="/path"><span>Go to path</span></a>
</body>
</html>`

for (const url of urls) {
    test(`normalize('${url}') should give: 'blog.boot.dev/path'`, () => {
        expect(normalize(url)).toBe('blog.boot.dev/path')
    })
}

test(`normalize('blog.boot.dev/') should give: 'blog.boot.dev'`, () => {
    expect(normalize('blog.boot.dev/')).toBe('blog.boot.dev')
})

test(`normalize('blog.boot.dev') should give: 'blog.boot.dev'`, () => {
    expect(normalize('blog.boot.dev')).toBe('blog.boot.dev')
})

test(`normalize('boot.dev/') should give: 'boot.dev'`, () => {
    expect(normalize('boot.dev/')).toBe('boot.dev')
})

test(`normalize('boot.dev') should give: 'boot.dev'`, () => {
    expect(normalize('boot.dev')).toBe('boot.dev')
})

test(`normalize('http://blog.boot.dev/this/is/a/long/path') should give: 'blog.boot.dev/this/is/a/long/path'`, () => {
    expect(normalize('http://blog.boot.dev/this/is/a/long/path')).toBe('blog.boot.dev/this/is/a/long/path')
})

test(`normalize('http://blog.boot.dev/this/is/a/long/path/') should give: 'blog.boot.dev/this/is/a/long/path'`, () => {
    expect(normalize('http://blog.boot.dev/this/is/a/long/path/')).toBe('blog.boot.dev/this/is/a/long/path')
})

test(`get urls from html: ['blog.boot.dev']`, () => {
    expect(getURLsFromHTML(html, 'https://blog.boot.dev')).toStrictEqual(['https://blog.boot.dev/'])
})

test(`get urls from html: ['blog.boot.dev']`, () => {
    expect(getURLsFromHTML(html2, 'https://blog.boot.dev')).toStrictEqual(['https://blog.boot.dev/path'])
})

test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
