import React, { Suspense } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { CContainer, CFade } from '@coreui/react'
import adminRoutes from '../../routers/admin';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Content = (props) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {adminRoutes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={componentProps => (
                    <CFade>
                      <route.component
                        action={componentProps.action}
                        {...componentProps}
                        ajwt={props.ajwt}
                      />
                    </CFade>
                  )} />
              )
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(Content);
