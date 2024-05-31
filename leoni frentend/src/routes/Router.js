import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import ListOfProductDesign from '../views/dashboards/ListOfProductDesign';
import ModifyProductDesign from '../views/dashboards/ModifyProductDesign';
/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Statistic = Loadable(lazy(() => import('../views/dashboards/Statistic')));
const AddUser = Loadable(lazy(() => import('../views/dashboards/AddUser')));
const UpdateUser = Loadable(lazy(() => import('../views/dashboards/UpdateUser')));

const  ListOfEmployer= Loadable(lazy(() => import('../views/dashboards/ListOfEmployer')));
const  ListOfProductionDesign= Loadable(lazy(() => import('../views/dashboards/ListOfProductionDesign')));

const TicketList = Loadable(lazy(() => import('../views/apps/ticket/TicketList')));
const TicketDetail = Loadable(lazy(() => import('../views/apps/ticket/TicketDetail')));

const ListDataCleansing = Loadable(lazy(() => import('../views/dashboards/ListDataCleansing')));
const AddDataCleansing = Loadable(lazy(() => import('../views/dashboards/AddDataCleansing')));
const AddProductDesign = Loadable(lazy(() => import('../views/dashboards/AddProductDesign')));
const AddProductionDesign = Loadable(lazy(() => import('../views/dashboards/AddProductionDesign')));
const UpdateProductionDesign = Loadable(lazy(() => import('../views/dashboards/UpdateProductionDesign')));

const AddTask = Loadable(lazy(() => import('../views/dashboards/AddTask')));
const AddTask2 = Loadable(lazy(() => import('../views/dashboards/AddTask2')));

const UpdateTask = Loadable(lazy(() => import('../views/dashboards/UpdateTask')));

const EditDataCleansing = Loadable(lazy(() => import('../views/dashboards/EditDataCleansing')));
/***** Chart Pages ****/
const ApexCharts = Loadable(lazy(() => import('../views/charts/ApexCharts')));
const DesignStat = Loadable(lazy(() => import('../views/charts/DesignStat')));
const ChartJs = Loadable(lazy(() => import('../views/charts/ChartJs')));

const Profile = Loadable(lazy(() => import('../views/sample-pages/Profile')));


const CustomVectorMap = Loadable(lazy(() => import('../views/maps/CustomVectorMap')));



/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));
const Maintanance = Loadable(lazy(() => import('../views/auth/Maintanance')));
const LockScreen = Loadable(lazy(() => import('../views/auth/LockScreen')));
const RecoverPassword = Loadable(lazy(() => import('../views/auth/RecoverPassword')));

/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/auth/loginformik" /> },
      { path: '/dashboards/Statistic_Of_designer', name: 'Statistic_Of_designer', exact: true, element: <Statistic /> },
      { path: '/User/AddUser', name: 'AddUser', exact: true, element: <AddUser /> },
      { path: '/User/UpdateUser/:id', name: 'AddUser', exact: true, element: <UpdateUser /> },
      { path: '/dashboards/AddDataCleansing', name: 'AddDataCleansing', exact: true, element: <AddDataCleansing /> },
      { path: '/ProductDesign/AddProductDesign', name: 'AddProductDesign', exact: true, element: <AddProductDesign /> },
      { path: '/ProductDesign/ModifyProductDesign', name: 'ModifyProductDesign', exact: true, element: <ModifyProductDesign/> },
      { path: '/ProductionDesign/AddProductionDesign', name: 'AddProductDesign', exact: true, element: <AddProductionDesign /> },
     // { path: '/dashboards/analytical', name: 'Analytical', exact: true, element: <Analytical /> },
      { path: '/ListOfProductionDesign', name: 'ListOfProductionDesign', exact: true, element: <ListOfProductionDesign /> },
      { path: '/ProductionDesign/Update/:id', name: 'UpdateProductionDesign', exact: true, element: <UpdateProductionDesign/> },

      { path: '/Task/AddTask/:id1', name: 'AddTask', exact: true, element: <AddTask /> },
      { path: '/Task/AddTask2', name: 'AddTask2', exact: true, element: <AddTask2 /> },

      { path: '/Task/UpdateTask/:id', name: 'AddTask', exact: true, element: <UpdateTask /> },

      { path: 'DataCleansing/EditDataCleansing', name: 'EditDataCleansing', exact: true, element: <EditDataCleansing /> },
      { path: '/task/list', name: 'ticket list', exact: true, element: <TicketList/> },
      {
        path: '/tickt/ticket-detail',
        name: 'ticket detail',
        exact: true,
        element: <TicketDetail />,
      },
      {
        path: '/tables/ListOfEmployer',
        name: 'ListOfEmployer',
        exact: true,
        element: <ListOfEmployer/>,
      },
      {
        path: '/dashboards/data-cleansing/ListDataCleansing',
        name: 'ListDataCleansing',
        exact: true,
        element: <ListDataCleansing />,
      },
      {
        path: '/data/ListProductDesign',
        name: 'ListProductDesign',
        exact: true,
        element: <ListOfProductDesign />,
      },
      { path: '/charts/apex', name: 'apex', exact: true, element: <ApexCharts /> },
      { path: '/charts/DesignStat', name: 'design', exact: true, element: <DesignStat /> },
      { path: '/charts/chartjs', name: 'chartjs', exact: true, element: <ChartJs /> },
      { path: '/profile', name: 'profile', exact: true, element: <Profile /> },
      { path: '/map/world', name: 'vector', exact: true, element: <CustomVectorMap /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'registerformik', element: <RegisterFormik /> },
      { path: 'loginformik', element: <LoginFormik /> },
      { path: 'maintanance', element: <Maintanance /> },
      { path: 'lockscreen', element: <LockScreen /> },
      { path: 'recoverpwd', element: <RecoverPassword /> },
    ],
  },
];

export default ThemeRoutes;
