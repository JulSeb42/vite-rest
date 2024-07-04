/*=============================================== Generate actions ===============================================*/

// Array of new actions, not to repeat this code

const generateModelActions = [
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
]

const generateTypeActions = interface => {
    return [
        {
            type: "add",
            path: `../client/src/types/{{ pascalCase name }}.${
                interface ? "interface" : "type"
            }.ts`,
            templateFile: "./templates/type.hbs",
        },
        {
            type: "modify",
            path: "../client/src/types/index.ts",
            template: `export * from "./{{ pascalCase name }}.${
                interface ? "interface" : "type"
            }"\n$1`,
            pattern: /(\/\/ prependHere)/g,
        },
    ]
}

module.exports = { generateModelActions, generateTypeActions }
