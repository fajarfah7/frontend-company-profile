import React from 'react';

const Home = React.lazy(() => import('../components/user/contents/Home'));
const Products = React.lazy(() => import('../components/user/contents/Products'));
const Product = React.lazy(() => import('../components/user/contents/Product'));
const Orders = React.lazy(() => import('../components/user/contents/Orders'));
const Cart = React.lazy(() => import('../components/user/contents/Cart'));
const AboutUs = React.lazy(() => import('../components/user/contents/AboutUs'));
const ContactUs = React.lazy(() => import('../components/user/contents/ContactUs'));
const Profile = React.lazy(() => import('../components/user/contents/Profile'))

const user = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/home', name: 'Home', component: Home, 'header':true},
  { path: '/products', name: 'Products', component: Products, 'header':true},
  { path: '/product/:id', name: 'Product', component: Product, 'header':false},
  { path: '/orders', name: 'Orders', component: Orders, 'header':false},
  { path: '/cart', name: 'Cart', component: Cart, 'header':false},
  { path: '/about-us', name: 'About Us', component: AboutUs, 'header':true},
  { path: '/contact-us', name: 'Contact Us', component: ContactUs, 'header':true},
  { path: '/profile', name: 'Profile', component: Profile, 'header':false},
];

export default user;
