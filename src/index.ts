export { initImageSearchUI } from './imagesearch'
export { initInStockAlertUI, subscribeToInStockAlert, subscribeToPriceAlert } from './productalerts'
export { searchText } from './textsearch'
import { ProductAlertResponse as _ProductAlertResponse } from './productalerts'
import { TextSearchResponse as _TextSearchResponse } from './textsearch'

// this is a workaround because re-export of types breaks with parcel build
export type ProductAlertResponse = _ProductAlertResponse
export type TextSearchResponse = _TextSearchResponse
