import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Properties = React.lazy(() => import('./views/PropertyPage/Properties'));
const Property = React.lazy(() => import('./views/PropertyPage/Property'));
const PropertyManagement = React.lazy(() => import('./views/PropertyManagement/Properties'));
const PropertyManagementDetails = React.lazy(() => import('./views/PropertyManagement/Property'));
const CreatePropert = React.lazy(() => import('./views/PropertyManagement/CreateProperty'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/properties', exact: true,  name: 'Properties', component: Properties },
  { path: '/properties/:id', exact: true, name: 'Property Details', component: Property },
  { path: '/createproperty', exact: true,  name: 'Properties', component: CreatePropert },
  { path: '/propertymanagement', exact: true,  name: 'Properties', component: PropertyManagement },
  { path: '/propertymanagement/:id', exact: true, name: 'Property Details', component: PropertyManagementDetails },
 
];

export default routes;
