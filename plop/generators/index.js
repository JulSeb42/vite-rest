/*=============================================== Exports ===============================================*/

const { generateComponent } = require("./component")
const { generateModel } = require("./model")
const { generatePage } = require("./page")
const { generateRoute } = require("./route")
const { generateSingleFileComponent } = require("./single-component")

module.exports = {
    generateComponent,
    generateModel,
    generatePage,
    generateRoute,
    generateSingleFileComponent,
}
