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
        ],
        actions: [
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
                    "router.use(SERVER_PATHS.{{ constantCase name }}.ROOT, {{ camelCase name }})\n$1",
                pattern: /(\/\/ prependRouterUse)/g,
            },
            {
                type: "modify",
                path: "../shared/server-paths.ts",
                template:
                    '{{ constantCase name }}: "/{{ kebabCase name }}",\n$1',
                pattern: /(\/\/ prependRoot)/g,
            },
            {
                type: "modify",
                path: "../shared/server-paths.ts",
                template:
                    '{{ constantCase name }}: {\n        ROOT: SERVER_PATH_ROOTS.{{ constantCase name }},\n        ALL_{{ constantCase name }}S: `${SERVER_PATH_ROOTS.{{ constantCase name }} }/all-{{ kebabCase name }}s`,\n        GET_{{ constantCase name }}: (id = ":id") => `${SERVER_PATH_ROOTS.{{ constantCase name }} }/{{ kebabCase name }}/${id}`,\n    },\n$1',
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
            ...generateModelActions,
            ...generateTypeActions(false),
        ],
    })
}

module.exports = { generateRoute }
