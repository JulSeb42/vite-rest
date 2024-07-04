/*=============================================== Generate TS type ===============================================*/

const { generateTypeActions } = require("../utils/generate-actions")

const generateType = (/** @type {import('plop').NodePlopAPI} */ plop) => {
    const { setGenerator } = plop

    setGenerator("type", {
        description: "TS type",
        prompts: [
            { type: "input", name: "name", message: "Enter's name" },
            {
                type: "confirm",
                name: "interface",
                message: "Create it as interface?",
                default: false,
            },
        ],
        actions: data => {
            return generateTypeActions(data.interface)
        },
    })
}

module.exports = { generateType }
