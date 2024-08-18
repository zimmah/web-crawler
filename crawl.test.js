import {test, expect} from "@jest/globals";
import { normalize } from "./crawl.js";

const urls = ['https://blog.boot.dev/path/',
'https://blog.boot.dev/path',
'http://blog.boot.dev/path/',
'http://blog.boot.dev/path',
'blog.boot.dev/path/',
'blog.boot.dev/path',
]

const other = ['blog.boot.dev/',
'boot.dev/',
'boot.dev']

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