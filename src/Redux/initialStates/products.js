export default {
    createProduct: {
        loadingAdd: null,
        data: {},
        error: null,
        msg: null
    },
    allProducts: {
        loadingProducts: true,
        data: {},
        rowsProducts: [],
        countProducts: 0,
        error: null
    },
    productById:
    {
        loadingProduct: true,
        productData: { images: [], colors: [] },
        error: null
    }
}