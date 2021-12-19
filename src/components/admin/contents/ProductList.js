import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector }  from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getProducts, deleteProduct } from '../../../actions/admin';

import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CLink,
  CPagination,
} from '@coreui/react';

import { Swal2, successAlert, errorAlert } from '../reusable';

const ProductList = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;

  const {
    getProductsResult,
    getProductsError,
    deleteProductResult,
    deleteProductError,
  } = useSelector((state) => state.AdminReducer);

  const ajwt = window.localStorage.getItem("ajwt");
  const headers = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ajwt}`,
      }
    }
  }, [ajwt])

  // init the page, to get list of data(products)
  useEffect(() => {
    let data = { page:currentPage, limit:limit };
    dispatch(getProducts(data, headers));
  }, [dispatch, currentPage, headers]);

  // get product result and error
  useEffect(() => {
    if (getProductsResult) {
      setProducts(getProductsResult.data)
    }
    if (getProductsError) {
      if (getProductsError.status === 401) {
        props.history.push({
          pathname: "/admin/login"
        });
      } else {
        Swal2.fire({
          icon: "error",
          title: "Unkonwn error occured !",
        });
      }
    }
  }, [props.history, getProductsResult, getProductsError]);

  // delete product result and error
  useEffect(() => {
    if (deleteProductResult) {
      let data = { page:currentPage, limit:limit };
      dispatch(getProducts(data, headers));
      // alert must on last, because it "return" Swal2
      successAlert("Success delete data");
    }
    if (deleteProductError) {
      if (deleteProductError.status === 401) {
        props.history.push({
          pathname: "/admin/login"
        });
      } else {
        let messages = deleteProductError.messages;
        errorAlert(messages);
      }
    }
  }, [dispatch, deleteProductResult, deleteProductError, currentPage, headers, props.history]);

  const alertDeleteProduct = (e) => {
    let productId = e.target.getAttribute("product-id");
    let productName = e.target.getAttribute("product-name");
    return Swal2.fire({
      icon: "warning",
      title: `Are you sure delete "${productName}" ?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((res) => {
      if(res.isConfirmed) {
        let data = { "id": productId };
        dispatch(deleteProduct(data, headers))
      }
    });
  }

  return (
    <div>
      <CRow>
        <CCol md="12">
          <CCard>
            <CCardHeader>
              List Product
              <div className="card-header-action">
                <Link to="/admin/product/input" className="float-right">Input product</Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <div className="position-relative table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? products.map((product) => {
                      let url = "/admin/product/edit/" + product.id;
                      return (
                        <tr>
                          <td>{product.name}</td>
                          <td>{product.stock}</td>
                          <td>{product.status === true ? "Active":"Inactive"}</td>
                          <td>
                            <CLink className="btn btn-success btn-sm" to={url}>Edit</CLink>&nbsp;
                            <CButton color="danger" size="sm" product-id={product.id} product-name={product.name} onClick={(e) => alertDeleteProduct(e)}>Delete</CButton>
                          </td>
                        </tr>
                      )
                      }):<tr>
                          <td colSpan={3}>There is no data</td>
                        </tr>
                    }
                  </tbody>
                </table>
              </div>
              <CPagination
                className="mt-4"
                align="center"
                addListClass="some-class"
                activePage={currentPage}
                pages={getProductsResult.total_page}
                onActivePageChange={(e) => {
                  setCurrentPage(e)
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </div>
  )
}

export default ProductList;
