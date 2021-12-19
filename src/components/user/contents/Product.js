import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productDetail } from '../../../actions/user';
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CFormGroup,
  CButton,
} from '@coreui/react';
import LoginModal from '../reusable/LoginModal';
import { addToCart, unsetAddToCart } from '../../../actions/user';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = (props) => {
  const dispatch = useDispatch()
  const modalRef = useRef()
  const Swal2 = withReactContent(Swal)
  const notifSuccessAddToCart = () => toast("Success added to cart");

  const [productImage, setProductImage] = useState("")

  const productDetailLoading = useSelector((state) => state.UserReducer.productDetailLoading)
  const productDetailResult = useSelector((state) => state.UserReducer.productDetailResult)
  const productDetailError = useSelector((state) => state.UserReducer.productDetailError)

  const addToCartLoading = useSelector((state) => state.UserReducer.addToCartLoading)
  const addToCartResult = useSelector((state) => state.UserReducer.addToCartResult)
  const addToCartError = useSelector((state) => state.UserReducer.addToCartError)

  const user = useSelector((state) => state.UserReducer.user);
  const cart = useSelector((state) => state.UserReducer.cart);

  const headers = {
    headers: {
      "Content-Type":"application/json"
    }
  }
  const id = parseInt(props.match.params.id)

  useEffect(() => {
    dispatch(productDetail(headers, {"id":id}))
  }, [dispatch]);

  useEffect(() => {
    if (productDetailResult) {
      let imagePath = productDetailResult.product_image
      setProductImage("http://localhost:4000/images/"+imagePath)
    }
  }, [productDetailResult])

  const doAddToCart = () => {
    let ujwt = localStorage.getItem("ujwt")
    let cartId = cart.id
    let productId = id
    let amount = 1
    let data = { "cart_id":cartId, "product_id":productId, "amount":amount }
    dispatch(addToCart(ujwt, data))
  }

  useEffect(() => {
    if (addToCartResult) {
      notifSuccessAddToCart()
      dispatch(unsetAddToCart())
    }

    if (addToCartError) {
      let errorMessages = "<ul>";
      for (const errorMsg of addToCartError.messages){
        for (const [_, message] of Object.entries(errorMsg)){
          errorMessages += `<li style="text-align:left; color:red;">${message}</li>`;
        }
      }
      errorMessages += "</ul>";

      return Swal2.fire({
        icon:"error",
        title:"Sorry, there was error",
        html:errorMessages,
        showCloseButton:true,
      });
    }
  }, [addToCartResult, addToCartError]);

  return (
    <div>
      <ToastContainer />
      <LoginModal ref={modalRef} />
      <CRow>
        <CCol md="8" offset="2">
          { !productDetailError &&
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol md="4">
                    <img style={{width:"100%"}} src={ productImage } />
                  </CCol>
                  <CCol md="8">
                    <CFormGroup row>
                      <CCol md="3">Name</CCol>
                      <CCol md="9">{productDetailResult.name}</CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">Description</CCol>
                      <CCol md="8">{productDetailResult.description}</CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">Dimension</CCol>
                      <CCol md="8">{productDetailResult.dimension_description}</CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">Price</CCol>
                      <CCol md="8">$ {productDetailResult.price}</CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">Stock</CCol>
                      <CCol md="8">{productDetailResult.stock}</CCol>
                    </CFormGroup>
                    { user.username && <CButton
                      onClick={() => doAddToCart()}
                      style={{width:"100%", marginBottom:"0px"}}
                      className="btn btn-primary btn-sm"
                      disabled={addToCartLoading}>Add to cart</CButton>
                    }

                    { !user.username && <CButton
                      onClick={() => modalRef.current.changeStateModalLogin()}
                      style={{width:"100%", marginBottom:"0px"}}
                      className="btn btn-primary btn-sm">Add to cart</CButton>
                    }
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          }
        </CCol>
      </CRow>
    </div>
  )
}

export default Product
