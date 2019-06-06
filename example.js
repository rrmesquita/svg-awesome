const SvgAwesome = require('./index.js')
const cheatsheet = require('./cheatsheet')

/**
 * You can parse a CSS file to find all 'content' properties and map it to an
 * unicode:icon-name object file
 */
const unicodeArr = [ 'f077', 'f078' ]
const customSet = unicodeArr.map(value => cheatsheet[value])

const config = {
    entryDir: 'webfonts/src/',
    outputDir: 'webfonts/dist/',
    types: [
        { filename: 'fa-brands-400', keep: [ 'facebook' ] },
        { filename: 'fa-light-300', keep: customSet },
        { filename: 'fa-regular-400', keep: customSet },
        { filename: 'fa-solid-900', keep: customSet }
    ]
}

new SvgAwesome(config)
