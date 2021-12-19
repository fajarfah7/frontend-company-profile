import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCol,
  CRow,
  CJumbotron,
  CLink
} from '@coreui/react'
import { threeNewestProducts } from '../../../actions/user';

const slides = [
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1607923e7e2%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1607923e7e2%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9296875%22%20y%3D%22217.75625%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
]


const Home = () => {

  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const {
    threeNewestProductsLoading,
    threeNewestProductsResult,
    threeNewestProductsError,
  } = useSelector((state) => state.UserReducer)

  useEffect(() => {
    let headers = {headers: { "Content-Type":"application/json" }}
    dispatch(threeNewestProducts(headers))
  }, [dispatch]);

  useEffect(() => {
    if (threeNewestProductsResult) {
      setProducts(threeNewestProductsResult);
    }
    if (threeNewestProductsError) {
      setProducts([]);
    }
  }, [threeNewestProductsResult, threeNewestProductsError])

  return (
    <div>
      <CRow>
        <CCol xs="12" xl="12">
          <CCarousel animate autoSlide={3000}>
            <CCarouselIndicators/>
            <CCarouselInner>
              <CCarouselItem>
                <img className="d-block" width="100%" src={slides[0]} alt="slide 1"/>
                <CCarouselCaption><h3>Slide 1</h3><p>Slide 1</p></CCarouselCaption>
              </CCarouselItem>
              <CCarouselItem>
                <img className="d-block" width="100%" src={slides[1]} alt="slide 2"/>
                <CCarouselCaption><h3>Slide 2</h3><p>Slide 2</p></CCarouselCaption>
              </CCarouselItem>
              <CCarouselItem>
                <img className="d-block" width="100%" src={slides[2]} alt="slide 3"/>
                <CCarouselCaption><h3>Slide 3</h3><p>Slide 3</p></CCarouselCaption>
              </CCarouselItem>
            </CCarouselInner>
            <CCarouselControl direction="prev"/>
            <CCarouselControl direction="next"/>
          </CCarousel>
        </CCol>
      </CRow>
      { products.length > 0 ? <h3 className="text-center" style={{marginTop:"40px"}}>Our Newest Products</h3>:""}
      <CRow style={{marginTop: '20px'}}>
        {
          products.length > 0 ? products.map((product) => {
            return (
              <CCol md="4" key={product.id}>
                <CJumbotron className="border">
                  <img src={`http://localhost:4000/images/${product.product_image}`} style={{width:"100%", height:"400px", marginTop:"-10px"}} />
                  <h2 className="mt-2">{product.name}</h2>
                  {product.category !== null ? <h5 className="mt-1">{product.category.name}</h5>:""}
                  <p className="lead">{product.description.name}</p>
                  <hr className="my-2" />
                  <p>{product.description}</p>
                  <p className="lead">
                    <CLink role="button" to={"/product/" + product.id} className="btn btn-primary btn-sm btn">Shop Now</CLink>
                  </p>
                </CJumbotron>
              </CCol>
            )
          }):""
        }
      </CRow>
      <h3 className="text-center" style={{marginTop:"40px"}}>Hardcoded Text</h3>
      <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  )
}

export default Home;
