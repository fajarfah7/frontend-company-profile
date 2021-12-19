import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
  CButton,
  CListGroup,
  CListGroupItem,
  CLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import '../style/product.css'
import {
  addToCart,
  getCartProducts,
  updateCartStatus,
  setCart,
  unsetAddToCart,
} from '../../../actions/user';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Cart = (props) => {
  const dispatch = useDispatch();

  const Swal2 = withReactContent(Swal)

  const user = useSelector((state) => state.UserReducer.user);
  const cart = useSelector((state) => state.UserReducer.cart);
  const getCartProductResult = useSelector((state) => state.UserReducer.getCartProductResult)
  const getCartProductError = useSelector((state) => state.UserReducer.getCartProductError)

  const addToCartResult = useSelector((state) => state.UserReducer.addToCartResult)
  const addToCartError = useSelector((state) => state.UserReducer.addToCartError)

  const updateCartStatusResult = useSelector((state) => state.UserReducer.updateCartStatusResult);
  const updateCartStatusError = useSelector((state) => state.UserReducer.updateCartStatusError);

  const [items, setItems] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0)

  useEffect(() => {
    if (!cart.id) {
      props.history.push({
        pathname:"/products"
      })
    }
  }, [cart.id])

  const doAddToCart = (prodId, amount) => {
    let ujwt = localStorage.getItem("ujwt")
    let data = { "cart_id":cart.id, "product_id":prodId, "amount":amount }
    dispatch(addToCart(ujwt, data))
  }

  const doPayCart = () => {
    let ujwt = localStorage.getItem("ujwt")
    let data = { "id":cart.id, "status":1 }
    dispatch(updateCartStatus(ujwt, data))
  }

  useEffect(() => {
    if(addToCartResult) {
      let ujwt = localStorage.getItem("ujwt")
      let data = { cart_id:cart.id }
      dispatch(unsetAddToCart())
      dispatch(getCartProducts(ujwt, data));
    }

    if(addToCartError) {
      Swal2.fire({
        icon:"error",
        title:"Sorry, there was an error",
      });
    }
  }, [addToCartResult, addToCartError]);

  useEffect(() => {
    if (getCartProductResult) {
      let products = getCartProductResult.cart_products
      products.sort((a, b) => {
        return a.id - b.id
      });
      setItems(products)

      let payment = 0;
      getCartProductResult.cart_products.map((cart, key) => {
        payment += cart.product.price * cart.amount
      });
      setTotalPayment(payment)
    }
    if (getCartProductError) {
      setItems([])
    }
  }, [getCartProductResult, getCartProductError])

  useEffect(() => {
    if (updateCartStatusResult) {
      dispatch({type:"PAY_CART", payload:{
        payCartLoading:false,
        updateCartStatusResult:false,
        updateCartStatusError:false,
      }});

      let ujwt = localStorage.getItem("ujwt")
      let data = {"user_id": user.id}
      dispatch(setCart(ujwt, data))

      Swal2.fire({
        icon:"success",
        title:"Success pay the cart, Thank You! (dummy)"
      }).then((ok) => {
        ok.isConfirmed && props.history.push({ pathname:"/products" })
      });
    }

    if (updateCartStatusError) {
      Swal2.fire({
        icon:"error",
        title:"We are sorry, there was an error when pay cart (dummy)"
      })
    }
  }, [updateCartStatusResult, updateCartStatusError])

  // const generatePaymentCode = () => {
  //   let result           = '';
  //   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let charactersLength = characters.length;
  //   for ( let i = 0; i < length; i++ ) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  return (
    <CRow>
      <CCol md="8">
        <CCard>
          <CCardHeader>
            <CCardTitle>Manage & Pay Items</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CListGroup accent>
              { items.length > 0 ? items.map((cart, _) => {
                let accent = ""
                if (cart.amount === 1) {
                  accent = "warning"
                } else if (cart.amount === 2 ) {
                  accent = "success"
                } else if (cart.amount === 3) {
                  accent = "info"
                } else {
                  accent = "primary"
                }
                return (
                  <CListGroupItem accent={accent} key={cart.product.id}>
                    <CRow>
                      <CCol md="6">
                        {cart.product.name} ({cart.product.dimension_description})
                      </CCol>

                    <CCol md="3">
                      <CButton
                        size="sm"
                        color="danger"
                        onClick={() => doAddToCart(parseInt(cart.product.id), -1)}>
                        <CIcon name="cilMinus" />
                      </CButton>

                      <CButton color="info" size="sm" style={{margin:"5px"}} >Qty {cart.amount}</CButton>

                      <CButton
                        size="sm"
                        color="success"
                        onClick={() => doAddToCart(parseInt(cart.product.id), 1)}>
                        <CIcon name="cilPlus" />
                      </CButton>

                    </CCol>
                    <CCol md="3">
                      <CLabel>Sub total: $ {cart.product.price * cart.amount}</CLabel>
                    </CCol>
                    </CRow>
                  </CListGroupItem>
                )
              }):<h1 className="text text-center">Sorry you do not have item</h1>}
            </CListGroup>
            { items.length > 0 ?
              <CButton
                color="info"
                className="mt-3"
                style={{width:"100%"}}
                onClick={doPayCart}
              >Pay $ {totalPayment}
              </CButton>:""
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Cart
