import axios from "axios";

export const PORT_API = 4000;

// FOR AMIN LOGIN AND SET DATA
export const ADMIN_LOGIN = "ADMIN_LOGIN";
export const ADMIN_INIT = "ADMIN_INIT";
export const SET_ADMIN_DATA = "SET_ADMIN_DATA";

// FOR ADMIN TO GET AND PROCESS THE DATA
export const GET_ABOUT_US = "GET_ABOUT_US";
export const CREATE_OR_UPDATE_ABOUT_US = "CREATE_OR_UPDATE_ABOUT_US"
// PRODUCT
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const GET_CARTS = "GET_CARTS"
export const GET_CART_PRODUCTS = "GET_CART_PRODUCTS"
export const SHIP_ORDER = "SHIP_ORDER";

export const GET_CUSTOMER_INFORMATION = "GET_CUSTOMER_INFORMATION";
export const RESET_CART_AND_CUSTOMER = "RESET_CART_AND_CUSTOMER";

export const CATEGORY = 'CATEGORY';
export const CATEGORIES = 'CATEGORIES';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const LOGOUT = "LOGOUT";

export const adminLogin = async (data, headers) => {
  let action = {
    status: false,
    token: false,
    messages: false
  }

  await axios.post(`http://localhost:${PORT_API}/admin/login`, data, headers)
  .then((res) => {
    action.status = res.status;
    action.token = res.data.token;
  })
  .catch((err) => {
    if (err.code === "ECONNABORTED") {
      action.messages = [ {"frontend":"Connection timeout"} ]
    } else {
      action.messages = [{"api":err.response.data.message}]
    }
  })

  return action;
  // return (dispatch) => {
  //   dispatch({
  //     type: ADMIN_LOGIN,
  //     payload: {
  //       loading: true,
  //       data: false,
  //       errors: false,
  //     }
  //   });

  //   axios.post(`http://localhost:${PORT_API}/admin/login`, data, headers)
  //   .then((res) => {
  //     dispatch({
  //       type: ADMIN_LOGIN,
  //       payload: {
  //         loading: false,
  //         data: res.data,
  //         errors: false
  //       }
  //     })
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: ADMIN_LOGIN,
  //       payload: {
  //         loading: false,
  //         data: false,
  //         error: {
  //           status: err.response.status,
  //           messages: [
  //             err.response.data.message
  //           ],
  //         }
  //       }
  //     })
  //   })
  // }
}

export const adminInit = (config) => {
  return (dispatch) => {
    dispatch({
      type: ADMIN_INIT,
      payload: {
        loading: true,
        data: false,
        error: false
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin`, {}, config)
    .then((res) => {
      dispatch({
        type: ADMIN_INIT,
        payload: {
          loading: false,
          data: res.data,
          error: false
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_INIT,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: [
              err.response.data.message
            ],
          }
        }
      })
    })
  }
}

export const setAdminData = (data) => {
  return (dispatch) => dispatch({
    type: SET_ADMIN_DATA,
    payload: {
      id: data.id,
      name: data.name,
      ajwt: data.ajwt,
    }
  })
}

export const getAboutUs = (headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_ABOUT_US,
      payload: {
        loading: true,
        data: false,
        errors: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin/about-us`, "", headers)
    .then((res) => {
      dispatch({
        type: GET_ABOUT_US,
        payload: {
          loading: false,
          data: res.data.data,
          errors: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ABOUT_US,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      });
    })
  }
}
export const createOrUpdateAboutUs = async (data, cfg) => {
  let action = {
    status: false,
    messages: false,
  }

  await axios.post(`http://localhost:${PORT_API}/admin/about-us/save`, data, cfg)
  .then((res) => {
    action.status = res.status
  })
  .catch((err) => {
    if (err.code === "ECONNABORTED") {
      action.messages = [ {"frontend":"Connection timeout"} ]
    } else {
      action.messages = err.response.data.messages
    }
  });

  return action;

  // return (dispatch) => {
  //   dispatch({
  //     type: CREATE_OR_UPDATE_ABOUT_US,
  //     payload: {
  //       loading: true,
  //       data: false,
  //       error: false
  //     }
  //   });

  //   axios.post(`http://localhost:${PORT_API}/admin/about-us/save`, data, headers)
  //   .then((res) => {
  //     dispatch({
  //       type: CREATE_OR_UPDATE_ABOUT_US,
  //       payload: {
  //         loading: false,
  //         data: res.data.action_status,
  //         error: false,
  //       }
  //     })
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: CREATE_OR_UPDATE_ABOUT_US,
  //       payload: {
  //         loading: false,
  //         data: false,
  //         error: {
  //           status: err.response.status,
  //           messages: err.response.data.messages
  //         }
  //       }
  //     })
  //   });
  // }
}
export const getProducts = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCTS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin/products`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: {
          loading: false,
          data: res.data,
          error: false
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: [ {"page": "Invalid page number or invalid limit number"} ]
          }
        }
      });
    })
  }
}
export const getProduct = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin/product/get-by-id`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_PRODUCT,
        payload: {
          loading: false,
          data: res.data,
          error: false
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PRODUCT,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      });
    })
  }
}

