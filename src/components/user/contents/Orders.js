import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getListCartProducts,
} from '../../../actions/user';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CListGroup,
  CListGroupItem,
  CPagination,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  getCarts,
  getCartItems,
  resetCartItems,
  updateCartStatus,
} from '../../../actions/user';

const Orders = () => {
  const dispatch = useDispatch()
  const Swal2 = withReactContent(Swal)
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCart, setActiveCart] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [orderStatus, setOrderStatus] = useState(1);
  const [keyWord, setKeyWord] = useState("")

  const limit = 3
  const ujwt = localStorage.getItem("ujwt");
  const headers = {
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${ujwt}`
    }
  }
  const user = useSelector((state) => state.UserReducer.user)
  const {
    getCartsLoading,
    getCartsResult,
    getCartsError,

    getCartItemsLoading,
    getCartItemsResult,
    getCartItemsError,

    updateCartStatusResult,
    updateCartStatusError,
  } = useSelector((state) => state.UserReducer)

  useEffect(() => {
    let data = {
      user_id:user.id,
      status:orderStatus,
      page:currentPage,
      limit:limit,
      key:keyWord,
    }
    dispatch(getCarts(data, headers))
  }, [orderStatus, currentPage, keyWord]);

  useEffect(() => {
    if (getCartsResult) {
      setCurrentPage(currentPage === 0 ? 1:currentPage)
      setTotalPage(getCartsResult.total_page)
    }
    console.log(getCartsResult)
    if (getCartsError) {
      setTotalPage(0)
    }
  }, [getCartsResult, getCartsError])

  useEffect(() => {
    if (activeCart > 0) {
      let dataCartProd = { "cart_id": activeCart }
      dispatch(getCartItems(dataCartProd, headers))
    }
  }, [activeCart]);

  useEffect(() => {
    if (getCartItemsResult) {
      let payment = 0;
      getCartItemsResult.map((cartProduct) => {
        payment += cartProduct.amount * cartProduct.product.price
      })
      setTotalPayment(payment)
    }
  }, [getCartItemsResult]);

  useEffect(() => {
    if (updateCartStatusResult) {
      setActiveCart(0)
      setOrderStatus(orderStatus)
      setCurrentPage(1)
      dispatch(resetCartItems())

      Swal2.fire({
        icon: "success",
        title: "Order was received, Thank You"
      });
    }
    if (updateCartStatusError) {
      Swal2.fire({
        icon: "error",
        title: "We are sorry, failed update order status"
      });
    }
  }, [updateCartStatusResult, updateCartStatusError])

  const receiveOrder = () => {
    let cartID = activeCart;
    let status = 3;
    let data = {"id":cartID, status:status}
    dispatch(updateCartStatus(ujwt,data))
  }

  return (
    <Fragment>
      <CRow>
        <CCol md="7">
          <CCard>
            <CCardHeader>
              Order List
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="8">
                  <CButton style={{width:"32%"}} className={orderStatus === 1 ? "btn btn-primary btn-square":"btn btn-outline-primary btn-square"} onClick={() => {
                    setActiveCart(0)
                    setOrderStatus(1)
                    setCurrentPage(1)
                    dispatch(resetCartItems())
                  }}>Paid <CIcon name="cil-money" /></CButton>
                  <CButton style={{width:"32%"}} className={orderStatus === 2 ? "btn btn-primary btn-square m-1":"btn btn-outline-primary btn-square m-1"} onClick={() => {
                    setActiveCart(0)
                    setOrderStatus(2)
                    setCurrentPage(1)
                    dispatch(resetCartItems())
                  }}>Shipped <CIcon name="cil-send" /></CButton>
                  <CButton style={{width:"32%"}} className={orderStatus === 3 ? "btn btn-primary btn-square":"btn btn-outline-primary btn-square"} onClick={() => {
                    setActiveCart(0)
                    setOrderStatus(3)
                    setCurrentPage(1)
                    dispatch(resetCartItems())
                  }}>Finished <CIcon name="cil-check-circle"/></CButton>
                </CCol>
                <CCol md="4">
                  <CFormGroup className="mt-1">
                    <CInputGroup>
                      <CInput
                        id="search"
                        name="search"
                        placeholder="Search"
                        autoComplete="search"
                        onChange={(e) => setKeyWord(e.target.value)}
                      />
                      <CInputGroupPrepend>
                        <CInputGroupText><CIcon name="cil-search" /></CInputGroupText>
                      </CInputGroupPrepend>
                    </CInputGroup>
                  </CFormGroup>
                </CCol>
              </CRow>
              {getCartsLoading === true ? <h1>Loading...</h1>:""}
              {getCartsResult !== false ?
              <Fragment>
                <CRow className="mt-3">
                  <CCol md="6">
                    <CListGroup>
                      { getCartsResult.data.map((cart) => {
                        return (
                          <CListGroupItem key={cart.id}
                            action
                            onClick={() => {
                              setActiveCart(cart.id)
                            }}
                            active={activeCart === cart.id}
                          >{cart.payment_code}</CListGroupItem>
                        )
                      })}
                    </CListGroup>
                  </CCol>
                  {getCartItemsLoading && <h1>Loading...</h1>}
                  {getCartItemsResult &&
                    <CCol md="6">
                      {
                        getCartItemsResult.map((cartProduct) => {
                          return (
                            <CRow key={cartProduct.id}>
                              <CCol md="6">
                                {cartProduct.product.name}
                              </CCol>
                              <CCol md="6">
                                <h5 className="float-right">$ {cartProduct.amount} x {cartProduct.product.price} = {cartProduct.amount * cartProduct.product.price}</h5>
                              </CCol>
                            </CRow>
                          )
                        })
                      }
                      <Fragment>
                        <hr />
                        <CRow>
                          <CCol md="6">
                            <h5>Total</h5>
                          </CCol>
                          <CCol md="6">
                            <h5 className="float-right">$ {totalPayment}</h5>
                          </CCol>
                        </CRow>
                      </Fragment>
                    </CCol>
                  }
                </CRow>
                {getCartItemsResult && orderStatus === 2 &&<CRow>
                  <CCol md="6" className="offset-md-6">
                    <CButton
                      color="info"
                      variant="outline"
                      className="btn-square"
                      style={{width:"100%"}}
                      onClick={() => {
                        receiveOrder()
                      }}
                    >Receive the order <CIcon name="cil-send" />
                    </CButton>
                  </CCol>
                </CRow>}

                <CPagination
                  className="mt-4"
                  align="center"
                  addListClass="some-class"
                  activePage={currentPage}
                  pages={totalPage}
                  onActivePageChange={(e) => {
                    setCurrentPage(e)
                    setActiveCart(0)
                    dispatch(resetCartItems())
                  }}
                />
              </Fragment>:""
              }
              {getCartsError !== false ? <h1 className="mt-2">There is no data</h1>:""}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </Fragment>
  )
}

export default Orders
