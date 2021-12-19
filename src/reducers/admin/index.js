import {
  ADMIN_LOGIN,
  ADMIN_INIT,
  SET_ADMIN_DATA,

  GET_ABOUT_US,
  CREATE_OR_UPDATE_ABOUT_US,

  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,

  GET_CARTS,
  GET_CART_PRODUCTS,
  SHIP_ORDER,

  GET_CUSTOMER_INFORMATION,
  RESET_CART_AND_CUSTOMER,

  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  LOGOUT,

} from "../../actions/admin";

const initialState = {
  adminData: {id: false, name: "", ajwt:""},
  orderTab: 0,

  adminLoginLoading: false,
  adminLoginResult: false,
  adminLoginError: false,

  adminInitLoading: false,
  adminInitResult: false,
  adminInitError: false,

  getAboutUsLoading: false,
  getAboutUsResult: false,
  getAboutUsError: false,

  createOrUpdateAboutUsLoading: false,
  createOrUpdateAboutUsResult: false,
  createOrUpdateAboutUsError: false,

  getProductsLoading: false,
  getProductsResult: false,
  getProductsError: false,

  getProductLoading: false,
  getProductResult: false,
  getProductError: false,

  createProductLoading: false,
  createProductResult: false,
  createProductError: false,

  updateProductLoading: false,
  updateProductResult: false,
  updateProductError: false,

  deleteProductLoading: false,
  deleteProductResult: false,
  deleteProductError: false,

  getCartsLoading: false,
  getCartsResult: false,
  getCartsError: false,

  getCartProductsLoading: false,
  getCartProductsResult: false,
  getCartProductsError: false,

  shipOrderLoading: false,
  shipOrderResult: false,
  shipOrderError: false,

  getCustInfLoading: false,
  getCustInfResult: false,
  getCustInfError: false,

  createCategoryLoading: false,
  createCategoryResult: false,
  createCategoryError: false,

  updateCategoryLoading: false,
  updateCategoryResult: false,
  updateCategoryError: false,

  deleteCategoryLoading: false,
  deleteCategoryResult: false,
  deleteCategoryError: false,
}

const admin = (state = initialState, action) => {
  switch(action.type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        adminLoginLoading: action.payload.loading,
        adminLoginResult: action.payload.data,
        adminLoginError: action.payload.error
      }
    case ADMIN_INIT:
      return {
        ...state,
        adminInitLoading: action.payload.loading,
        adminInitResult: action.payload.data,
        adminInitError: action.payload.error
      }
    case SET_ADMIN_DATA:
      return {
        ...state,
        adminData: {
          id: action.payload.id,
          name: action.payload.name,
          ajwt: action.payload.ajwt
        }
      }

    case GET_ABOUT_US:
      return {
        ...state,
        getAboutUsLoading: action.payload.loading,
        getAboutUsResult: action.payload.data,
        getAboutUsError: action.payload.error
      }

    case CREATE_OR_UPDATE_ABOUT_US:
      return {
        ...state,
        createOrUpdateAboutUsLoading: action.payload.loading,
        createOrUpdateAboutUsResult: action.payload.data,
        createOrUpdateAboutUsError: action.payload.error
      }

    case  GET_PRODUCTS:
      return {
        ...state,
        getProductsLoading: action.payload.loading,
        getProductsResult: action.payload.data,
        getProductsError: action.payload.error,
      }

    case GET_PRODUCT:
      return {
        ...state,
        getProductLoading: action.payload.loading,
        getProductResult: action.payload.data,
        getProductError: action.payload.error,
      }

    case CREATE_PRODUCT:
      return {
        ...state,
        createProductLoading: action.payload.loading,
        createProductResult: action.payload.data,
        createProductError: action.payload.error,
      }

    case UPDATE_PRODUCT:
      return {
        ...state,
        updateProductLoading: action.payload.loading,
        updateProductResult: action.payload.data,
        updateProductError: action.payload.error,
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        deleteProductLoading: action.payload.loading,
        deleteProductResult: action.payload.data,
        deleteProductError: action.payload.error
      }

    case GET_CARTS:
      return {
        ...state,
        getCartsLoading: action.payload.loading,
        getCartsResult: action.payload.data,
        getCartsError: action.payload.error
      }

    case GET_CART_PRODUCTS:
      return {
        ...state,
        getCartProducsLoading: action.payload.loading,
        getCartProducsResult: action.payload.data,
        getCartProducsError: action.payload.error
      }

    case SHIP_ORDER:
      return {
        ...state,
        shipOrderLoading: action.payload.loading,
        shipOrderResult: action.payload.data,
        shipOrderError: action.payload.error,
      }

    case GET_CUSTOMER_INFORMATION:
      return {
        ...state,
        getCustInfLoading: action.payload.loading,
        getCustInfResult: action.payload.data,
        getCustInfError: action.payload.error,
      }

    case CREATE_CATEGORY:
      return {
        ...state,
        createCategoryLoading: action.payload.loading,
        createCategoryResult: action.payload.data,
        createCategoryError: action.payload.error,
      }

    case UPDATE_CATEGORY:
      return {
        ...state,
        updateCategoryLoading: action.payload.loading,
        updateCategoryResult: action.payload.data,
        updateCategoryError: action.payload.error,
      }

    case DELETE_CATEGORY:
      return {
        ...state,
        deleteCategoryLoading: action.payload.loading,
        deleteCategoryResult: action.payload.data,
        deleteCategoryError: action.payload.error,
      }

    case RESET_CART_AND_CUSTOMER:
      return {
        ...state,
        getCartProducsLoading: false,
        getCartProducsResult: false,
        getCartProducsError: false,
        getCustInfLoading: false,
        getCustInfResult: false,
        getCustInfError: false,
      }

    case LOGOUT:
      return {
        ...state,
        adminInitLoading: false,
        adminInitResult: false,
        adminInitError: false,
        adminData: {id: false, name:"", ajwt:""},
      }

    default:
        return state;
  }
}

export default admin;
