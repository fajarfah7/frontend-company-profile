import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PORT_API } from '../../../actions/user';
import {
  CButton,
  CRow,
  CCol,
  CWidgetBrand,
  CSelect,
  CInput,
} from '@coreui/react'
import { productPaginationData, categories } from '../../../actions/user';
import { Link } from 'react-router-dom';
import '../style/product.css';

const Products = () => {
  // config for data transaction
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [listProduct, setListProduct] = useState([])
  const [listCategory, setListCategory] = useState([]);

  // const ppdr = useSelector((state) => state.UserReducer.productPaginationDataResult);
  const categoriesResult = useSelector((state) => state.UserReducer.categoriesResult);
  const categoriesError = useSelector((state) => state.UserReducer.categoriesError);

  const [categoryID, setCategoryID] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [nextPage, setNextPage] = useState(1);

  const config = useMemo(() => {
    return {
      headers: {
        "Content-Type":"application/json",
      }
    }
  }, []);

  // const [firstInit, setFirstInit] = useState(true);
  const limit = useMemo(() => {
    return 6
  }, []);


  // if there is change on categoryID and searchKey will load product
  useEffect(() => {
    if (listProduct.length === 0) {
      loadMore()
    }

    if (categoriesResult === false && categoriesError === false) {
      dispatch(categories(config));
    }
  }, [
    dispatch,
    config,
    limit,
    categoryID,
    searchKey,
    categoriesResult,
    categoriesError,
  ]);

  // categoriesResult change
  useEffect(() => {
    if (categoriesResult !== false) {
      setListCategory(categoriesResult);
    }
    if (categoriesError !== false) {
      setListCategory([])
    }
  }, [categoriesResult]);

  const loadMore = () => {
    setIsLoading(true)
    let data = {
      "category_id":categoryID,
      "key":searchKey,
      "page":nextPage,
      "limit":limit,
    }
    productPaginationData(config, data).then((res) => {
      if (res.count > 0) {
        setListProduct([...listProduct, res.data]);
        setNextPage(res.nextPage);
      } else {
        setListProduct([])
        setNextPage(0)
      }
      setIsLoading(false);
    });
  }
  return (
    <div>
      <CRow>
        <CCol md="8" className="offset-md-2">
          <CRow>
            <CCol md="4">
              <CSelect
                custom
                disabled={listCategory.length > 0 ? false:true}
                onChange={(e) => {
                  setListProduct([])
                  setNextPage(1)
                  setIsLoading(true)
                  setCategoryID(parseInt(e.target.value))
                }}
              >
                <option value={0} defaultValue>All</option>
                {listCategory.length > 0 && listCategory.map((category) => {
                  return (<option key={category.id} value={category.id}>{category.name}</option>)
                })}
              </CSelect>
            </CCol>
            <CCol md="8">
              <CInput
                type="text"
                placeholder="Search"
                onChange={
                  (e) => {
                    setListProduct([])
                    setNextPage(1)
                    setIsLoading(true)
                    setSearchKey(e.target.value)
                  }
                }
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      {
        isLoading === true ? <h1>Loading...</h1>:(listProduct.length > 0) ? listProduct.map((row, key) => {
            if(row) {
              return ( <CRow style={{marginTop: '20px'}} key={key}>
                {row.map((product) => {
                  return (
                    <CCol md="2" key={product.id}>
                      <Link to={'/product/' + product.id} style={{color:"#000000de",textDecoration:"none"}}>
                        <CWidgetBrand
                          bodySlot={
                            <div className="product-text-wrapper">
                              <h5>{product.name}</h5>
                            {product.category !== null ? <label>{product.category.name}</label>:""}
                              <h5 className="product-price">$ {product.price}</h5>
                            </div>
                          }
                        >
                        <img className="product-image" src={`http://localhost:${PORT_API}/images/` + product.product_image} />
                        </CWidgetBrand>
                      </Link>
                    </CCol>
                  )
                })}
              </CRow>)
            }
        }):<h1>Sorry there is no data</h1>
      }
      <CRow>
        <CCol md="12">
          {(nextPage > 0 && isLoading === false) &&
            <CButton
              style={{width:"100%", marginBottom:"20px"}}
              onClick={loadMore}
              className="btn btn-primary btn-sm"
            >Load More</CButton>}
        </CCol>
      </CRow>
    </div>
  )
}

export default Products;
