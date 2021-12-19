import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { adminLogin, adminInit } from '../../actions/admin';
import { errorAlert } from './reusable';

const Login = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Swal2 = withReactContent(Swal);

  const {
    // adminLoginResult,
    // adminLoginError,
    adminInitResult,
  } = useSelector((state) => state.AdminReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: username,
      password: password,
    }
    let headers = {
      headers : {
        "Content-Type" : "application/json",
      }
    }

    adminLogin(data, headers).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("ajwt", res.token);
        props.history.push({
          pathname: "/admin",
        });
      } else {
        errorAlert(res.messages)
      }
    }).catch(() => {
      Swal2.fire({
        icon:"error",
        title:"Unknown error occured",
      });
    });
  }

  // componentDidMount
  // check if the token is still valid or not
  useEffect(() => {
    let ajwt = localStorage.getItem("ajwt");
    if (ajwt !== null) {
      let headers = {
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${ajwt}`
        }
      }
      dispatch(adminInit(headers));
    }
  },[dispatch])

  // componentDidUpdate
  // do some validation
  useEffect(() => {
    // if the token is still valid then redirect to admin page
    if (adminInitResult.id) {
      props.history.push({
        pathname: "/admin",
      })
    }

    // // if login successed then set the token and redirect to admin
    // if (adminLoginResult) {
    //   localStorage.setItem("ajwt", adminLoginResult.token);
    //   props.history.push({
    //     pathname: "/admin",
    //   });
    // }
    // // if login failed then set notification/alert
    // if (adminLoginError) {
    //   let htmlMessages = "<ul>";
    //   adminLoginError.messages.forEach(errorMessage => {
    //     htmlMessages += `<li style="text-align:left; color:red;">${errorMessage}</li>`;
    //   });
    //   htmlMessages += "<ul/>";

    //   Swal2.fire({
    //     icon:"error",
    //     title: "Error",
    //     html: htmlMessages,
    //     showCloseButton: true,
    //   });
    // }

    // dispatch({type:"ADMIN_LOGIN", payload:{
    //   loading: false,
    //   data: false,
    //   error: false,
    // }});

  }, [
    adminInitResult,
    props.history,
    // adminLoginResult,
    // adminLoginError,
    // Swal2,
  ]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>

                    {/* username */}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>

                    {/* password */}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    {/* button */}
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>

                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
