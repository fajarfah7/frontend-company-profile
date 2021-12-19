import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CToggler,
  CNavLink,
  CDropdown,
  CBadge
} from '@coreui/react';
import userRoutes from '../../routers/user';
import LoginModal from './reusable/LoginModal';
import {
  setUser,
  unsetUser,
  setCart,
  unsetCart,
  getCartProducts,
} from '../../actions/user';
import CIcon from '@coreui/icons-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef()

  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer.user);
  const cart = useSelector((state) => state.UserReducer.cart);
  const addToCartResult = useSelector((state) => state.UserReducer.addToCartResult);
  const getCartProductResult = useSelector((state) => state.UserReducer.getCartProductResult);
  const getCartProductError = useSelector((state) => state.UserReducer.getCartProductError);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    let ujwt = localStorage.getItem("ujwt")
    if (ujwt) {
      dispatch(setUser(ujwt));
    }
  }, [dispatch]);

  // set cart
  useEffect(() => {
    if (user.id) {
      let ujwt = localStorage.getItem("ujwt")
      let data = {"user_id": user.id}
      dispatch(setCart(ujwt, data))
    }
  }, [dispatch, user.id]);
  // if cart was set, then get cart product
  useEffect(() => {
    if (cart.id) {
      let ujwt = localStorage.getItem("ujwt")
      let data = {"cart_id":cart.id}
      dispatch(getCartProducts(ujwt, data));
    }
  }, [dispatch, cart.id])

  // if use add to cart, then will auto get cart product
  useEffect(() => {
    if (addToCartResult) {
      let ujwt = localStorage.getItem("ujwt")
      let data = {"cart_id":cart.id}
      dispatch(getCartProducts(ujwt, data))
    }
  }, [dispatch, addToCartResult, cart.id])
  // get cart product result
  useEffect(() => {
    if (getCartProductResult) {
      // reset list item
      setListItems([])
      // do loop to get list item
      getCartProductResult.cart_products.map((data, key) => {
        let item = {
          name: data.product.name,
          amount: data.amount,
        }
        return setListItems((prevState) => [...prevState, item])
      })
    }
    if (getCartProductError) {
      setListItems([])
    }

  }, [getCartProductResult, getCartProductError])

  const logout = () => {
    localStorage.removeItem("ujwt")
    dispatch(unsetUser())
    dispatch(unsetCart())
  }

  return (
    <>
      <LoginModal ref={modalRef} />
      <CNavbar expandable="sm" color="secondary" light={true} >
        <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
        <CNavbarBrand to="/">
          Gundam Shop
        </CNavbarBrand>
        <CCollapse show={isOpen} navbar>
          <CNavbarNav>
            {userRoutes.map((route, key) => {
                if(route.path !== "/" && route.header === true){
                  return (
                    <CNavLink key={key} to={route.path}>{route.name}</CNavLink>
                  )
                }
              })
            }
          </CNavbarNav>
          <CNavbarNav className="ml-auto">
          {/* <CNavLink>Cart</CNavLink> */}
            { user.username &&  <CDropdown inNav>
                <CDropdownToggle color="secondary">
                  Orders & Cart <CIcon name="cilCart" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">

                  <CDropdownItem
                    header
                    tag="div"
                    color="secondary"
                    className="text-center"
                  >
                    <strong>Orders</strong>
                  </CDropdownItem>
                  <CDropdownItem to="/orders">List Orders <CIcon name="cilList" style={{marginLeft:"auto"}} /></CDropdownItem>

                  <CDropdownItem
                    header
                    tag="div"
                    color="secondary"
                    className="text-center"
                  >
                    <strong>Cart</strong>
                  </CDropdownItem>
                  { listItems.length > 0 ?
                    listItems.map((item,key) => {
                      return (
                        <CDropdownItem key={key}>
                          {item.name} &nbsp;<CBadge color="success" style={{marginLeft:"auto"}}>{item.amount}</CBadge>
                        </CDropdownItem>
                      )
                    }):<CDropdownItem>There is no item</CDropdownItem>
                  }

                  {
                    listItems.length > 0 ?
                    (<Fragment>
                      <CDropdownItem divider></CDropdownItem>
                      <CDropdownItem to="/cart">Manage Items
                        <CIcon name="cilArrowThickFromLeft" style={{marginLeft: "auto"}} />
                      </CDropdownItem>
                    </Fragment>):""
                  }


                </CDropdownMenu>
              </CDropdown>
            }

            { !user.username && <CNavLink role="button" onClick={() => modalRef.current.changeStateModalLogin()}>Login</CNavLink> }
            { !user.username && <CNavLink to="/register">Signin</CNavLink> }
            { user.username &&
              <CDropdown inNav>
                <CDropdownToggle color="primary">
                  {user.name}
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem
                    header
                    tag="div"
                    color="secondary"
                    className="text-center"
                  >
                    <strong>Account</strong>
                  </CDropdownItem>
                  <CDropdownItem to="/profile"><CIcon name="cilUser" className="mf2" />&nbsp;Profile</CDropdownItem>
                  <CDropdownItem><CIcon name="cilSettings" className="mf2" />&nbsp;Settings</CDropdownItem>
                  <CDropdownItem onClick={() => {
                    logout()
                  }}><CIcon name="cilAccountLogout" className="mf2" />&nbsp;Logout</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
          </CNavbarNav>
        </CCollapse>
      </CNavbar>
    </>
  )
}

export default Header;
