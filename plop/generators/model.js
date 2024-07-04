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
            {
                type: "confirm",
                name: "type",
                message: "Create a TS type?",
                default: true,
            },
        ],
        actions: data => {
            const actions = [
                {
                    type: "add",
                    path: "../server/models/{{ pascalCase name }}.model.ts",
                    templateFile: "./templates/model.hbs",
                },
                {
                    type: "modify",
                    path: "../server/models/index.ts",
                    template:
                        'export * from "./{{ pascalCase name }}.model"\n$1',
                    pattern: /(\/\/ prependHere)/g,
                },
            ]

            if (data.type) {
                const newActions = [
                    {
                        type: "add",
                        path: "../client/src/types/{{ pascalCase name }}.type.ts",
                        templateFile: "./templates/type.hbs",
                    },
                    {
                        type: "modify",
                        path: "../client/src/types/index.ts",
                        template:
                            'export * from "./{{ pascalCase name }}.type"\n$1',
                        pattern: /(\/\/ prependHere)/g,
                    },
                ]
                actions.push(...newActions)
            }

            return actions
        },
    })
}

module.exports = { generateModel }
