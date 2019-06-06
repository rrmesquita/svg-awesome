const fs = require('fs')
const xml = require('xml-js')
const svg2ttf = require('svg2ttf')
const ttf2woff = require('ttf2woff')
const wawoff2 = require('wawoff2')

class SvgAwesome {
    constructor(configObject) {
        configObject.types.forEach(type => {
            // Entry file
            let entry = fs.readFileSync(configObject.entryDir + type.filename + '.svg', 'utf8')

            // Map JSON to keep only selected glyphs
            let json = xml.xml2js(entry , { compact: true, spaces: 4 })
            json.svg.defs.font.glyph = json.svg.defs.font.glyph.filter(key => type.keep.includes(key['_attributes']['glyph-name']))

            // Check for output folder existence
            if (!fs.existsSync(configObject.outputDir)) {
                fs.mkdirSync(configObject.outputDir)
            }

            // Save TTF file
            let svg = xml.js2xml(json, { compact: true, spaces: 4 })
            fs.writeFileSync(configObject.outputDir + type.filename + '.ttf', new Buffer(svg2ttf(svg).buffer))

            // Save WOFF file
            let ttf = fs.readFileSync(configObject.outputDir + type.filename + '.ttf')
            fs.writeFileSync(configObject.outputDir + type.filename + '.woff', new Buffer(ttf2woff(ttf).buffer))

            // Save WOFF2 file
            wawoff2.compress(ttf).then(output => {
                fs.writeFileSync(configObject.outputDir + type.filename + '.woff2', output)
            })
        })
    }
}

module.exports = SvgAwesome
