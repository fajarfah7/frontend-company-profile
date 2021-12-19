import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CInput,
  CButton,
} from '@coreui/react'

import { createCategory, updateCategory, deleteCategory } from '../../../actions/admin'
import { categories } from '../../../actions/user'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Category = () => {
  const dispatch = useDispatch();
  const Swal2 = withReactContent(Swal)
  const [listCategory, setListCategory] = useState([]);
  const tableFields = ['name','action'];

  const [categoryID, setCategoryID] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  const ajwt = localStorage.getItem("ajwt");
  const headers = useMemo(() => {
    return {
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${ajwt}`,
      }
    }
  }, [ajwt])

  const categoriesLoading = useSelector((state) => state.UserReducer.categoriesLoading);
  const categoriesResult = useSelector((state) => state.UserReducer.categoriesResult);
  const categoriesError = useSelector((state) => state.UserReducer.categoriesError);

  const createCategoryResult = useSelector((state) => state.AdminReducer.createCategoryResult);
  const createCategoryError = useSelector((state) => state.AdminReducer.createCategoryError);

  const updateCategoryResult = useSelector((state) => state.AdminReducer.updateCategoryResult);
  const updateCategoryError = useSelector((state) => state.AdminReducer.updateCategoryError);

  const deleteCategoryResult = useSelector((state) => state.AdminReducer.deleteCategoryResult);
  const deleteCategoryError = useSelector((state) => state.AdminReducer.deleteCategoryError);

  useEffect(() => {
    dispatch(categories(headers));
  }, [dispatch, headers]);

  useEffect(() => {
    if (categoriesResult) {
      console.log("categoriesResult",categoriesResult)
      setListCategory(categoriesResult)
    }
    if (categoriesError) {
      console.log("categoriesError",categoriesError)
      setListCategory([])
    }
  }, [categoriesResult, categoriesError]);

  useEffect(() => {
    if (createCategoryResult || updateCategoryResult || deleteCategoryResult) {
      dispatch(categories(headers));
      setCategoryID(0)
      setCategoryName("")
      let act = ""
      if (createCategoryResult) {
        act = "create";
      }
      if (updateCategoryResult) {
        act = "update"
      }
      if (deleteCategoryResult) {
        act = "delete"
      }
      Swal2.fire({
        icon:"success",
        title:`Success ${act}`
      })
    }

    if (createCategoryError || updateCategoryError || deleteCategoryError) {
      let act = ""
      if (createCategoryError) {
        act = "create";
      }
      if (updateCategoryError) {
        act = "update"
      }
      if (deleteCategoryError) {
        act = "delete"
      }
      Swal2.fire({
        icon:"error",
        title:`Failed ${act} category`
      });
    }
  }, [
    dispatch,
    createCategoryResult,
    createCategoryError,
    updateCategoryResult,
    updateCategoryError,
    deleteCategoryResult,
    deleteCategoryError,
    Swal2,
    headers,
  ]);

  const saveCategory = () => {
    if (categoryID === 0) {
      let data = {
        "name": categoryName,
      }
      dispatch(createCategory(data, headers))
    } else {
      let data = {
        "id": categoryID,
        "name": categoryName,
      }
      dispatch(updateCategory(data, headers))
    }
  }

  const doDeleteCategory = (ID, name) => {
    Swal2.fire({
      icon:"warning",
      title: `Are you sure delete category ${name} ?`,
      showCancelButton: true,
    }).then((conf) => {
      if (conf.isConfirmed) {
        let data = { id:ID }
        dispatch(deleteCategory(data, headers))
      }
    })
  }

  return (
    <CRow>
      <CCol xs="12" lg="6">
        <CCard>
          <CCardHeader>
            Simple Table
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md="6">
                <CFormGroup>
                  <CInput
                    placeholder="Category Name"
                    type="text"
                    value={categoryName}
                    onChange={
                      (e) => setCategoryName(e.target.value)
                    }
                    />
                </CFormGroup>
              </CCol>
              <CCol md="6" className="mb-3">
                <div className="float-right">
                  <CButton color="primary" onClick={
                    () => saveCategory()
                  }>{categoryID === 0 ? "Create":"Update"}</CButton>
                  <CButton
                    color="secondary"
                    className="ml-1"
                    onClick={
                      () =>{
                        setCategoryID(0)
                        setCategoryName("")
                      }
                    }
                    >cancel</CButton>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="12">
                <CDataTable
                  loading={categoriesLoading}
                  items={listCategory}
                  fields={tableFields}
                  itemsPerPage={5}
                  pagination
                  scopedSlots = {{
                    'action':
                      (item)=>{
                        return (
                          <td>
                            <CButton color="info" onClick={() => {
                              setCategoryID(item.id)
                              setCategoryName(item.name)
                            }}>Edit</CButton> &nbsp;
                            <CButton color="danger" onClick={
                              () => doDeleteCategory(item.id, item.name)
                            }>Delete</CButton>
                          </td>
                        )
                      }
                  }}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Category;
