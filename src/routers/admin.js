import React from 'react';

const Dashboard = React.lazy(() => import('../components/admin/contents/Dashboard'));
const AboutUs = React.lazy(() => import('../components/admin/contents/AboutUs'));
const ProductList = React.lazy(() => import('../components/admin/contents/ProductList'))
const ProductForm = React.lazy(() => import('../components/admin/contents/ProductForm'))
const Category = React.lazy(() => import('../components/admin/contents/Category'))

const admin = [
  { path: '/admin', exact: true, name: 'Dashboard', component: Dashboard},
  { path: '/admin/about-us', name: 'About Us', component: AboutUs},
  { path: '/admin/product', exact: true, name: 'List Product', component: ProductList},
  { path: '/admin/product/input', name: 'Input Product', component: ProductForm, action:"input"},
  { path: '/admin/product/edit/:id', name: 'Edit Product', component: ProductForm, action:"edit"},
  { path: '/admin/category', name: 'Category', component: Category},
];

export default admin;
