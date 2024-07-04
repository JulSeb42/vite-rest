/*=============================================== Generate TS type ===============================================*/

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
            return [
                {
                    type: "add",
                    path: `../client/src/types/{{ pascalCase name }}.${
                        data.interface ? "interface" : "type"
                    }.ts`,
                    templateFile: "./templates/type.hbs",
                },
                {
                    type: "modify",
                    path: "../client/src/types/index.ts",
                    template: `export * from "./{{ pascalCase name }}.${
                        data.interface ? "interface" : "type"
                    }"\n$1`,
                    pattern: /(\/\/ prependHere)/g,
                },
            ]
        },
    })
}

module.exports = { generateType }
