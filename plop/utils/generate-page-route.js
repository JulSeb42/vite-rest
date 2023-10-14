/*=============================================== Generate page route ===============================================*/

const generatePageRoute = pageType => {
    const pathName = "PATHS.{{ constantCase name }}"
    const elementComp = "<{{ pascalCase name }} />"

    let element

    if (pageType === "protected") {
        element = `<ProtectedRoute>${elementComp}</ProtectedRoute>`
    } else if (pageType === "anon") {
        element = `<AnonRoute>${elementComp}</AnonRoute>`
    } else {
        element = elementComp
    }

    return `{ path: ${pathName}, element: ${element} },\n$1`
}

module.exports = { generatePageRoute }
