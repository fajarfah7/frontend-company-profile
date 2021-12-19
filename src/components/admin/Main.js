import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import { adminInit, setAdminData, logout } from '../../actions/admin';

const TheLayout = (props) => {
  const dispatch = useDispatch();
  const {
    adminInitResult,
    adminInitError,
    adminData,
  } = useSelector((state) => state.AdminReducer);

  // componentDidMount
  // check if the jwt is exist, and do initation to get admin data
  useEffect(() => {
    let ajwt = localStorage.getItem("ajwt");
    if (ajwt !== null) {
      let config = {
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${ajwt}`
        }
      }
      dispatch(adminInit(config));
    } else {
      props.history.push({ pathname:"/admin/login" });
    }
  }, [
    dispatch,
    props.history
  ]);

  // componentDidUpdate
  // after do init, if the init successed then set admin data
  useEffect(() => {
    let ajwt = localStorage.getItem("ajwt");
    if (ajwt !== null) {
      if(adminInitResult) {
        dispatch(setAdminData({
          id: adminInitResult.id,
          name: adminInitResult.name,
          ajwt: ajwt,
        }));
      }

      if(adminInitError) {
        dispatch(logout())
        props.history.push({ pathname: "/admin/login" });
      }
    }
  },[
    dispatch,
    props.history,
    adminInitResult,
    adminInitError,
  ]);

  useEffect(() => {
    let ajwt = localStorage.getItem("ajwt");
    if (adminData.id === false && ajwt === null) {
      dispatch(logout());
      props.history.push({ pathname: "/admin/login" });
    }
  }, [adminData])

  return (
    <div className="c-app c-default-layout">
      <Sidebar/>
      <div className="c-wrapper">
        <Header/>
        <div className="c-body">
            <Content />
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default TheLayout
