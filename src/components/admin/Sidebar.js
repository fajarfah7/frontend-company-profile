import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CLabel,
} from '@coreui/react'

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav'

const Sidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.AdminTemplate.sidebarShow)

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/admin" style={{textDecoration:"none"}}>

        <CLabel className="c-sidebar-brand-full">Gundam Shop</CLabel>
        <CLabel className="c-sidebar-brand-minimized">GS</CLabel>
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(Sidebar)
