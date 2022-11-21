/**
 * Configuration object used to initialise the In-Stock Alert UI
 */
type ProductAlertUIConfig = {
    /**
     * Your Lykdat Publishable API Key
     */
    publishableApiKey: string
    /**
     * The name of your product alert website. This is name is usually
     * set-up at https://console.lykdat.com when you create your Product Alert
     * account.
     */
    websiteName: string
    /**
     * The CSS selector on which the UI should be rendered.
     */
    targetSelector: string
}

/**
 * Attaches a Form UI to the dom. With this Form, users of your website
 * can subscribe to be notified when the related product is in-stock
 * (assuming it was previously unavailable). Typically you'll only want to
 * call this function on the Details page of a product that is currently
 * not in stock.
 * @param {ProductAlertUIConfig} config required parameters to initialise the UI.
 */
export function initInStockAlertUI (config: ProductAlertUIConfig): void {
    const productUrl = window.location.href
    const apiKey = config.publishableApiKey
    const context = window.btoa(`${apiKey}${config.websiteName}:${apiKey.length}`)
    const iframeContainerId = 'lykdat-alert-iframe-container'
    const iframeURL = 'https://easyuse.lykdat.com/stock-alert'

    const iframeContainer = document.createElement('div')
    iframeContainer.id = iframeContainerId
    const iframe = document.createElement('iframe')
    iframe.src = `${iframeURL}?url=${encodeURIComponent(productUrl)}&context=${context}`
    iframe.style.width = '100%'
    iframe.style.border = 'none'
    iframeContainer.appendChild(iframe)

    const targetContainer = document.querySelector(config.targetSelector)
    if (targetContainer) {
      targetContainer.appendChild(iframeContainer)
    }
}

/**
 * Configuration object used to communicate with the Back In-Stock Alert API
 */
type ProductAlertConfig = {
    /**
     * Your Lykdat Publishable API Key
     */
    publishableApiKey: string
    /**
     * The name of your product alert website. This is name is usually
     * set-up at https://console.lykdat.com when you create your Product Alert
     * account.
     */
    websiteName: string
}

/**
 * Subscribes a user (whose email is provided) to be notified
 * when the specified prodduct becomes available (aka in-stock).
 * @param {ProductAlertConfig} config 
 * @param {string} emailAddress the email of the subscriber.
 * @param {string} productUrl the URL of the product that is being subscribed to.
 * The Product URL must have the same base URL as the website associated with the
 * Product Alert settings created on console.lykdat.com
 * @returns 
 */
export function subscribeToInStockAlert(
    config: ProductAlertConfig,
    emailAddress: string,
    productUrl: string
): Promise<void> {
    const body = {
        website_name: config.websiteName,
        subscriber_email: emailAddress,
        product_url: productUrl,
        type: 'availability',
    }

    return fetch('https://cloudapi.lykdat.com/v1/products/alerts/subscribe', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'x-api-key': config.publishableApiKey },
    }).then((resp) => {
        if (resp.status !== 200) {
            return resp.json().then((jsonData) => {
                throw new Error(jsonData.message || `unable able to subscribe: ${resp.status}`)
            })
        }
    })
}

/**
 * Subscribes a user (whose email is provided) to be notified
 * when the price of the specified prodduct drops.
 * @param {ProductAlertConfig} config 
 * @param {string} emailAddress the email of the subscriber.
 * @param {string} productUrl the URL of the product that is being subscribed to.
 * The Product URL must have the same base URL as the website associated with the
 * Product Alert settings created on console.lykdat.com
 * @returns 
 */
 export function subscribeToPriceAlert(
    config: ProductAlertConfig,
    emailAddress: string,
    productUrl: string
): Promise<void> {
    const body = {
        website_name: config.websiteName,
        subscriber_email: emailAddress,
        product_url: productUrl,
        type: 'price',
    }

    return fetch('https://cloudapi.lykdat.com/v1/products/alerts/subscribe', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'x-api-key': config.publishableApiKey },
    }).then((resp) => {
        if (resp.status !== 200) {
            return resp.json().then((jsonData) => {
                throw new Error(jsonData.message || `unable able to subscribe: ${resp.status}`)
            })
        }
    })
}
