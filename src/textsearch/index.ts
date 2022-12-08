/**
 * Configuration object used to communicate with the Text Search API
 */
type TextSearchConfig = {
    /**
     * Your Lykdat Publishable API Key
     */
    publishableApiKey: string
    /**
     * The name of the Catalog which you'll be searching.
     * A Catalog is created at https://console.lykdat.com
     */
    catalogName: string
}

/**
 * Additional Sort, Filter and Query options used to fine tune the results
 * of your search
 */
type TextSearchQueryOptions = {
    /**
     * the field name to sort the result by
     */
    sort?: 'price'
    /**
     * the order at which to sort the result. Could be 'asc' for ascending and
     * 'desc' for descending
     */
    order?: 'asc' | 'desc'
    /**
     * filter results by the gender field (if applicable to your catalog)
     */
    genders?: Array<'female' | 'male' | 'unisex'>
    /**
     * filter results by brand names (if applicable to your catalog)
     */
    brands?: string[]
    /**
     * filter results by colors (if applicable to your catalog)
     */
    colors?: string[]
    /**
     * As regards to pagination, this specifies the page number result to be returned.
     */
    page?: number
    /**
     * As regards to pagination, this specifies the number of products that should be returned
     * in each page.
     */
    per_page?: number
}

/**
 * The response received after a successful Search is made.
 */
export type TextSearchResponse = {
    pagination: {
        total_items: number
        total_pages: number
    }
    facets: Array<{
        field_name: string
        value_counts: Array<{count: number; value: any}>
    }>
    products: Array<{
        id: string
        name: string
        url: string
        price: string
        reduced_price?: string
        currency: string
        images: string[]
        in_stock: boolean
        brand_name?: string
        description?: string
        colors?: string[]
    }>
}

/**
 * Executes a product text search request through a product catalog.
 * @param query the text query to search the target catalog for
 * @param config coniguratoon options to provide API Key and target catalog name
 * @param options addition query options to sort and filter the search result
 * @returns {TextSearchResponse}
 */
export function searchText(
    query: string,
    config: TextSearchConfig,
    options?: TextSearchQueryOptions
): Promise<TextSearchResponse> {
    let queryParams = `query=${query}&catalog_name=${config.catalogName}`
    if (options) {
        for (const key in options) {
            const val = options[key]
            queryParams += Array.isArray(val) ? `&${key}=${val.join(',')}` : `&${key}=${val}`
        }
    }

    return fetch(`https://cloudapi.lykdat.com/v1/products/search/text?${queryParams}`, {
        method: 'GET',
        headers: { 'X-Api-Key': config.publishableApiKey },
    }).then((resp) => {
        return resp.json().then((jsonData) => {
            if (resp.status !== 200) {
                throw new Error(jsonData.error || `search request failed: ${resp.status}`)
            }

            return { ...jsonData.data }
        })
    })
}
