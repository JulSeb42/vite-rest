/*=============================================== Main ===============================================*/

import ReactDOM from "react-dom/client"
import { ThemeProviderWrapper } from "tsx-library-julseb"

import { App } from "./App.tsx"
import { AuthProviderWrapper } from "context"

import "tsx-library-julseb/index.css"
import "styles/index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProviderWrapper>
        <AuthProviderWrapper>
            <App />
        </AuthProviderWrapper>
    </ThemeProviderWrapper>
)
