import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// const { opdId } = useParams();

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('fa:dashboard'),
    id:'app',
  
  },
  {
    title: 'OPD',
    path: '/dashboard/OPD',
    icon: getIcon('eva:person-fill'),
    id:'opd'
  },
  
  {
    title: 'IPD',
    path: '/dashboard/IPD',
    icon: getIcon('eva:person-fill'),
    id:'ipd',
  },
  
  {
    title: 'Appointment',
    path: '/dashboard/Appointment',
    icon: getIcon('fa-solid:stethoscope'),
    id:'appointment',
    children:[
      {
        title: 'All',
        path: '/dashboard/AllAppointment',
        icon: getIcon('fa-solid:stethoscope'),
        id:'all',

      },
      {
        title: 'Add',
        path: '/dashboard/AddAppointment',
        icon: getIcon('eva:plus-circle-fill'),
        id:'add',
      },
      {
        title: 'Todays',
        path: '/dashboard/TodaysAppointment',
        icon: getIcon('fa:list-alt'),
        id:'todays',
      },
      {
        title: 'Upcoming',
        path: '/dashboard/Upcoming',
        icon: getIcon('fa:list-alt'),
        id:'upcoming',
      },
      {
        title: 'Calendar',
        path: '/dashboard/Calender',
        icon: getIcon('fa:list-alt'),
        id:'calendar',
      },
      {
        title: 'Request',
        path: '/dashboard/RequestAppointment',
        icon: getIcon('fa:list-alt'),
        id:'request',
      },

    ]
  },
  {
    title: 'Prescription',
    path: '/dashboard/Prescription',
    icon: getIcon('fa-solid:prescription'),
    id: 'prescription',
  },
  // <i class="fa-solid fa-prescription"></i>
  // {
  //   title: 'Doctors',
  //   path: '/dashboard/Doctor',
  //   icon: getIcon('fa-solid:users'),
  //   id: 'doctor',
  //   children:[
  //     {
  //       title: 'List Of Doctors',
  //       path: '/dashboard/ListOfDoctor',
  //       icon: getIcon('eva:person-fill'),
  //       id: 'listofdoctor',
  //     },
  //     {
  //       title:'Treatment History',
  //       path: '/dashboard/TreatmentHistory',
  //       icon: getIcon('fa:money'),
  //       id:'treatmenthistory',
  //     }
  //   ]
  // },
  {
    title: 'patients',
    path: '/dashboard/patient',
    icon: getIcon('fa-solid:users'),
    id:'patients',
    children:[
            {
              title: 'Patient List',
              path: '/dashboard/PatientList',
              icon: getIcon('eva:person-fill'),
              id: 'patientlist',
            },
            {
              title: 'Payments',
              path: '/dashboard/Payments',
              icon: getIcon('fa:dollar'),
              id: 'payment',
            },
            {
              title: 'Case Manager',
              path: '/dashboard/CaseManger',
              icon: getIcon('fa:book'),
              id: 'casemanager',
            },
            // {
            //   title: 'Documents',
            //   path: '/dashboard/Documents',
            //   icon: getIcon('fa:file-text'),
            //   id: 'document',
            // }
          ]
  },
  {
    title: 'Medicine',
    path: '/dashboard/Medicine',
    icon: getIcon('fa:medkit'),
    id: 'medician',
    children:[
            {
              title: 'Medicine List',
              path: '/dashboard/MedicineList',
              icon: getIcon('fa:medkit'),
              id:'medicinelist',
            },
            {
              title: 'Add Medicine',
              path: '/dashboard/AddMedicine',
              icon: getIcon('eva:plus-circle-fill'),
              id:'addmedicine',
            },
            {
              title: 'Medicine Category',
              path: '/dashboard/MedicineCategory',
              icon: getIcon('fa:edit'),
              id:'medicinecategory',
            },
            {
              title: 'Add Category',
              path: '/dashboard/AddCategory',
              icon: getIcon('eva:plus-circle-fill'),
              id:'addcategory',
            }, {
              title: 'Medicine Stock Alert',
              path: '/dashboard/MedicineStockAlert',
              icon: getIcon('eva:plus-circle-fill'),
              id:'medicinestock',
            }
          ]
  },

  {
    title: 'Cage/Kennel',
    path: '/dashboard/Bed',
    icon: getIcon('fa:bed'),
    id: 'bed',
    children:[
            {
              title: 'Cage/Kennel List',
              path: '/dashboard/CageKennelList',
              icon: getIcon('fa:bed'),
              id: 'bedlist',
            },
            {
              title: 'Add Cage/Kennel',
              path: '/dashboard/AddCageKennel',
              icon: getIcon('eva:plus-circle-fill'),
              id: 'addbed',
            },
            {
              title: 'Ward Category',
              path: '/dashboard/WardCategory',
              icon: getIcon('fa:edit')
              
            },
            // {
            //   title: 'BedAllotments',
            //   path: '/dashboard/BedAllotments',
            //   icon: getIcon('fa:plus-square-o'),
            //   id: 'bedallotments',
            // },           
            // {
            //   title: 'AddAllotment',
            //   path: '/dashboard/AddAllotment',
            //   icon: getIcon('eva:plus-circle-fill'),
            //   id:'addAllotment',
            // },          
           
          ]
         
  },
  {
    title: 'Health Report',
    path: '/dashboard/Report',
    icon: getIcon('fa:hospital-o'),
    id:'report',
  },

  {
    title: 'Death Report',
    path: '/dashboard/DeathReport',
    icon: getIcon('fa:minus-square-o'),
    id:'deathreport',
  },
  {
    title: 'Consent',
    path: '/dashboard/Consent',
    icon: getIcon('fa:wpforms'),
    id:'consent',
  },
  {
    title: 'User Management',
    path: '/dashboard/UserManagement',
    icon: getIcon('eva:person-fill'),
    id:'usermanagement',
  },
  {
    title: 'Clinic/Hospital Management',
    path: '/dashboard/ClinicManagement',
    icon: getIcon('eva:person-fill'),
    id:'clinicmanagement',
  },
  {
    title: 'Patient History',
     path: '/dashboard/DelPatientHistory',
    icon: getIcon('fa:history'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
