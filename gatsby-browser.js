// ./gatsby-browser.js
import "./src/styles/global.css"

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload()
