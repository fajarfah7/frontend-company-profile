import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch }  from 'react-redux';
import { PORT_API, getProduct, createProduct, updateProduct } from '../../../actions/admin';
import { categories } from '../../../actions/user';
import { successAlert, errorAlert } from '../reusable';

import { CCol, CRow, CCard, CCardHeader, CCardBody, CFormGroup, CLabel, CInput, CTextarea, CInputFile, CForm, CSelect, CCardFooter, CButton, CSwitch } from '@coreui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';


const ProductForm = (props) => {
  const Swal2 = withReactContent(Swal);
  const uoms = [
    {id: 1, name: "Piece"},
    {id: 2, name: "Dozen"},
    {id: 3, name: "Score"},
  ];

  const id = useMemo(() => {
    return parseInt(props.match.params.id)
  }, [props.match.params.id]);

  const [listCategory, setListCategory] = useState([]);
  const [product, setProduct] = useState({
    id: 0,
    uom_id: "",
    name: "",
    description: "",
    dimension_description: "",
    stock: "",
    price: "",
    discount: "",
    is_have_expiry: false,
    expired_at: "",
    datepicker: new Date(),
    product_image: "",
    image_url: "",
    image_name: "",
    status: true,
    category_id:0,
  });

  const dispatch = useDispatch();
  const {
    getProductResult,
    getProductError,
    // createProductResult,
    // createProductError,
    // updateProductResult,
    // updateProductError,
  } = useSelector((state) => state.AdminReducer);

  const {
    categoriesResult,
    categoriesError,
  } = useSelector((state) => state.UserReducer);

  const ajwt = window.localStorage.getItem("ajwt");
  const headers = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ajwt}`
      }
    }
  }, [ajwt])

  useEffect(() => {
    // if action edit
    dispatch(categories())
    if (id > 0) {
      dispatch(getProduct({"id":id}, headers));
    }
  }, [
    dispatch,
    headers,
    id,
  ]);

  useEffect(() => {
    if (categoriesResult) {
      setListCategory(categoriesResult);
    }
    if (categoriesError) {
      setListCategory([])
    }
  }, [categoriesResult, categoriesError])

  // if action edit
  useEffect(() => {
    if (id > 0) {
      if (getProductResult) {
        if (getProductResult.data.is_have_expiry) {
          let expiredAt = getProductResult.data.expired_at;
          expiredAt = moment(expiredAt).format("YYYY-MM-DD");
          getProductResult.data.datepicker = new Date(expiredAt)
        }
        setProduct({
          ...product,
          ...getProductResult.data,
          image_url: `http://localhost:${PORT_API}/images/` + getProductResult.data.product_image,
          image_name: getProductResult.data.product_image
        });
      }
      if (getProductError) {
        if (getProductError.status === 401) {
          props.history.push({
            pathname: "/admin/login"
          });
        }
      }
      dispatch({
        type:"GET_PRODUCT",
        payload:{
          loading: false,
          data: false,
          error: false
        }
      });
    }
  }, [dispatch, props.history, getProductResult, getProductError, id, product]);

  // create product
  // useEffect(() => {
    // if (createProductResult) {
    //   Swal2.fire({
    //     icon: "success",
    //     title: "Success create data",
    //   }).then((ok) => {
    //     if(ok.isConfirmed) {
    //       props.history.push({
    //         pathname: "/admin/product"
    //       });
    //     }
    //   });
    // }
    // if (createProductError) {
    //   if (createProductError.status === 401) {
    //     props.history.push({
    //       pathname: "/admin/login"
    //     });
    //   }
    //   errorAlert(createProductError.messages)
    // }
    // dispatch({
    //   type:"CREATE_PRODUCT",
    //   payload:{
    //     loading: false,
    //     data: false,
    //     error: false
    //   }
    // });
  // }, [props.history, dispatch, createProductResult, createProductError, Swal2]);

  // update product
  // useEffect(() => {
  //   if (updateProductResult) {
  //     Swal2.fire({
  //       icon: "success",
  //       title: "Success update data",
  //     }).then((ok) => {
  //       if(ok.isConfirmed) {
  //         props.history.push({
  //           pathname: "/admin/product"
  //         });
  //       }
  //     });
  //   }
  //   if (updateProductError) {
  //     if (updateProductError.status === 401) {
  //       props.history.push({
  //         pathname: "/admin/login"
  //       });
  //     }
  //     errorAlert(updateProductError.messages)
  //   }
    // dispatch({
    //   type:"UPDATE_PRODUCT",
    //   payload:{
    //     loading: false,
    //     data: false,
    //     error: false
    //   }
    // });
  // }, [props.history, dispatch, updateProductResult, updateProductError, Swal2]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (product.is_have_expiry === true) {
      let expiredAt = moment(product.datepicker).format("YYYY-MM-DD");
      product.expired_at = expiredAt
    }

    let data = new FormData();
    Object.entries(product).forEach(([key, val]) => {
      data.append(key, val)
    });

    if (id > 0) {
      // dispatch(updateProduct(data, headers))
      updateProduct(data, headers).then((res) => {
        if (res.status === 200) {
          successAlert("Success save data").then((ok) => {
            if(ok.isConfirmed) {
              props.history.push({ pathname:"/admin/product" });
            }
          })
        } else {
          errorAlert(res.messages);
        }
      }).catch(() => {
        Swal2.fire({
          icon:"error",
          title:"Unknown error occured"
        })
      })
    } else {
      // dispatch(createProduct(data, headers))
      createProduct(data, headers).then((res) => {
        if (res.status === 200) {
          successAlert("Success create data").then((ok) => {
            if(ok.isConfirmed) {
              props.history.push({ pathname:"/admin/product" });
            }
          })
        } else {
          errorAlert(res.messages);
        }
      }).catch(() => {
        Swal2.fire({
          icon:"error",
          title:"Unknown error occured"
        })
      })
    }
  }

  const handleChange = (e) => {
    let type = e.target.type;
    let name = e.target.name;
    let value = e.target.value;
    let imageUrl = "";
    let imageName = "";

    if (type === "file") {
      value = e.target.files[0];
      imageUrl = URL.createObjectURL(value);
      imageName = value.name;
      // can not update product data if use setProduct
      // setProduct({
      //   ...product,
      //   image_url: imageUrl,
      //   image_name: imageName,
      // });
      product.image_url = imageUrl;
      product.image_name = imageName;
    } else if (type === "checkbox") {
      value = e.target.checked;
    }

    setProduct({
      ...product,
      [name]: value,
    });
  }

  return (
    <div>
      <CRow>
        <CCol md="12">
          <CForm onSubmit={handleSubmit}>
            <CCard>
              <CCardHeader>
                {product.id === 0 ? "Input":"Edit"} Product
                <div className="card-header-action">
                  <Link className="float-right" to="/admin/product">Back to product list</Link>
                </div>
              </CCardHeader>
              <CCardBody>

                <CRow>
                  <CCol md="6">

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Name</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CInput
                          id="name"
                          name="name"
                          placeholder="Product name"
                          value={product.name}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Category</CLabel>
                      </CCol>
                      <CCol>
                        <CSelect disabled={listCategory.length === 0 ? true:false} custom value={product.category_id} name="category_id" id="category-id" onChange={handleChange}>
                          <option value="">-Select Category-</option>
                          {
                            listCategory.map((category, key) => {
                              return (
                                <option
                                  key={key}
                                  value={category.id}
                                >{category.name}</option>
                              )
                            })
                          }
                        </CSelect>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>UoM</CLabel>
                      </CCol>
                      <CCol>
                        <CSelect custom value={product.uom_id} name="uom_id" id="uom-id" onChange={handleChange}>
                          <option value="">-Select UoM-</option>
                          {
                            uoms.map((uom, key) => {
                              return (
                                <option
                                  key={key}
                                  value={uom.id}
                                >{uom.name}</option>
                              )
                            })
                          }
                        </CSelect>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Stock</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CInput
                          type="number"
                          id="stock"
                          name="stock"
                          placeholder="stock"
                          value={product.stock}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Price</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CInput
                          type="number"
                          id="price"
                          name="price"
                          placeholder="Product price"
                          value={product.price}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Discount</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CInput
                          id="discount"
                          name="discount"
                          placeholder="Product discount"
                          value={product.discount}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Dimension description</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CInput
                          id="dimension-description"
                          name="dimension_description"
                          placeholder="Dimension description"
                          value={product.dimension_description}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Image</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CInputFile
                          custom
                          id="product-image"
                          name="product_image"
                          // value={product.product_image}
                          onChange={handleChange}
                        />
                        <CLabel htmlFor="product-image" variant="custom-file">
                          {
                            product.image_name === "" ? "Choose file":product.image_name
                          }
                        </CLabel>
                        {
                          product.image_url !== "" && (
                            <img
                            alt=""
                              src={product.image_url}
                              style={{
                                marginTop:"10px",
                                maxWidth:"70%",
                                maxHeight:"70%",
                              }}
                            />
                          )
                        }
                      </CCol>
                    </CFormGroup>

                  </CCol>

                  <CCol md="6">

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Have Expiry</CLabel>
                      </CCol>
                      <CCol>
                        <CSwitch
                          className="mr-1"
                          color="primary"
                          shape="pill"
                          id="is-have-expiry"
                          name="is_have_expiry"
                          checked={product.is_have_expiry}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    {product.is_have_expiry === true && (
                      <CFormGroup row >
                        <CCol md="4">
                          <CLabel>Expired at</CLabel>
                        </CCol>
                        <CCol md="8">
                          <DatePicker
                            className="form-control"
                            dateFormat="yyyy-MM-dd"
                            selected={product.datepicker}
                            id="datepicker"
                            name="datepicker"
                            onChange={(e) => {
                              setProduct({
                                ...product,
                                datepicker: e,
                              });
                            }}
                          />
                        </CCol>
                      </CFormGroup>
                    )}


                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Description</CLabel>
                      </CCol>
                      <CCol md="8">
                        <CTextarea
                          id="description"
                          name="description"
                          placeholder="Product Description"
                          rows="9"
                          value={product.description}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel>Status</CLabel>
                      </CCol>
                      <CCol>
                        <CSwitch
                          className="mr-1"
                          color="primary"
                          shape="pill"
                          id="status"
                          name="status"
                          checked={product.status}
                          onChange={handleChange}
                        />
                      </CCol>
                    </CFormGroup>

                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <CRow>
                  <CCol md="12">
                    <div className="card-footer-action">
                      <CButton type="submit" className="float-right" color="primary">Save</CButton>
                    </div>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CForm>
        </CCol>
      </CRow>
    </div>
  );
}

export default ProductForm;
