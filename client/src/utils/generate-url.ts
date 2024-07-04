/*=============================================== Generate URL ===============================================*/

export function generateUrl(base: string, url: string) {
    return new URL(url, base).toString()
}
