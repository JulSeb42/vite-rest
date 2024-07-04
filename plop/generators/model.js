/*=============================================== Generate model ===============================================*/

const {
    generateModelActions,
    generateTypeActions,
} = require("../utils/generate-actions")

const generateModel = (/** @type {import('plop').NodePlopAPI} */ plop) => {
    const { setGenerator } = plop

    setGenerator("model", {
        description: "Mongoose model",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Enter route's name",
            },
            {
                type: "confirm",
                name: "type",
                message: "Create a TS type?",
                default: true,
            },
        ],
        actions: data => {
            const actions = generateModelActions

            if (data.type) {
                actions.push(...generateTypeActions(false))
            }

            return actions
        },
    })
}

module.exports = { generateModel }
