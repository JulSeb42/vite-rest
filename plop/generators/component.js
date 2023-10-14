/*=============================================== Generate component ===============================================*/

const generateComponent = (/** @type {import('plop').NodePlopAPI} */ plop) => {
    const { setGenerator } = plop

    setGenerator("component", {
        description: "React component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Enter component's name",
            },
            {
                type: "input",
                name: "tag",
                message: "Enter HTML tag",
                default: "div",
            },
            {
                type: "input",
                name: "attribute",
                message: "Enter HTML attribute",
                default: "div",
            },
            {
                type: "confirm",
                name: "forward",
                message: "Add `forwardRef`?",
                default: false,
            },
            {
                type: "confirm",
                name: "as",
                message: "Add `as` prop?",
                default: false,
            },
            {
                type: "confirm",
                name: "children",
                message: "Add `children` prop?",
                default: true,
            },
        ],
        actions: [
            {
                type: "addMany",
                destination: "../client/src/components/{{ pascalCase name }}",
                templateFiles: "./templates/component/*.hbs",
                base: "./templates/component",
            },
            {
                type: "modify",
                path: "../client/src/components/index.ts",
                template:
                    'export * from "components/{{ pascalCase name }}"\n$1',
                pattern: /(\/\/ prependHere)/g,
            },
            {
                type: "add",
                path: "../client/src/components/{{ pascalCase name }}/__tests__/{{ pascalCase name }}.cy.tsx",
                templateFile: "./templates/component/__tests__/test.hbs",
            },
        ],
    })
}

module.exports = { generateComponent }
