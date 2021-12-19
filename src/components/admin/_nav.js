import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/admin',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Product',
    to: '/admin/product',
    icon: <CIcon name="cil-3d" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Category',
    to: '/admin/category',
    icon: <CIcon name="cil-list-rich" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'About Us',
    to: '/admin/about-us',
    icon: <CIcon name="cil-people" customClasses="c-sidebar-nav-icon"/>,
  },
]

export default _nav
