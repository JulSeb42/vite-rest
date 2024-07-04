/*=============================================== Generate route ===============================================*/

const {
    generateModelActions,
    generateTypeActions,
} = require("../utils/generate-actions")

const generateRoute = (/** @type {import('plop').NodePlopAPI} */ plop) => {
    const { setGenerator } = plop

    setGenerator("route", {
        description: "Generate route",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Enter route's name",
            },
            {
                type: "confirm",
                name: "model",
                message:
                    "This will create a model (do not say no if you want it to work properly)",
                default: true,
                skip: true,
            },
            // {
            //     type: "confirm",
            //     name: "type",
            //     message:
            //         "This will create a TS type (do not say no if you want it to work properly)",
            //     default: true,
            // },
        ],
        actions: data => {
            data = {
                model: true,
                type: true,
            }

            const routeActions = [
                {
                    type: "add",
                    path: "../server/routes/{{ kebabCase name }}.ts",
                    templateFile: "./templates/route/route.hbs",
                },
                {
                    type: "modify",
                    path: "../server/routes/index.ts",
                    template:
                        'import {{ camelCase name }} from "./{{ kebabCase name }}"\n$1',
                    pattern: /(\/\/ prependImport)/g,
                },
                {
                    type: "modify",
                    path: "../server/routes/index.ts",
                    template:
                        "router.use(SERVER_PATHS.{{ constantCase name }}, {{ camelCase name }})\n$1",
                    pattern: /(\/\/ prependRouterUse)/g,
                },
                {
                    type: "modify",
                    path: "../shared/server-paths.ts",
                    template:
                        '{{ constantCase name }}: "/{{ kebabCase name }}",\n$1',
                    pattern: /(\/\/ prependServerPath)/g,
                },
                {
                    type: "add",
                    path: "../client/src/api/{{ kebabCase name }}.service.ts",
                    templateFile: "./templates/route/service.hbs",
                },
                {
                    type: "modify",
                    path: "../client/src/api/index.ts",
                    template:
                        'export * from "api/{{ kebabCase name }}.service"\n$1',
                    pattern: /(\/\/ prependHere)/g,
                },
            ]

            const actions = [
                ...routeActions,
                ...generateModelActions,
                ...generateTypeActions(false),
            ]

            // if (data.model) {
            //     actions.push(...generateModelActions)
            // }

            // if (data.type) {
            //     actions.push(...generateTypeActions(false))
            // }

            return actions
        },
    })
}

module.exports = { generateRoute }
