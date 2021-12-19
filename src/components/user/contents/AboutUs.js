import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { aboutUs } from '../../../actions/user';
import {
  CRow,
  CCol,
} from '@coreui/react';

const AboutUs = () => {
  const dispatch = useDispatch();
  const [listText, setListText] = useState([]);
  const aboutUsResult = useSelector((state) => state.UserReducer.aboutUsResult);
  const aboutUsError = useSelector((state) => state.UserReducer.aboutUsError);
  const headers = {
    headers: {
      "Content-Type":"application/json",
    }
  }
  useEffect(() => {
    dispatch(aboutUs(headers))
  }, [dispatch]);

  useEffect(() => {
    if (aboutUsResult) {
      setListText(aboutUsResult.data)
    }
    if (aboutUsError) {
      setListText([])
    }
  }, [aboutUsResult, aboutUsError])

  return (
    <Fragment>
      {
        listText.length > 0 ? listText.map((text) => {
          return (
            <CRow className="mt-2" key={text.id}>
              <CCol md="8" className="offset-md-2">
                <h2 className="text-center">{text.name}</h2>
                <h4 className="lead text-center">{text.text}</h4>
              </CCol>
            </CRow>
          )
        }):""
      }
    </Fragment>
  )
}

export default AboutUs;
