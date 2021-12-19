import React, {Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  getCarts,
  getCartProducts,
  getCustInf,
  shipOrder,
  resetCartAndCustomer
} from '../../../actions/admin';


const Dashboard = () => {
  const dispatch = useDispatch()
  const Swal2 = withReactContent(Swal)
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCart, setActiveCart] = useState(0);
  const [custInf, setCustInf] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0);
  const [orderStatus, setOrderStatus] = useState(1);

  const limit = 3
  const ajwt = localStorage.getItem("ajwt");
  const headers = useMemo(() => {
    return {
      headers: {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${ajwt}`
      }
    }
  }, [ajwt])

  const {
    getCartsLoading,
    getCartsResult,
    getCartsError,
    getCartProducsLoading,
    getCartProducsResult,
    getCartProducsError,
    shipOrderResult,
    shipOrderError,
    getCustInfResult,
  } = useSelector((state) => state.AdminReducer)

  useEffect(() => {
    if (ajwt !== null) {
      let data = { status: orderStatus, page: currentPage, limit:limit }
      dispatch(getCarts(data, headers))
    }
  }, [dispatch, orderStatus, currentPage, headers]);

  useEffect(() => {
    if (getCartsResult) {
      setCurrentPage(currentPage === 0 ? 1:currentPage)
      setTotalPage(getCartsResult.total_page)
    }
    if (getCartsError) {
      setTotalPage(0)
    }
  }, [getCartsResult, getCartsError, currentPage])

  useEffect(() => {
    if (activeCart > 0 && ajwt !== null) {
      let dataCartProd = { "cart_id": activeCart }
      let dataCustInf = { "id": custInf }
      dispatch(getCartProducts(dataCartProd, headers))
      dispatch(getCustInf(dataCustInf, headers))
    }
  }, [
    dispatch,
    activeCart,
    headers,
    custInf,
  ]);

  useEffect(() => {
    if (getCartProducsResult) {
      let payment = 0;
      getCartProducsResult.map((cartProduct) => {
        return payment += cartProduct.amount * cartProduct.product.price
      })
      setTotalPayment(payment)
    }
  }, [getCartProducsResult, getCartProducsError]);

  useEffect(() => {
    if (shipOrderResult) {
      Swal2.fire({
        icon:"success",
        title:"Success ship the order",
      })
    }
    if (shipOrderError) {
      let message = "Failed ship the order";
      if (shipOrderError.messages){
        if (shipOrderError.messages.length) {
          message = shipOrderError.messages[0].api;
        }
      }

      Swal2.fire({
        icon:"error",
        title:message,
      })
    }
  }, [shipOrderResult, shipOrderError, Swal2])

  const doShipOrder = () => {
    Swal2.fire({
      title: "Shipment Code",
      input: "text",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: "Process",
      showLoaderOnConfirm: true,
      preConfirm: (shipmentCode) => {
        let data = {
          id:activeCart,
          status:2,
          shipment_code: shipmentCode
        }
        dispatch(shipOrder(data, headers))
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }
  return (
    <Fragment>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardHeader>
              Order List
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol md="8">
                  <CButton style={{width:"31%"}} className={orderStatus === 1 ? "btn btn-primary btn-square":"btn btn-outline-primary btn-square"} onClick={() => {
                    setActiveCart(0)
                    setOrderStatus(1)
                    setCurrentPage(1)
                    dispatch(resetCartAndCustomer())
                  }}>Paid <CIcon name="cil-money" /></CButton>
                  <CButton style={{width:"31%"}} className={orderStatus === 2 ? "btn btn-primary btn-square m-1":"btn btn-outline-primary btn-square m-1"} onClick={() => {
                    setActiveCart(0)
                    setOrderStatus(2)
                    setCurrentPage(1)
                    dispatch(resetCartAndCustomer())
                  }}>Shipped <CIcon name="cil-send" /></CButton>
                  <CButton style={{width:"31%"}} className={orderStatus === 3 ? "btn btn-primary btn-square":"btn btn-outline-primary btn-square"} onClick={() => {
                    setActiveCart(0)
                    setOrderStatus(3)
                    setCurrentPage(1)
                    dispatch(resetCartAndCustomer())
                  }}>Finished <CIcon name="cil-check-circle"/></CButton>
                </CCol>
              </CRow>
              {getCartsLoading === true ? <h1>Loading...</h1>:""}
              {getCartsResult !== false ?
              <Fragment>
                <CRow className="mt-3">
                  <CCol md="4">
                    <CListGroup>
                      { getCartsResult.data.map((cart) => {
                        return (
                          <CListGroupItem key={cart.id}
                            action
                            onClick={() => {
                              setActiveCart(cart.id)
                              setCustInf(cart.user_id)
                            }}
                            active={activeCart === cart.id}
                          >{cart.payment_code}</CListGroupItem>
                        )
                      })}
                    </CListGroup>
                  </CCol>
                  {getCartProducsLoading && <h1>Loading...</h1>}
                  {getCartProducsResult &&
                    <CCol md="4">
                      {
                        getCartProducsResult.map((cartProduct) => {
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
                            <h5 className="float-right">{totalPayment}</h5>
                          </CCol>
                        </CRow>
                      </Fragment>
                    </CCol>
                  }
                  { getCustInfResult &&
                    <CCol md="4">
                      <CFormGroup row>
                        <CCol md="4">Name:</CCol>
                        <CCol md="8">{getCustInfResult.name}</CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="4">Contact:</CCol>
                        <CCol md="8">{getCustInfResult.phone_number}</CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="4">Address:</CCol>
                        <CCol md="8">{getCustInfResult.address}</CCol>
                      </CFormGroup>
                    </CCol>
                  }
                </CRow>
                {getCartProducsResult && getCustInfResult && orderStatus === 1 &&<CRow>
                  <CCol md="4" className="offset-md-8">
                    <CButton
                      color="info"
                      variant="outline"
                      className="btn-square"
                      style={{width:"100%"}}
                      onClick={doShipOrder}
                    >Ship the order <CIcon name="cil-send" />
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
                    dispatch(resetCartAndCustomer())
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

export default Dashboard;
