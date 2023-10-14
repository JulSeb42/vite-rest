/*=============================================== Generate model ===============================================*/

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
        ],
        actions: [
            {
                type: "add",
                path: "../server/models/{{ pascalCase name }}.model.ts",
                templateFile: "./templates/model.hbs",
            },
            {
                type: "modify",
                path: "../server/models/index.ts",
                template: 'export * from "./{{ pascalCase name }}.model"\n$1',
                pattern: /(\/\/ prependHere)/g,
            },
        ],
    })
}

module.exports = { generateModel }
