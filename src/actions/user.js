import axios from 'axios'

export const PORT_API = 4000;

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";
export const SET_CART = "SET_CART";
export const UNSET_CART = "UNSET_CART";

export const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";

export const GET_CARTS = "GET_CARTS";
export const GET_CART_ITEMS = "GET_CART_ITEMS";
export const RESET_CART_ITEMS = "RESET_CART_ITEMS";

export const ADD_TO_CART = "ADD_TO_CART";
export const UNSET_ADD_TO_CART = "UNSET_ADD_TO_CART";
export const UPDATE_CART_STATUS = "UPDATE_CART_STATUS";

export const PRODUCT_PAGINATION_DATA = "LOAD_PRODUCTS";
export const SET_PRODUCT_PAGINATION = "SET_PRODUCT_PAGINATION";
export const PRODUCT_DETAIL = "PRODUCT_DETAIL";

export const THREE_NEWEST_PRODUCTS = "THREE_NEWEST_PRODUCTS";

export const CATEGORY = "CATEGORY"
export const CATEGORIES = "CATEGORIES"

export const ABOUT_US = "ABOUT_US";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";

export const register = (headers, data) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER,
      payload: {
        loading: true,
        data: false,
        error: false
      }
    });

    axios.post(`http://localhost:${PORT_API}/user/create`, data, headers)
    .then((res) => {
      dispatch({
        type: REGISTER,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: REGISTER,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      });
    });
  }
}
export const login = (headers, data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: {
        loading: true,
        data: false,
        error: false
      }
    })

    axios.post(`http://localhost:${PORT_API}/user/login`, data, headers)
    .then((res) => {
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          data: res.data,
          error: false
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: LOGIN,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      })
    })
  }
}
export const setUser = (ujwt) => {
  const headerInit = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${ujwt}`
    }
  }
  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: {
        id:false,
        address:false,
        email:false,
        name:false,
        phoneNumber:false,
        ujwt:false,
        username:false,
      }
    })

    axios.post(`http://localhost:${PORT_API}/user/get-by-username`, {}, headerInit)
    .then((res) => {
      let user = res.data.data;
      dispatch({
        type: SET_USER,
        payload: {
          id:user.id,
          address:user.address,
          email:user.email,
          name:user.name,
          phoneNumber:user.phone_number,
          ujwt:ujwt,
          username:user.username,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_USER,
        payload: {
          id:false,
          address:false,
          email:false,
          name:false,
          phoneNumber:false,
          ujwt:false,
          username:false,
        }
      })
    })
  }
}
export const unsetUser = () => {
  return (dispatch) => {
    dispatch({
      type: UNSET_USER
    })
  }
}
export const setCart = (ujwt, data) => {
  const headerInit = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${ujwt}`
    }
  }
  return (dispatch) => {
    dispatch({
      type:SET_CART,
      payload:{
        id: false,
        userId: false,
        status: false,
      }
    })
    axios.post(`http://localhost:${PORT_API}/user/cart`, data, headerInit)
    .then((res) => {
      dispatch({
        type:SET_CART,
        payload:{
          id: res.data.data.id,
          userId: res.data.data.user_id,
          status: res.data.data.status,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type:SET_CART,
        payload:{
          id: false,
          userId: false,
          status: false,
        }
      })
    });
  }
}
export const unsetCart = () => {
  return (dispatch) => {
    dispatch({
      type: UNSET_CART,
    })
  }
}

// data = {cart_id, product_id, amount}
export const addToCart = (ujwt, data) => {
  const headers = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${ujwt}`
    }
  }

  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })

    axios.post(`http://localhost:${PORT_API}/user/cart-product/save`, data, headers)
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      })
    })
  }
}
export const unsetAddToCart = () => {
  return (dispatch) => {
    dispatch({ type:UNSET_ADD_TO_CART })
  }
}
// data = {cart_id}
export const getCartProducts = (ujwt, data) => {
  const headers = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${ujwt}`
    }
  }

  return (dispatch) => {
    dispatch({
      type: GET_CART_PRODUCTS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })

    axios.post(`http://localhost:${PORT_API}/user/cart-item`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_CART_PRODUCTS,
        payload: {
          loading: false,
          data: res.data.data,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_CART_PRODUCTS,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      })
    })
  }
}

// data = {user_id}
export const getCarts = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_CARTS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })

    axios.post(`http://localhost:${PORT_API}/user/carts`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_CARTS,
        payload: {
          loading: false,
          data: res.data,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_CARTS,
        payload: {
          loading: false,
          data: false,
          error: {
            status: 500,
            messages: [{"api":"Unknown error occured"}]
          }
        }
      })
    })
  }
}

export const getCartItems = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_CART_ITEMS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/user/cart-items`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_CART_ITEMS,
        payload: {
          loading: false,
          data: res.data.data,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CART_ITEMS,
        payload: {
          loading: false,
          data: false,
          error: {
            status: 500,
            messages: [ {"api":"Unknown error occured"} ],
          },
        }
      });
    });
  }
}

export const resetCartItems = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CART_ITEMS
    })
  }
}

// data = {cart_id, product_id, amount}
export const updateCartStatus = (ujwt, data) => {
  const headers = {
    headers: {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${ujwt}`
    }
  }

  return (dispatch) => {
    dispatch({
      type: UPDATE_CART_STATUS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })

    axios.post(`http://localhost:${PORT_API}/user/cart/update`, data, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_CART_STATUS,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_CART_STATUS,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      })
    })
  }
}

