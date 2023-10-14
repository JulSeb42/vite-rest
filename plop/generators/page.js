/*=============================================== Generate page ===============================================*/

const { generatePageRoute } = require("../utils/generate-page-route")

const generatePage = (/** @type {import('plop').NodePlopAPI} */ plop) => {
    const { setGenerator } = plop

    setGenerator("page", {
        description: "Generate page",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Enter page's name",
            },
            {
                type: "input",
                name: "title",
                message: "Enter page title",
            },
            {
                type: "input",
                name: "path",
                message: "Enter path",
            },
            {
                type: "confirm",
                name: "multi",
                message: "Is this a multi file page?",
                default: false,
            },
            {
                type: "list",
                name: "protected",
                choices: ["none", "protected", "anon"],
                default: "none",
            },
        ],

        actions: data => {
            const actions = [
                {
                    type: "add",
                    path: data.multi
                        ? "../client/src/pages/{{ pascalCase name }}/{{ pascalCase name }}.tsx"
                        : "../client/src/pages/{{ pascalCase name }}.tsx",
                    templateFile: "./templates/page/page-file.hbs",
                },
                {
                    type: "modify",
                    path: "../client/src/routes/routes.tsx",
                    template:
                        'import { {{ pascalCase name }} } from "pages/{{ pascalCase name }}"\n$1',
                    pattern: /(\/\/ prependImport)/g,
                },
                {
                    type: "modify",
                    path: "../client/src/routes/routes.tsx",
                    template: generatePageRoute(data.protected),
                    pattern: /(\/\/ prependRoute)/g,
                },
                {
                    type: "modify",
                    path: "../client/src/routes/paths.ts",
                    template:
                        '{{ constantCase name }}: "/{{ pathCase path }}",\n$1',
                    pattern: /(\/\/ prependPath)/g,
                },
            ]

            if (data.multi) {
                actions.push({
                    type: "add",
                    path: "../client/src/pages/{{ pascalCase name }}/index.ts",
                    templateFile: "./templates/page/page-index.hbs",
                })
            }

            return actions
        },
    })
}

module.exports = { generatePage }
