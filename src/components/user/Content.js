import React, { Suspense } from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react'
import userRoutes from '../../routers/user';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


const Content = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {userRoutes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(Content);
