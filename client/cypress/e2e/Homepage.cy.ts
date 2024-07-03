/*=============================================== Homepage tests ===============================================*/

import { PATHS } from "../../src/routes/paths"

describe("<Homepage />", () => {
    beforeEach(() => {
        cy.visit(PATHS.ROOT)
    })

    it("renders page", () => {
        cy.dataTest("Homepage").should("exist").should("be.visible")
    })
})
