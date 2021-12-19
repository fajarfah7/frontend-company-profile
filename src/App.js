import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const AdminLoginPage = React.lazy(() => import('./components/admin/Login'));
const MainAdmin = React.lazy(() => import('./components/admin/Main'));

const MainUser = React.lazy(() => import('./components/user/Main'));
const UserRegister = React.lazy(() => import ('./components/user/Register'));

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              path="/admin/login"
              name="Admin Login"
              render={props =>
                <AdminLoginPage
                  {...props}
                />
              }
            />
            <Route
              path="/admin"
              name="Dashboard"
              render={props =>
                <MainAdmin {...props} />
              }
            />
            <Route
              path="/register"
              name="Register"
              render={props =>
                <UserRegister
                  {...props}
                />
              }
            />
            <Route
              path="/"
              name="Home"
              render={props =>
                <MainUser {...props}/>
              }
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