export const createProduct = async (data, headers) => {
  let action = {
    status: false,
    messages: false,
  }
  await axios.post(`http://localhost:${PORT_API}/admin/product/create`, data, headers)
  .then((res) => {
    action.status = res.status;
  })
  .catch((err) => {
    if (err.code === "ECONNABORTED") {
      action.messages = [ {"frontend":"Connection timeout"} ]
    } else {
      action.messages = err.response.data.messages
    }
  });

  return action
  // return (dispatch) => {
  //   dispatch({
  //     type: CREATE_PRODUCT,
  //     payload: {
  //       loading: true,
  //       data: false,
  //       error: false
  //     }
  //   });
  //   axios.post(`http://localhost:${PORT_API}/admin/product/create`, data, headers)
  //   .then((res) => {
  //     dispatch({
  //       type: CREATE_PRODUCT,
  //       payload: {
  //         loading: false,
  //         data: res.data,
  //         error: false
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: CREATE_PRODUCT,
  //       payload: {
  //         loading: false,
  //         data: false,
  //         error: {
  //           status: err.response.status,
  //           messages: err.response.data.messages
  //         }
  //       }
  //     });
  //   });
  // }
}

export const updateProduct = async (data, headers) => {
  let action = {
    status: false,
    messages: false,
  }
  await axios.post(`http://localhost:${PORT_API}/admin/product/update`, data, headers)
  .then((res) => {
    action.status = res.status;
  })
  .catch((err) => {
    if (err.code === "ECONNABORTED") {
      action.messages = [ {"frontend":"Connection timeout"} ]
    } else {
      action.messages = err.response.data.messages
    }
  });
  return action;
  // return (dispatch) => {
  //   dispatch({
  //     type: UPDATE_PRODUCT,
  //     payload: {
  //       loading: true,
  //       data: false,
  //       error: false
  //     }
  //   });
  //   axios.post(`http://localhost:${PORT_API}/admin/product/update`, data, headers)
  //   .then((res) => {
  //     dispatch({
  //       type: UPDATE_PRODUCT,
  //       payload: {
  //         loading: false,
  //         data: res.data,
  //         error: false
  //       }
  //     });
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: UPDATE_PRODUCT,
  //       payload: {
  //         loading: false,
  //         data: false,
  //         error: {
  //           status: err.response.status,
  //           messages: err.response.data.messages
  //         }
  //       }
  //     });
  //   })
  // }
}

export const deleteProduct = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin/product/delete`, data, headers)
    .then((res) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          }
        }
      })
    });
  }
}


export const getCarts = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_CARTS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin/carts`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_CARTS,
        payload: {
          loading: false,
          data: res.data,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CARTS,
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

export const getCartProducts = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_CART_PRODUCTS,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });

    axios.post(`http://localhost:${PORT_API}/admin/cart-products`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_CART_PRODUCTS,
        payload: {
          loading: false,
          data: res.data.data,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CART_PRODUCTS,
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

export const shipOrder = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: SHIP_ORDER,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })

    axios.post(`http://localhost:${PORT_API}/admin/cart/update`, data, headers)
    .then((res) => {
      dispatch({
        type: SHIP_ORDER,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: SHIP_ORDER,
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

export const getCustInf = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: GET_CUSTOMER_INFORMATION,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    });
    axios.post(`http://localhost:${PORT_API}/admin/user/get-by-id`, data, headers)
    .then((res) => {
      dispatch({
        type: GET_CUSTOMER_INFORMATION,
        payload: {
          loading: false,
          data: res.data.data,
          error: false,
        }
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_CUSTOMER_INFORMATION,
        payload: {
          loading: true,
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

export const resetCartAndCustomer = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CART_AND_CUSTOMER,
    })
  }
}

export const createCategory = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_CATEGORY,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })
    axios.post(`http://localhost:${PORT_API}/admin/category/create`, data, headers)
    .then((res) => {
      dispatch({
        type: CREATE_CATEGORY,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: CREATE_CATEGORY,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          },
        }
      })
    })
  }
}

export const updateCategory = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })
    axios.post(`http://localhost:${PORT_API}/admin/category/update`, data, headers)
    .then((res) => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          },
        }
      })
    })
  }
}

export const deleteCategory = (data, headers) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: {
        loading: true,
        data: false,
        error: false,
      }
    })
    axios.post(`http://localhost:${PORT_API}/admin/category/delete`, data, headers)
    .then((res) => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: {
          loading: false,
          data: res.data.action_status,
          error: false,
        }
      })
    })
    .catch((err) => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: {
          loading: false,
          data: false,
          error: {
            status: err.response.status,
            messages: err.response.data.messages
          },
        }
      })
    })
  }
}

export const logout = () => {
  localStorage.removeItem("ajwt");
  return (dispatch) => {
    dispatch({ type:LOGOUT })
  }
}
