import * as Icon from 'react-feather';

const SidebarData = [
  { caption: 'HOME' },
  {
    title: 'Home/Statistique',
    href: '/dashboards/Statistic_Of_designer',
    id: 1,
    suffix: '',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <Icon.Home />,
    collapisble: true,
    
  },
  { caption: 'PRODUCTION DESIGN' },
  {
    title: 'PRODUCTION DESIGN',
    href: '#',
    id: 4,
    suffix: '2',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <Icon.Disc />,
    collapisble: true,
    children: [
      {
        title: 'LIST OF PRODUCTION DESIGN',
        href: '/ListOfProductionDesign',
        icon: <Icon.Disc />,
        id: 4.1,
        collapisble: false,
      },
      {
        title: 'ADD PRODUCTION DESIGN',
        href: '/ProductionDesign/AddProductionDesign',
        icon: <Icon.Disc />,
        id: 4.2,
        collapisble: false,
      },
      
    ],
  },
  { caption: 'EMPLOYEE MANAGEMENT' },
  {
    title: 'EMPLOYER',
    href: '/employer',
    id: 5,
    suffix: '2',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <Icon.User />,
    collapisble: true,
    children: [
      {
        title: 'LIST',
        href: '/tables/ListOfEmployer',
        icon: <Icon.Disc />,
        id: 5.1,
        collapisble: false,
      },
      {
        title: 'ADD',
        href: '/User/AddUser',
        icon: <Icon.Disc />,
        id: 5.2,
        collapisble: false,
      },
      
    ],
  },
  { caption: 'Task' },
  {
    title: 'TASK',
    href: '/dashboards',
    id: 6,
    suffix: '3',
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <Icon.Disc />,
    collapisble: true,
    children: [
      {
        title: 'LIST',
        href: '/tickt/ticket-list',
        icon: <Icon.Disc />,
        id: 6.1,
        collapisble: false,
      },
      {
        title: 'ADD',
        href: 'Task/AddTask',
        icon: <Icon.Disc />,
        id: 6.2,
        collapisble: false,
      },

    ],
  },
];

const userRole = sessionStorage.getItem('roles');

if (userRole === ('user')) {
  SidebarData.splice(2, 2);
  SidebarData.splice(3, 2);
  SidebarData.splice(5,2);

}



export default SidebarData;
