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

urls.forEach(url => {
  const fileName = url.split(':').reverse()[0].toLowerCase()
  const targetFile = fs.createWriteStream(path.join(__dirname, `/data/${ fileName }.js`))

  targetFile.on('open', () => {
    jsdom.env({
      url: url,
      done: (err, window) => {
        const categoryName = window.document.querySelector('h1').textContent.replace('Category:', '')
        targetFile.write(`'${ categoryName }': {\n`)
        console.log(`Gathering data from category ${ categoryName }`)

        const contentWrapper = window.document.querySelector('.mw-content-ltr')
        const links = [...contentWrapper.querySelectorAll('a')]

        links.forEach(link => {
          jsdom.env({
            url: link,
            done: (err, window) => {

              const linkToData = window.document.querySelector(
                '.infobox .infobox_table a[href$=".cells"]'
              )

              if (!linkToData) return
              const url = linkToData.href

              http.get(url, res => {
                if (res.statusCode !== 200) return
                var data = ''

                res.setEncoding('utf8')
                res.on('data', chunk => {
                  data += chunk
                })
                res.on('end', () => {
                  try {
                    var patternName = data.match(/^!Name: (.*)$/m)[1].trim()

                  } catch(e) {
                    console.log(data)
                  }
                  console.log(`Downloaded ${ categoryName } - ${ patternName }`)

                  const cleanData = data
                    .replace(/^!.*$/gm, '')
                    .split('\n')
                    .map(line => line.split('').join(' '))
                    .map(line => line.split('').map(char => char === 'O' ? '■' : char).join(''))
                    .map(line => line.split('').map(char => char === '.' ? ' ' : char).join(''))
                    .map(line => `    ${ line }`)

                  const firstNonEmptyLine = (lines) => {
                    var currentIndex = 0
                    for (var i = 0; i < lines.length; i++) {
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

                  targetFile.write(`  '${ patternName }': \`\n`)
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
