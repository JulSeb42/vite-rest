/*=============================================== Generate single file component ===============================================*/

const generateSingleFileComponent = (
    /** @type {import('plop').NodePlopAPI} */ plop
) => {
    const { setGenerator } = plop

    setGenerator("single-component", {
        description: "Generate single file React component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Enter the component's name",
            },
            {
                type: "confirm",
                name: "props",
                message: "Add props?",
                default: false,
            },
            {
                type: "input",
                name: "tag",
                message: "Which HTML tag?",
                default: "div",
            },
            {
                type: "input",
                name: "components",
                message: "Import other components?",
            },
        ],
        actions: [
            {
                type: "add",
                path: "../client/src/components/{{ pascalCase name }}.tsx",
                templateFile: "./templates/single-component.hbs",
            },
            {
                type: "modify",
                path: "../client/src/components/index.ts",
                template:
                    'export * from "components/{{ pascalCase name }}"\n$1',
                pattern: /(\/\/ prependHere)/g,
            },
        ],
    })
}

module.exports = { generateSingleFileComponent }
