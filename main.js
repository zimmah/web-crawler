import { crawlPage } from "./crawl.js"
import { argv } from "node:process"
import { printReport } from "./printReport.js"

async function main(){
    const [execPath, filePath, ...args] = argv
    if (args.length !== 1) {
        console.error('exactly 1 argument is required, please specify the url to crawl.')
        return
    }
    const startingPoint = args[0]
    console.log('Starting report...')
    console.log(`Starting crawler at ${startingPoint}...`)
    const pages = await crawlPage(startingPoint)
    printReport(pages)
}


main()