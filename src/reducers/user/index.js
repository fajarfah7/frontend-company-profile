import {
  REGISTER,
  THREE_NEWEST_PRODUCTS,
  PRODUCT_DETAIL,
  LOGIN,
  SET_USER,
  UNSET_USER,
  SET_CART,
  UNSET_CART,
  ADD_TO_CART,
  UNSET_ADD_TO_CART,
  GET_CART_PRODUCTS,

  GET_CARTS, // load order list
  GET_CART_ITEMS, // for detail of order list purpose

  UPDATE_CART_STATUS,
  RESET_CART_ITEMS,

  CATEGORY,
  CATEGORIES,

  ABOUT_US,

  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  PRODUCT_PAGINATION_DATA,
} from "../../actions/user"

const initialState = {
  productPagination: [],
  user: {
    id:false,
    address:false,
    email:false,
    name:false,
    phoneNumber:false,
    ujwt:false,
    username:false,
  },
  cart: {
    id: false,
    userId: false,
    status: false,
  },

  registerLoading: false,
  registerResult: false,
  registerError: false,

  loginLoading: false,
  loginResult: false,
  loginError: false,

  productPaginationDataResult:{
    categoryID:   0,
    searchKey:    "",
    count:        0,
    currentPage:  0,
    data:         [],
    nextPage:     0,
    previousPage: 0,
    totalPage:    0,
  },

  productDetailLoading: false,
  productDetailResult: false,
  productDetailError: false,

  addToCartLoading: false,
  addToCartResult: false,
  addToCartError: false,

  getCartProductLoading: false,
  getCartProductResult: false,
  getCartProductError: false,

  getCartsLoading: false,
  getCartsResult: false,
  getCartsError: false,

  getCartItemsLoading: false,
  getCartItemsResult: false,
  getCartItemsError: false,

  getCartProductsLoading: false,
  getCartProductsResult: false,
  getCartProductsError: false,

  updateCartStatusLoading: false,
  updateCartStatusResult: false,
  updateCartStatusError: false,

  threeNewestProductsLoading: false,
  threeNewestProductsResult: false,
  threeNewestProductsError: false,

  categoryLoading: false,
  categoryResult: false,
  categoryError: false,

  categoriesLoading: false,
  categoriesResult: false,
  categoriesError: false,

  aboutUsLoading: false,
  aboutUsResult: false,
  aboutUsError: false,

  updateUserLoading: false,
  updateUserResult: false,
  updateUserError: false,

  updateUserPasswordLoading: false,
  updateUserPasswordResult: false,
  updateUserPasswordError: false,
}

const user = (state = initialState, action) => {
  switch(action.type ) {
    case PRODUCT_PAGINATION_DATA:
      return {
        ...state,
        productPaginationDataResult: {
          categoryID:   action.payload.categoryID,
          searchKey:    action.payload.searchKey,
          count:        action.payload.count,
          currentPage:  action.payload.currentPage,
          data:         [
                          ...state.productPaginationDataResult.data,
                          action.payload.data
                        ],
          nextPage:     action.payload.nextPage,
          previousPage: action.payload.previousPage,
          totalPage:    action.payload.totalPage,
        }
      }

    case PRODUCT_DETAIL:
      return {
        ...state,
        productDetailLoading: action.payload.loading,
        productDetailResult: action.payload.data,
        productDetailError: action.payload.error
      }
    case REGISTER:
      return {
        ...state,
        registerLoading: action.payload.loading,
        registerResult: action.payload.data,
        registerError: action.payload.error
      }
    case LOGIN:
      return {
        ...state,
        loginLoading: action.payload.loading,
        loginResult: action.payload.data,
        loginError: action.payload.error
      }

    case SET_USER:
      return {
        ...state,
        user: {
          id:action.payload.id,
          address:action.payload.address,
          email:action.payload.email,
          name:action.payload.name,
          phoneNumber:action.payload.phoneNumber,
          ujwt:action.payload.ujwt,
          username:action.payload.username,
        }
      }
    case UNSET_USER:
      return {
        ...state,
        user: {
          id:false,
          address:false,
          email:false,
          name:false,
          phoneNumber:false,
          ujwt:false,
          username:false,
        }
      }
    case SET_CART:
      return {
        ...state,
        cart: {
          id: action.payload.id,
          userId: action.payload.userId,
          status: action.payload.status,
        }
      }
    case UNSET_CART:
      return {
        ...state,
        cart: {
          id: false,
          userId: false,
          status: false,
        }
      }
    case ADD_TO_CART:
      return {
        ...state,
        addToCartLoading: action.payload.loading,
        addToCartResult: action.payload.data,
        addToCartError: action.payload.error
      }
    case UNSET_ADD_TO_CART:
      return {
        ...state,
        addToCartLoading: false,
        addToCartResult: false,
        addToCartError: false,
      }
    case GET_CART_PRODUCTS:
      return {
        ...state,
        getCartProductLoading: action.payload.loading,
        getCartProductResult: action.payload.data,
        getCartProductError: action.payload.error
      }

    case GET_CARTS:
      return {
        ...state,
        getCartsLoading: action.payload.loading,
        getCartsResult: action.payload.data,
        getCartsError: action.payload.error,
      }

    case GET_CART_ITEMS:
      return {
        ...state,
        getCartItemsLoading: action.payload.loading,
        getCartItemsResult: action.payload.data,
        getCartItemsError: action.payload.error,
      }

    case RESET_CART_ITEMS:
      return {
        ...state,
        getCartItemsLoading: false,
        getCartItemsResult: false,
        getCartItemsError: false,
      }

    case UPDATE_CART_STATUS:
      return {
        ...state,
        updateCartStatusLoading: action.payload.loading,
        updateCartStatusResult: action.payload.data,
        updateCartStatusError: action.payload.error,
      }
    case THREE_NEWEST_PRODUCTS:
      return {
        ...state,
        threeNewestProductsLoading: action.payload.loading,
        threeNewestProductsResult: action.payload.data,
        threeNewestProductsError: action.payload.error,
      }
    case CATEGORY:
      return {
        ...state,
        categoryLoading: action.payload.loading,
        categoryResult: action.payload.data,
        categoryError: action.payload.error,
      }

    case CATEGORIES:
      return {
        ...state,
        categoriesLoading: action.payload.loading,
        categoriesResult: action.payload.data,
        categoriesError: action.payload.error,
      }

    case ABOUT_US:
      return {
        ...state,
        aboutUsLoading: action.payload.loading,
        aboutUsResult: action.payload.data,
        aboutUsError: action.payload.error,
      }

    case UPDATE_USER:
      return {
        ...state,
        updateUserLoading: action.payload.loading,
        updateUserResult: action.payload.data,
        updateUserError: action.payload.error,
      }

    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        updateUserPasswordLoading: action.payload.loading,
        updateUserPasswordResult: action.payload.data,
        updateUserPasswordError: action.payload.error,
      }
    default:
      return state

  }
}

export default user;
