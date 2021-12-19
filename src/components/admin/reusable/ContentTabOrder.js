import React, {Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CButton,
  CRow,
  CCol,
  CTabContent,
  CTabPane,
  CListGroup,
  CListGroupItem,
  CPagination,
  CFormGroup,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { getCarts, getCartProducts, shipOrder } from '../../../actions/admin';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ContentTabOrder = React.memo((props) => {
  const dispatch = useDispatch()
  const Swal2 = withReactContent(Swal)
  const orderTab = useSelector((state) => state.AdminReducer.orderTab)
  const [search, setSearch] = useState("")
  const [carts, setCarts] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCart, setActiveCart] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)

  const limit = 2
  const ajwt = localStorage.getItem("ajwt");
  const headers = {
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${ajwt}`
    }
  }

  const {
    getCartsLoading,
    getCartsResult,
    getCartsError,
    getCartProducsLoading,
    getCartProducsResult,
    getCartProducsError,
    shipOrderResult,
    shipOrderError,
  } = useSelector((state) => state.AdminReducer)

  useEffect(() => {
    let data = { status: orderTab+1, page: currentPage, limit:limit }
    dispatch(getCarts(data, headers))
  }, [orderTab, currentPage, search]);

  useEffect(() => {
    if (getCartsResult) {
      setCurrentPage(currentPage === 0 ? 1:currentPage)
      setTotalPage(getCartsResult.total_page)
      setCarts(getCartsResult.data)
    }
    if (getCartsError) {
      setTotalPage(0)
      setCarts([]);
    }
  }, [getCartsResult, getCartsError])

  useEffect(() => {
    if (activeCart > 0) {
      let data = { "cart_id": activeCart }
      dispatch(getCartProducts(data, headers))
    }
  }, [activeCart]);

  useEffect(() => {
    if (getCartProducsResult) {
      let payment = 0;
      getCartProducsResult.map((cartProduct) => {
        payment += cartProduct.amount * cartProduct.product.price
      })
      setTotalPayment(payment)
    }
  }, [getCartProducsLoading, getCartProducsError]);

  useEffect(() => {
    if (shipOrderResult) {
      Swal2.fire({
        icon:"success",
        title:"Success ship the order",
      })
    }
    if (shipOrderError) {
      Swal2.fire({
        icon:"error",
        title:"Failed ship the order",
      })
    }
  }, [shipOrderResult, shipOrderError])

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
          payment_code: shipmentCode
        }
        console.log(data)
        dispatch(shipOrder(data, headers))
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  return (
    <Fragment>
      <CRow className="mt-3">
        <CCol md="12">
          <CFormGroup row>
            <CCol md="12">
              <CInputGroup>
                <CInput
                  type="text"
                  id="input2-group1"
                  name="input2-group1"
                  placeholder="Search by code"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CInputGroupAppend>
                  <CInputGroupText>
                    <CIcon name="cil-search" />
                  </CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>

      {getCartsLoading && <h1>Loading...</h1>}
      {getCartsResult && <CTabContent className="mt-3">
        <CTabPane>
          <CRow>
            <CCol md="6">
              <CListGroup>
                { carts.length && carts.map((cart) => {
                  return (
                    <CListGroupItem key={cart.id}
                      action
                      onClick={() => {
                        if (orderTab+1 === 1) {
                          setActiveCart(cart.id)
                        }
                      }}
                      active={activeCart === cart.id}
                    >{cart.payment_code}</CListGroupItem>
                  )
                })}
              </CListGroup>
            </CCol>
            <CCol md="6">
              <CTabContent>
                <CTabPane active={true}>
                  {
                    getCartProducsResult && getCartProducsResult.map((cartProduct) => {
                      return (
                        <CRow key={cartProduct.id}>
                          <CCol md="6">
                            {cartProduct.product.name}
                          </CCol>
                          <CCol md="6">
                            <h6 className="float-right">$ {cartProduct.amount} x {cartProduct.product.price} = {cartProduct.amount * cartProduct.product.price}</h6>
                          </CCol>
                        </CRow>
                      )
                    })
                  }
                  {
                    getCartProducsResult &&
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
                      <CRow>
                        <CCol md="12">
                          <CButton
                            color="info"
                            variant="outline"
                            style={{width:"100%"}}
                            className="float-right"
                            onClick={doShipOrder}
                          >Ship the order <CIcon name="cil-send" />
                          </CButton>
                        </CCol>
                      </CRow>
                    </Fragment>
                  }
                </CTabPane>
              </CTabContent>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="12">
              <CPagination
                className="mt-4"
                align="center"
                addListClass="some-class"
                activePage={currentPage}
                pages={totalPage}
                onActivePageChange={(e) => {
                  setCurrentPage(e)
                }}
              />
            </CCol>
          </CRow>
        </CTabPane>
      </CTabContent>}
      {getCartsError && <h1>There is no data</h1>}
    </Fragment>
  )
})

export default ContentTabOrder;
