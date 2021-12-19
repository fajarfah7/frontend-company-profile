import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CRow,
  CForm,
  CFormGroup,
  CTextarea,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { getAboutUs, createOrUpdateAboutUs } from '../../../actions/admin';
import { successAlert, errorAlert } from '../reusable';

const AboutUs = (props) => {
  const [collapse, setCollapse] = useState({
    history:      false,
    goal:         false,
    achievement:  false,
  });

  const [historyField, setHistoryField]         = useState("");
  const [goalField, setGoalField]               = useState("");
  const [achievementField, setAchievementField] = useState("");

  const dispatch = useDispatch();
  const ajwt = window.localStorage.getItem("ajwt");
  // const headerConfig = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${ajwt}`,
  //   },
  //   // timeout: 1000,
  // }

  const headers = useMemo(() => {
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ajwt}`,
      },
      // timeout: 1000,
    }
  }, [ajwt])

  const {
    getAboutUsResult,
    getAboutUsError,
    // createOrUpdateAboutUsResult,
    // createOrUpdateAboutUsError,
    adminData
  } = useSelector((state) => state.AdminReducer);

  // step 1) when page is ready will pull the data
  useEffect(()=>{
    if (getAboutUsResult === false) {
      dispatch(getAboutUs(headers));
    }
  }, [dispatch, adminData, getAboutUsResult, headers]);

  // step 2) after get data check the data and check errors
  useEffect(() => {
    if (getAboutUsResult) {
      putData(getAboutUsResult);
    }

    if (getAboutUsError) {
      let messages = getAboutUsError.messages;
      errorAlert(messages);
    }
  }, [getAboutUsResult,getAboutUsError]);

  // // admin action after create/update data
  // useEffect(() => {
  //   // if action success will re-pull the data
  //   if(createOrUpdateAboutUsResult) {
  //     dispatch(getAboutUs(headers));
  //     successAlert("Success save data")
  //   }

  //   // if there is an error
  //   if (createOrUpdateAboutUsError) {
  //     if (createOrUpdateAboutUsError.status === 401) {
  //       props.history.push({
  //         pathname: "/admin/login"
  //       })
  //     } else {
  //       let messages = createOrUpdateAboutUsError.messages;
  //       errorAlert(messages);
  //     }
  //   }
  // }, [
  //   createOrUpdateAboutUsResult,
  //   createOrUpdateAboutUsError
  // ]);

  const putData = (data) => {
    data.map((val, key) => {
      if (val.type === "about_us_history") {
        return setHistoryField(val.text)
      } else if (val.type === "about_us_goal") {
        return setGoalField(val.text)
      } else {
        return setAchievementField(val.text)
      }
    });
  }

  const toggle = (e) => {
    e.preventDefault();
    let name = e.target.name;
    setCollapse({
      ...collapse,
      [name]: !collapse[name]
    });
  }

  // submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData  = new FormData(e.target);
    const payload   = Object.fromEntries(formData.entries())

    if (payload.form_type !== undefined) {
      let aboutUsName = ""
      let aboutUsText = ""

      if (payload.form_type === "about_us_history") {
        aboutUsName = "History";
        aboutUsText = historyField;
      } else if (payload.form_type === "about_us_goal") {
        aboutUsName = "Goal";
        aboutUsText = goalField;
      } else {
        aboutUsName = "Achievement";
        aboutUsText = achievementField;
      }

      let data   = {
        name: aboutUsName,
        type: payload.form_type,
        text: aboutUsText,
      }
      const ajwt = window.localStorage.getItem("ajwt");
      const headers = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ajwt}`,
        },
        timeout: 1000,
      }
      // dispatch(createOrUpdateAboutUs(data, headers))
      createOrUpdateAboutUs(data, headers).then((res) => {
        if (res.status === 200) {
          dispatch(getAboutUs(headers));
          successAlert("Success save data")
        } else {
          errorAlert(res.messages);
        }
      }).catch((err) => {
        errorAlert([{"frontend":"Unknown error occured"}]);
      });

    }
  }

  return (
    <div>
    <CRow>
      <CCol xl="6">
        <CCard>
          <CCardHeader>
            History Text
            <div className="card-header-actions">
              <CButton
                size="sm"
                color={collapse.history === false ? "secondary":"info"}
                name="history"
                onClick={toggle}
                className="float-right"
              ><CIcon style={{pointerEvents:"none"}} name={collapse.history === false ? "cilExpandDown":"cilExpandUp"} /></CButton>
            </div>
          </CCardHeader>
          <CCollapse show={collapse.history}>
            <CCardBody>
              <CForm method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit}>
                <input type="hidden" name="form_type" value="about_us_history" />
                <CFormGroup row>
                  <CCol md="12">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                      value={historyField}
                      onChange={(e) => setHistoryField(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CButton
                      type="submit"
                      size="sm"
                      color="primary"
                      className="float-right"><CIcon name="cil-scrubber" /> Submit</CButton>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>

      <CCol xl="6">
        <CCard>
          <CCardHeader>
            Goal
            <div className="card-header-actions">
              <CButton
                size="sm"
                color={collapse.goal === false ? "secondary":"info"}
                name="goal"
                onClick={toggle}
                className="float-right"
              ><CIcon style={{pointerEvents:"none"}}  name={collapse.goal === false ? "cilExpandDown":"cilExpandUp"} /></CButton>
            </div>
          </CCardHeader>
          <CCollapse show={collapse.goal}>
            <CCardBody>
              <CForm method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit}>
                <input type="hidden" name="form_type" value="about_us_goal" />
                <CFormGroup row>
                  <CCol md="12">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                      value={goalField}
                      onChange={(e) => setGoalField(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CButton
                      type="submit"
                      size="sm"
                      color="primary"
                      className="float-right"><CIcon name="cil-scrubber" /> Submit</CButton>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol xl="6">
        <CCard>
          <CCardHeader>
            Achievement
            <div className="card-header-actions">
              <CButton
                size="sm"
                color={collapse.achievement === false ? "secondary":"info"}
                name="achievement"
                onClick={toggle}
                className="float-right"
              ><CIcon style={{pointerEvents:"none"}}  name={collapse.achievement === false ? "cilExpandDown":"cilExpandUp"} /></CButton>
            </div>
          </CCardHeader>
          <CCollapse show={collapse.achievement}>
            <CCardBody>
              <CForm method="post" encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit}>
                <input type="hidden" name="form_type" value="about_us_achievement" />
                <CFormGroup row>
                  <CCol md="12">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                      value={achievementField}
                      onChange={(e) => setAchievementField(e.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CButton
                      type="submit"
                      size="sm"
                      color="primary"
                      className="float-right"><CIcon name="cil-scrubber" /> Submit</CButton>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCollapse>
        </CCard>
      </CCol>
    </CRow>
    </div>
  )
}

export default AboutUs;
