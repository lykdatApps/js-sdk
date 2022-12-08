# Lykdat JavaScript SDK

Official JavaScript SDK for [Lykdat API](https://solutions.lykdat.com/)

NOTE: This library is suited for a Web Browser environment only and will not work in a Node JS environment.

## Install

`npm install lykdat`

## Usage

Two primary functionalities are offered by this SDK: [Image Search](https://solutions.lykdat.com/new-features#visual-search) and [Product Alerts](https://solutions.lykdat.com/new-features/product-alert)

### Image Search

The Image Search function does all the UI related heavy-lifting for you, thereby relieving you of the stress.
All you need to do is invoke the function and it renders a search button at the bottom right corner of your page.
Once a search is completed, it also renders the search results UI for you.

The Image Search function can be used like so:

```js
import * as lykdat from 'lykdat'

window.addEventListener('load', () => {
    lykdat.initImageSearchUI({
        publishableApiKey: 'YOUR_API_KEY_HERE',
        catalogName: 'YOUR_CATALOG_NAME',
    })
})
```

If you'd like to use your own custom search button, just pass the css selector to your button so the appropriate
event handler can be attached to it:

```js
import * as lykdat from 'lykdat'

window.addEventListener('load', () => {
    lykdat.initImageSearchUI({
        publishableApiKey: 'YOUR_API_KEY_HERE',
        catalogName: 'YOUR_CATALOG_NAME',
        triggerSelector: '#my-button-id'
    })
})
```

The Image Search UI looks something like this when the trigger button is clicked:

![Image search](https://github.com/lykdatApps/js-sdk/raw/master/screenshots/imagesearch.png)

### Text Search

The Text Search API enables you do a full text search for Products in your Catalog. You can filter and sort by fields. The result also returns facets which can be important for eCommerce Search result pages.
This functionality does not currently offer any UI related features.
The Text Search function can be used like so:

```js
import * as lykdat from 'lykdat'

const config = {
    publishableApiKey: 'YOUR_API_KEY_HERE',
    catalogName: 'YOUR_CATALOG_NAME',
}

const options = {
    genders: ['male', 'unisex'],
    colors: ['red', 'blue', 'navy']
}

lykdat.searchText('furry shorts', config, options).then((result) => {
    console.log(result.products)
    console.log(result.pagination)
    console.log(result.facets)
}).catch((err) => {
    // handle error
})

### Product Alert

The Product Alert API offers both UI and non-UI functionality.

#### Price Alerts

With the Price Alerts function your users can subscribe to know when the price of a Product drops.
The function can be used like so:

```js
import * as lykdat from 'lykdat'

const config = {
    publishableApiKey: 'YOUR_API_KEY_HERE',
    websiteName: 'mywebsite'
}
const email = 'useremail@example.com'
const productUrl = 'https://mywebsite.url/product/url'

lykdat.subscribeToPriceAlert(config, email, productUrl).then(() => {
    console.log('success')
}).catch((err) => {
    // handle error
})
```

#### In-stock Alerts

With the In-stock Alerts function, your users can subscribe to know when a currently unavailable product is back in-stock.
The function can be used like so:

```js
import * as lykdat from 'lykdat'

const config = {
    publishableApiKey: 'YOUR_API_KEY_HERE',
    websiteName: 'mywebsite'
}
const email = 'useremail@example.com'
const productUrl = 'https://mywebsite.url/product/url'

lykdat.subscribeToInStockAlert(config, email, productUrl).then(() => {
    console.log('success')
}).catch((err) => {
    // handle error
})
```

#### In-stock Alerts UI

This Function Attaches a Form UI to the dom. With this Form, users of your website can subscribe to be notified when the related product is in-stock. This functionality removes the need for you to add any UI related code by doing it all for you.

The UI Finction can be used like so:

```js
import * as lykdat from 'lykdat'

window.addEventListener('load', () => {
    lykdat.initInStockAlertUI({
        publishableApiKey: 'YOUR_API_KEY_HERE',
        websiteName: 'YOUR_WEBSITE_NAME',
        targetSelector: '#back-in-stock-container'
    })
})
```

The UI looks something like this when loaded to your website:

![In Stock Alerts Form](https://github.com/lykdatApps/js-sdk/raw/master/screenshots/instockui.png)

## Examples

To see how the SDK is used in code examples, please [the examples folder](https://github.com/lykdatApps/js-sdk/tree/master/examples)

- Image Search Example using the [default UI button](https://github.com/lykdatApps/js-sdk/tree/master/examples/imagesearch/vanilla)
- Image Search Example using [a custom button](https://github.com/lykdatApps/js-sdk/tree/master/examples/imagesearch/vanilla-custom-button)
- Product Alerts Example using [In-stock Alert UI](https://github.com/lykdatApps/js-sdk/tree/master/examples/productalerts/vanilla)