export const productPaginationData = async (headers, data) => {
  let paginationData = {
    count:        0,
    currentPage:  0,
    data:         [],
    nextPage:     0,
    previousPage: 0,
    totalPage:    0,
  }

  await axios.post(`http://localhost:${PORT_API}/products`, data, headers)
  .then((res) => {
    paginationData.count = res.data.count;
    paginationData.currentPage = res.data.current_page;
    paginationData.data = res.data.data;
    paginationData.nextPage = res.data.next_page;
    paginationData.previousPage =res.data.previous_page;
    paginationData.totalPage = res.data.total_page;
  })
  .catch(() => {
    paginationData.count = 0;
    paginationData.currentPage = 0;
    paginationData.data = [];
    paginationData.nextPage = 0;
    paginationData.previousPage = 0;
    paginationData.totalPage = 0;
  });

  return paginationData
  // return (dispatch) => {
  //   dispatch({
  //     type: PRODUCT_PAGINATION_DATA,
  //     payload: {
  //       categoryID:   0,
  //       searchKey:    "",
  //       count:        0,
  //       currentPage:  0,
  //       data:         [],
  //       nextPage:     0,
  //       previousPage: 0,
  //       totalPage:    0,
  //     }
  //   });

  //   axios.post(`http://localhost:${PORT_API}/products`, data, headers)
  //   .then((res) => {
  //     dispatch({
  //       type: PRODUCT_PAGINATION_DATA,
  //       payload: {
  //         categoryID:   data.category_id,
  //         searchKey:    data.key,
  //         count:        res.data.count,
  //         currentPage:  res.data.current_page,
  //         data:         res.data.data,
  //         nextPage:     res.data.next_page,
  //         previousPage: res.data.previous_page,
  //         totalPage:    res.data.total_page,
  //       }
  //     })
  //   })
  //   .catch(() => {
  //     dispatch({
  //       type: PRODUCT_PAGINATION_DATA,
  //       payload: {
  //         categoryID:   0,
  //         searchKey:    "",
  //         count:        0,
  //         currentPage:  0,
  //         data:         [],
  //         nextPage:     0,
  //         previousPage: 0,
  //         totalPage:    0,
  //       }
  //     })
  //   })
  // }
}

export const productDetail = (headers, data) => {
  return (dispatch) => {
    dispatch({
      type: PRODUCT_DETAIL,
      payload: {
        loading: true,
        data: false,
        error: false
      }
    })

    axios.post(`http://localhost:${PORT_API}/product/get-by-id`, data, headers)
    .then((res) => {
      dispatch({
        type: PRODUCT_DETAIL,
        payload: {
          loading: false,
          data: res.data.data,
          error: false
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: PRODUCT_DETAIL,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      })
    })
  }
}

export const threeNewestProducts = (headers) => {
  return (dispatch) => {
    dispatch({
      type: THREE_NEWEST_PRODUCTS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/product/three-newest`, {}, headers)
    .then((res) => {
      dispatch({
        type: THREE_NEWEST_PRODUCTS,
        payload: {
          loading: false,
          data: res.data.data,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: THREE_NEWEST_PRODUCTS,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages,
          },
        }
      });
    })
  }
}

export const category = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })
    axios.post(`http://localhost:${PORT_API}/category`, data, headers)
    .then((res) => {
      dispatch({
        type: CATEGORY,
        payload: {
          loading: false,
          data: res.data,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: CATEGORY,
        payload: {
          loading: false,
          data: false,
          error: {
            status: 500,
            messages: [{"api":"Unknown error occured"}]
          },
        }
      })
    })
  }
}

export const categories = (headers) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORIES,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })
    axios.post(`http://localhost:${PORT_API}/categories`, {}, headers)
    .then((res) => {
      dispatch({
        type: CATEGORIES,
        payload: {
          loading: false,
          data: res.data,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: CATEGORIES,
        payload: {
          loading: false,
          data: false,
          error: {
            status: 500,
            messages: [{"api":"Unknown error occured"}]
          },
        }
      })
    })
  }
}

export const aboutUs = (headers) => {
  return (dispatch) => {
    dispatch({
      type: ABOUT_US,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/about-us`,{},headers)
    .then((res) => {
      dispatch({
        type: ABOUT_US,
        payload: {
          loading: false,
          data: res.data,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: ABOUT_US,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages,
          },
        }
      });
    })
  }
}

export const updateUser = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });
    axios.post(`http://localhost:${PORT_API}/user/update`, data, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages,
          },
        }
      })
    })
  }
}

export const updateUserPassword = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });
    axios.post(`http://localhost:${PORT_API}/user/update-password`, data, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_USER_PASSWORD,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_PASSWORD,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages,
          },
        }
      })
    })
  }
}
