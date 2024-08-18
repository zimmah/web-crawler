import { normalize } from "./crawl.js"

function main(){
    console.log(normalize('https://blog.boot.dev/path/'))
    console.log(normalize('https://blog.boot.dev/path'))
    console.log(normalize('http://blog.boot.dev/path/'))
    console.log(normalize('http://blog.boot.dev/path'))
    console.log(normalize('blog.boot.dev/path/'))
    console.log(normalize('blog.boot.dev/path'))
    console.log(normalize('blog.boot.dev/'))
    console.log(normalize('boot.dev/'))
    console.log(normalize('boot.dev'))
}

main()