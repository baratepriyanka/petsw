// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const NavConfigCli = [
  {
    title: 'User Management',
    path: '/dashboard/UserManagement',
    icon: getIcon('eva:person-fill'),
  },
  {
    title: 'Clinic Management',
    path: '/dashboard/ClinicManagement',
    icon: getIcon('eva:person-fill'),
  },
 
];

export default NavConfigCli;
