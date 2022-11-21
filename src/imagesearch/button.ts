const CSS = `
  .lykdat-button {
    background-color: black;
    padding: 10px;
    border-radius: 36px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.5s;
    color: #fff;
    box-shadow: 0px 12px 24px rgba(8, 8, 8, 0.3);
    margin: 0 auto;
  }
  .lykdat-button:hover {
    width: auto;
  }
  .lykdat-button > .icon {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  .lykdat-button > .text {
    display: none;
  }
  .lykdat-button:hover > .text {
    display: inline-block;
    margin: 0 10px;
  }

  .lykdat-float-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
  }`

const IMG_SEARCH_ICON = 'data:image/png;base64,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'

export function createImageSearchButton (): HTMLButtonElement {
    const style_id = 'lykdat-img-search-button-style'
    if (!document.querySelector(`style#${style_id}`)) {
        const style = document.createElement('style')
        style.id = style_id
        style.innerHTML = CSS
        document.head.appendChild(style)
    }

    const button = document.createElement('button')
    button.classList.add('lykdat-button')
    button.innerHTML = `
                  <img src="${IMG_SEARCH_ICON}" alt="Image Search" class='icon' />
                  <span class='text'>Image Search</span>`
    const floatBtn = document.createElement('div')
    floatBtn.classList.add('lykdat-float-btn')
    floatBtn.appendChild(button)
    document.body.appendChild(floatBtn)

    return button
}