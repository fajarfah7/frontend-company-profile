import React, { useState } from 'react';
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CFormGroup,
  CLabel,
  CButton,
  CCollapse,
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

const ContactUs = () => {
  const [accordion, setAccordion] = useState(1)
  return (
    <CRow>
      <CCol md="6">
        <CCard>
          <CCardBody>
            <CFormGroup>
              <CIcon name="cilEnvelopeClosed" />
              <CLabel className="ml-2">fajar.fah7@gmail.com</CLabel>
            </CFormGroup>
            <CFormGroup>
              <CIcon name="cilPhone" />
              <CLabel className="ml-2">+62812-2943-9753 (Whats App and Telegram)</CLabel>
            </CFormGroup>
            <CFormGroup>
              <CIcon name="cilLocationPin" />
              <CLabel className="ml-2">Blimbing Village, Mandiraja(53473), District Banjarnegara, Central of Java, Indonesia</CLabel>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="6">
        <CCard>
          <CCardHeader>
            Frequently Asked Question
          </CCardHeader>
          <CCardBody>

            <CCard className="mb-0">
              <CCardHeader id="headingOne">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => setAccordion(accordion === 0 ? null : 0)}
                >
                  <h5 className="m-0 p-0">About Me</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={accordion === 0}>
                <CCardBody>
                  My name is Fajar Fahrurozi, i graduated from Universitas Muhammadiyah Surakarta in 2018.
                  In 2019 i worked as Laravel developer on Yogyakarta, in this company i worked their ERP product, but unfortunately in February 2020 the company stopped operating, that was caused by financial issue.
                  Then in March 2020 i started working remotely on singapore company as Laravel developer, on here i learn many things, and the most benefical knowledge is write efficient code, and finally in August 2021 i decided to resign.
                </CCardBody>
              </CCollapse>
            </CCard>

            <CCard className="mb-0">
              <CCardHeader id="headingTwo">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => setAccordion(accordion === 1 ? null : 1)}
                >
                  <h5 className="m-0 p-0">FAQ 1</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={accordion === 1}>
                <CCardBody>
                  1. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                  cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                  on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven''t heard of them accusamus labore sustainable VHS.
                </CCardBody>
              </CCollapse>
            </CCard>

            <CCard className="mb-0">
              <CCardHeader id="headingThree">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => setAccordion(accordion === 2 ? null : 2)}
                >
                  <h5 className="m-0 p-0">FAQ 2</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={accordion === 2}>
                <CCardBody>
                  2. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                  cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                  on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                </CCardBody>
              </CCollapse>
            </CCard>

            <CCard className="mb-0">
              <CCardHeader id="headingThree">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => setAccordion(accordion === 3 ? null : 3)}
                >
                  <h5 className="m-0 p-0">FAQ 3</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={accordion === 3}>
                <CCardBody>
                  3. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                  cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                  on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                </CCardBody>
              </CCollapse>
            </CCard>

            <CCard className="mb-0">
              <CCardHeader id="headingThree">
                <CButton
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => setAccordion(accordion === 4 ? null : 4)}
                >
                  <h5 className="m-0 p-0">FAQ 4</h5>
                </CButton>
              </CCardHeader>
              <CCollapse show={accordion === 4}>
                <CCardBody>
                  4. Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non
                  cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
                  on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
                  nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                  beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                </CCardBody>
              </CCollapse>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ContactUs;
