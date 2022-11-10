import { createImageSearchButton } from './button'

type ImageSearchConfig = {
    apiKey: string
    catalogName: string
    triggerSelector?: string
}

export function initImageSearch (config: ImageSearchConfig): void {
    const { apiKey, catalogName } = config
    const context = window.btoa(`${apiKey}${catalogName}:${apiKey.length}`)
    const button = getOrCreateButton(config.triggerSelector)
    const iframeContainerId = 'lykdat-iframe-container'
    const iframeURL = 'https://easyuse.lykdat.com'

    attachIFrameStyle(iframeContainerId)

    button.addEventListener('click', () => {
        const iframeContainer = document.querySelector(`#${iframeContainerId}`)
        iframeContainer.classList.remove('hidden')
    })

    window.addEventListener('message', (event) => {
        if (event.origin !== iframeURL) {
            return
        }

        if (event.data === 'close--lykdat--drawer') iframeContainer.classList.add('hidden')
    }, false)

    let iframeContainer = document.querySelector<HTMLDivElement>(`div#${iframeContainerId}`)
    if (!iframeContainer) {
        iframeContainer =  document.createElement('div')
    }
    iframeContainer.classList.add('hidden')
    iframeContainer.id = iframeContainerId
    iframeContainer.style.position = 'fixed'

    const iframe = document.createElement('iframe')
    iframe.src = `${iframeURL}?context=${context}`
    iframe.style.height = '100%'
    iframe.style.width = '100%'
    iframe.style.border = 'none'
    iframe.style.display = 'flex'
    iframeContainer.appendChild(iframe)
    document.body.appendChild(iframeContainer)
}

function attachIFrameStyle (iframeId: string) {
    const css = `
    #${iframeId} {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
    }
    #${iframeId}.hidden {
        display: none;
    }`

    const style_id = 'lykdat-img-search-iframe-container-style'
    if (!document.querySelector(`style#${style_id}`)) {
        const style = document.createElement('style')
        style.id = style_id
        style.innerHTML = css
        document.head.appendChild(style)
    }
}

function getOrCreateButton (selector?: string): HTMLButtonElement {
    if (selector) {
        return document.querySelector(selector)
    }

    return createImageSearchButton()
}
