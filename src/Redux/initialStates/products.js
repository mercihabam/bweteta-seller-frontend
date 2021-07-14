export default {
    createProduct: {
        loadingAdd: false,
        data: {},
        error: null,
        msg: null
    },
    updateProduct: {
        loadingUpdate: false,
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
        productData: { Images: [], colors: [] },
        error: null
    }
}