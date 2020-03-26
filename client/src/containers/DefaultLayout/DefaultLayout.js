import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import backgroundImage1 from "../../assets/img/background1.jpg"
import API from '../../API/api'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()



const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>


  signOut(e) {
    e.preventDefault()
    API.logout()
      .then(res => {
        localStorage.isLoggedIn = 0
        localStorage.adminLoggedIn = 0
        localStorage.user = ''
        localStorage.realtorLoggedIn = ''
        this.props.history.push('/login')
       
      })
      .catch(err => {
        if (err.response.status === 401) {
         // alert("Unauthorized user Please log back in!")
          toast("Invalid Username or password!", { autoClose: 3000 });

          this.props.history.push('/login');
         }  else{
          toast("Opps, can't connect to our servers!", { autoClose: 3000 });

         }  
  });
  }
  


  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main" style={{backgroundImage: `url(${backgroundImage1})`}}>
            <AppBreadcrumb appRoutes={routes} router={router}/>
        
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/404" />
                </Switch>
              </Suspense>
           
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
