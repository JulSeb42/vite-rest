/*=============================================== Generate route ===============================================*/

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
                    'router.use("/{{ kebabCase name }}", {{ camelCase name }})\n$1',
                pattern: /(\/\/ prependRouterUse)/g,
            },
            {
                type: "modify",
                path: "../client/src/routes/paths.ts",
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
        ],
    })
}

module.exports = { generateRoute }
