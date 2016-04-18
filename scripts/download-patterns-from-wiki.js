'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const jsdom = require('jsdom')

const urls = [
  'http://www.conwaylife.com/wiki/Category:Agars',
  'http://www.conwaylife.com/wiki/Category:Gardens_of_Eden',
  'http://www.conwaylife.com/wiki/Category:Guns',
  'http://www.conwaylife.com/wiki/Category:Methuselahs',
  'http://www.conwaylife.com/wiki/Category:Oscillators',
  'http://www.conwaylife.com/wiki/Category:Puffers',
  'http://www.conwaylife.com/wiki/Category:Sawtooths',
  'http://www.conwaylife.com/wiki/Category:Spaceships',
  'http://www.conwaylife.com/wiki/Category:Still_lifes',
  'http://www.conwaylife.com/wiki/Category:Wicks'
]

const dataDirectory = path.join(__dirname, '/data/')
if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory)
}

urls.forEach(url => {
  const fileName = url.split(':').reverse()[0].toLowerCase()
  const targetFile = fs.createWriteStream(path.join(dataDirectory, `/${ fileName }.js`))

  // category page
  targetFile.on('open', () => {
    jsdom.env({
      url: url,
      done: (err, window) => {
        if (err) {
          console.log(err)
          return
        }

        const categoryName = window.document
          .querySelector('h1')
          .textContent
          .replace('Category:', '')
        const categoryNameEscaped = categoryName.replace(/'/, '\\\'')

        targetFile.write(`'${ categoryNameEscaped }': {\n`)
        console.log(`Gathering data from category ${ categoryName }`)

        const links = [...window.document.querySelectorAll('#mw-pages .mw-content-ltr a')]
        const urls = links.map(link => link.href)

        // pattern page
        urls.forEach(url => {
          const currentUrl = url

          jsdom.env({
            url: url,
            done: (err, window) => {
              if (err) {
                console.log(err)
                return
              }

              const patternSizeNode = window.document
                .querySelector('.infobox a[href^="/wiki/Bounding_box"]')

              if (patternSizeNode) {
                const patternSize = patternSizeNode
                  .parentNode
                  .nextElementSibling
                  .textContent
                  .trim()
                  .split('×')
                  .map(Number)

                if (patternSize[0] > 50 || patternSize[1] > 50) {
                  console.log(`pattern too big ${ categoryName } - ${ currentUrl }`)
                  return
                }
              }

              const linkToData = window.document.querySelector('.infobox a[href$=".cells"]')

              if (!linkToData) {
                console.log(`missing link to data file ${ categoryName } - ${ currentUrl }`)
                return
              }
              const url = linkToData.href

              // pattern file
              http.get(url, res => {
                if (res.statusCode !== 200) {
                  console.log(`cant download data file ${ categoryName } - ${ url }`)
                  return
                }
                let data = ''

                res.setEncoding('utf8')
                res.on('data', chunk => {
                  data += chunk
                })
                res.on('end', () => {
                  let patternName = data.match(/^!Name: (.*)$/m)[1].trim()
                  console.log(`downloaded ${ categoryName } - ${ patternName }`)

                  const cleanData = data
                    .replace(/^!.*$/gm, '')
                    .split('\n')
                    .map(line => line.split('').join(' '))
                    .map(line => line.split('').map(char => char === 'O' ? '■' : char).join(''))
                    .map(line => line.split('').map(char => char === '.' ? ' ' : char).join(''))
                    .map(line => `    ${ line }`)

                  const firstNonEmptyLine = (lines) => {
                    let currentIndex = 0
                    for (let i = 0; i < lines.length; i++) {
                      if (lines[i].trim() !== '') return currentIndex
                      currentIndex++
                    }
                    return currentIndex
                  }

                  const startIndex = firstNonEmptyLine(cleanData)
                  const endIndex = firstNonEmptyLine([...cleanData].reverse())

                  const finalData = cleanData
                    .slice(startIndex, cleanData.length - endIndex)
                    .join('')

                  const patternaNameEscaped = patternName.replace(/'/g, '\\\'')
                  targetFile.write(`  '${ patternaNameEscaped }': \`\n`)
                  targetFile.write(`${ finalData }\n`)
                  targetFile.write(`  \`,\n`)
                })
              })
            }
          })
        })
      }
    })
  })
})
