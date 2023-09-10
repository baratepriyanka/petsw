import { Navigate, useRoutes } from 'react-router-dom';
import {useState} from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import OPD from './pages/OPD';
import DelPatientHistory from './pages/DelPatientHistory';


import IPD from './pages/IPD';
import IpdNewPatientjs from './pages/IpdNewPatientjs';
import EditIpdList from './pages/EditIpdList';
import InfoIpdList from './pages/InfoIpdList';

import Report from './pages/Report';
import NewHealthReportjs from './pages/NewHealthReportjs';

import DeathReport from './pages/DeathReport';
import NewDeathReportjs from './pages/NewDeathReportjs';

import Consent from './pages/Consent';
import NewConsentjs from './pages/NewConsentjs';


// Appoinment

import Appointment from './pages/Appointment';
import AllAppointment from './pages/Appointment/AllAppointment';
import AddAllAppointment from './pages/AddAllAppointment';
import AddAppointment from './pages/AddAppointment';
import TodaysAppointment from './pages/Appointment/TodaysAppointment';
import AddTodaysAppointment from './pages/AddTodaysAppointment';
import RequestAppointment from './pages/Appointment/RequestAppointment';
import Upcoming from './pages/Appointment/Upcoming';
import AddUpcomingAppointment from './pages/AddUpcomingAppointment';




import Prescription from './pages/Prescription';
import RegisterNewPatient from './pages/RegisterNewPatient';
// import AddPrescription from './pages/AddPrescription';
import CreateNewAppointment from './pages/CreateNewAppointment';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Doctor from './pages/Doctor';
import PatientList from './pages/Patient/PatientList';
import Payments from './pages/Patient/Payments';

import CaseManger from './pages/Patient/CaseManger';
import EditCaseManager from './pages/EditCaseManager';
import AllPatientHistory from './pages/AllPatientHistory';


import Documents from './pages/Patient/Documents';
import CreateNewPatientList from './pages/CreateNewPatientList';
import CreateNewPaymentList from './pages/CreateNewPaymentList';
import AddNewDocument from './pages/AddNewDocument';
import ListOfDoctor from './pages/ListOfDoctor';
import TreatmentHistory from './pages/TreatmentHistory';
import AddNewDoctor from './pages/AddNewDoctor';
import AddPrescriptionJs  from './pages/AddPrescriptionJs';
// import AddAllotment  from './pages/Bed/AddAllotment';
import AddAllotment  from './pages/AddAllotment';
import AddBedAllotments  from './pages/AddBedAllotments';
import AddCageKennel  from './pages/Bed/AddCageKennel';
import WardCategory  from './pages/Bed/WardCategory';
import CageKennelList  from './pages/Bed/CageKennelList';
import BedAllotments  from './pages/Bed/BedAllotments';

import MedicineList from './pages/Medicine/MedicineList';
import AddMedicineList from './pages/AddMedicineList';
import AddMedicine from './pages/AddMedicine';
import AddMedicineCategory from './pages/AddMedicineCategory';
import MedicineCategory from './pages/Medicine/MedicineCategory';
import EditMedicineCategory from './pages/EditMedicineCategory';


// import AddCategory from './pages/Medicine/AddCategory';
import AddCategory from './pages/AddCategory';
import MedicineStockAlert from './pages/Medicine/MedicineStockAlert';
import AddMedicineStockAlert from './pages/AddMedicineStockAlert';
import CreateNewCageKennl from './pages/CreateNewCageKennl';
import AddNewCategory from './pages/AddNewCategory';
import TreatmentHistoryDetail from './pages/TreatmentHistoryDetail';
import InfoDoctorList from './pages/InfoDoctorList';
import EditDoctorList from './pages/EditDoctorList';
import EditOpdList from './pages/EditOpdList';
import InfoOpdList from './pages/InfoOpdList';
import HealthreportOpdList from './pages/HealthreportOpdList';

import InfoAppointmentList from './pages/InfoAppointmentList';
import EditAppointmentList from './pages/EditAppointmentList';
import EditPrescriptionList from './pages/EditPrescriptionList';
import InfoPrescriptionList from './pages/InfoPrescriptionList';
import InfoPrescriptionOpdList from './pages/InfoPrescriptionOpdList';
import EditPatientList from './pages/EditPatientList';
import InfoPatientList from './pages/InfoPatientList';
import InfoMedicineList from './pages/InfoMedicineList';
import EditMedicineList from './pages/EditMedicineList';
import InfoBedList from './pages/InfoBedList';
import EditCageKennlList from './pages/EditCageKennlList';

import EditHealthReportList from './pages/EditHealthReportList';
import InfoHealthReportList from './pages/InfoHealthReportList';
import OpdHealthReport from './pages/OpdHealthReport';
import IpdHealthReport from './pages/IpdHealthReport';

import EditDeathReportList from './pages/EditDeathReportList';
import InfoDeathReportList from './pages/InfoDeathReportList';

import EditConsentList from './pages/EditConsentList';
import InfoConsentList from './pages/InfoConsentList';

import EditBedAllotmentList from './pages/EditBedAllotmentList';
import InfoBedAllotmentList from './pages/InfoBedAllotmentList';

import EditWardCategoryList from './pages/EditWardCategoryList';
import InfoBedCategoryList from './pages/InfoBedCategoryList';

import EditDocumentsList from './pages/EditDocumentsList';
import InfoDocumentsList from './pages/InfoDocumentsList';
import Calender from './pages/Calender';
import ProfilePage from './pages/ProfilePage';
import AppointmentDoctorList from './pages/AppointmentDoctorList';

import EditProfilePage from './pages/EditProfilePage';
import PatientHistory from './pages/PatientHistory';
import AddClinic from './pages/AddClinic';
import ClinicManagement from './pages/ClinicManagement';
import UserManagement from './pages/UserManagement';
import CreateNewUserManagement from './pages/CreateNewUserManagement';
import EditClinicManagment from './pages/EditClinicManagment';
import EditUserManagment from './pages/EditUserManagment';
import ActivePatientInfo from './pages/ActivePatientInfo';


// ----------------------------------------------------------------------
const activeRootStyle = {
  color: 'red',
 
};

export default function Router({admin}) {

  return useRoutes([
    {
      path: '/dashboard',element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'OPD',  element: <OPD /> },
        { path: 'DelPatientHistory',  element: <DelPatientHistory /> },
        
        { path: 'IPD',  element: <IPD /> },
        { path: 'IpdNewPatientjs', element: <IpdNewPatientjs /> },
        { path: 'EditIpdList/:ipdId',  element: <EditIpdList /> },
        { path: 'InfoIpdList/:ipdId', element: <InfoIpdList /> },
        { path: 'AllPatientHistory/:ipdId',  element: < AllPatientHistory /> },
        { path: 'ActivePatientInfo/:patientId',  element: < ActivePatientInfo /> },
        
        { path: 'Report', element: <Report /> },
        { path: 'NewHealthReportjs', element: <NewHealthReportjs /> },
        
        { path: 'DeathReport', element: <DeathReport /> },
        { path: 'NewDeathReportjs', element: <NewDeathReportjs /> },

        { path: 'Consent', element: <Consent /> },
        { path: 'NewConsentjs', element: <NewConsentjs /> },
        
        
        {path:'EditOpdList/:opdId', element:<EditOpdList/>},
        {path:'InfoOpdList/:opdId', element:<InfoOpdList/>},
        {path:'HealthreportOpdList/:opdId', element:<HealthreportOpdList/>},
       
        {path:'EditPatientList/:patientId', element:<EditPatientList/>},
        {path:'InfoPatientList/:patientId', element:<InfoPatientList/>},

        {path:'EditPrescriptionList/:prescriptionId', element:<EditPrescriptionList/>},
        {path:'InfoPrescriptionList/:prescriptionId', element:<InfoPrescriptionList/>},
        {path:'InfoPrescriptionOpdList/:prescriptionId', element:<InfoPrescriptionOpdList/>},
        
        {path:'EditAppointmentList/:appointmentId', element:<EditAppointmentList/>},
        {path:'InfoAppointmentList/:appointmentId', element:<InfoAppointmentList/>},

        {path:'InfoMedicineList/:medicineId', element:<InfoMedicineList/>},
        {path:'EditMedicineList/:medicineId', element:<EditMedicineList/>},

        {path:'InfoBedList/:bedId', element:<InfoBedList/>},
        {path:'EditCageKennlList/:bedId', element:<EditCageKennlList/>},

        {path:'InfoBedAllotmentList/:bedAllotmentId', element:<InfoBedAllotmentList/>},
        {path:'EditBedAllotmentList/:bedAllotmentId', element:<EditBedAllotmentList/>},

        {path:'EditHealthReportList/:healthReportId', element:<EditHealthReportList/>},
        {path:'InfoHealthReportList/:healthReportId', element:<InfoHealthReportList/>},
        {path:'OpdHealthReport/:healthReportId', element:<OpdHealthReport/>},
        {path:'IpdHealthReport/:healthReportId', element:<IpdHealthReport/>},

        {path:'EditDeathReportList/:deathReportId', element:<EditDeathReportList/>},
        {path:'InfoDeathReportList/:deathReportId', element:<InfoDeathReportList/>},

        {path:'EditConsentList/:consentId', element:<EditConsentList/>},
        {path:'InfoConsentList/:consentId', element:<InfoConsentList/>},

        {path:'EditWardCategoryList/:bedCategoryId', element:<EditWardCategoryList/>},
        {path:'InfoBedCategoryList/:bedCategoryId', element:<InfoBedCategoryList/>},

        {path:'EditDocumentsList/:documentId', element:<EditDocumentsList/>},
        {path:'InfoDocumentsList/:documentId', element:<InfoDocumentsList/>},

        // Appointment path
        { path: 'appointment', element: <Appointment /> },
        { path: 'AllAppointment', element: <AllAppointment /> },
        { path: 'AddAllAppointment', element: <AddAllAppointment /> },
        { path: 'AddAppointment', element: <AddAppointment /> },
        { path: 'TodaysAppointment', element: <TodaysAppointment /> },
        { path: 'AddTodaysAppointment', element: <AddTodaysAppointment /> },
        { path: 'RequestAppointment', element: <RequestAppointment /> },
        { path:'Upcoming',element: <Upcoming />},
        { path:'Calender',element: <Calender />},
        { path:'AddUpcomingAppointment',element: <AddUpcomingAppointment />},
        
        { path: 'Prescription', element: <Prescription /> },
        { path: 'createNewAppointment', element: <CreateNewAppointment /> },
        { path: 'registerNewPatient', element: <RegisterNewPatient /> },
        // { path: 'addPrescription', element: <AddPrescription /> },        
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'Doctor', element: <Doctor /> },
        {path:'ListOfDoctor', element:<ListOfDoctor/>},
        {path:'InfoDoctorList/:doctorId', element:<InfoDoctorList/>},
        {path:'EditDoctorList/:doctorId', element:<EditDoctorList/>},
        
        {path:'TreatmentHistory',element:<TreatmentHistory/>},
        {path:'AddNewDoctor',element: <AddNewDoctor />},
        { path: 'PatientList', element: <PatientList /> },
        { path: 'Payments', element: <Payments /> },
        { path: 'CaseManger', element: <CaseManger /> },
        { path: 'EditCaseManager/:caseId', element: <EditCaseManager /> },

        { path: 'Documents', element: <Documents /> },
        { path: 'CreateNewPatientList', element: <CreateNewPatientList /> },
        { path: 'CreateNewPaymentList', element: <CreateNewPaymentList /> },
        { path: 'addNewDocument', element: <AddNewDocument /> },
        { path: 'addPrescriptionJs', element: <AddPrescriptionJs /> },        
        { path: 'AddAllotment', element: <AddAllotment /> }, 
        { path: 'AddBedAllotments', element: <AddBedAllotments /> },    
        { path: 'AddCageKennel', element: <AddCageKennel /> },        
        { path: 'WardCategory', element: <WardCategory /> },        
        { path: 'CageKennelList', element: <CageKennelList /> },        
        { path: 'BedAllotments', element: <BedAllotments /> },  
        
        
        { path: 'MedicineList', element: <MedicineList /> },
        { path: 'MedicineCategory', element: <MedicineCategory /> },
        { path: 'AddMedicineList', element: <AddMedicineList /> },
        { path: 'AddMedicine', element: <AddMedicine /> },
        { path: 'AddMedicineCategory', element: <AddMedicineCategory /> },   
        { path: 'EditMedicineCategory/:medCatId', element: <EditMedicineCategory /> },   
         

        { path: 'AddCategory', element: <AddCategory /> },   
        { path: 'AddCategory', element: <AddCategory /> },   
        { path: 'MedicineStockAlert', element: <MedicineStockAlert /> },   
        { path: 'AddMedicineStockAlert', element: <AddMedicineStockAlert /> },   
        { path: 'AddPrescriptionJs', element: <AddPrescriptionJs /> },   
        { path: 'CreateNewCageKennl', element: <CreateNewCageKennl /> },  
        { path:'AddNewCategory', element: <AddNewCategory />} ,
        { path:'TreatmentHistoryDetail',element: <TreatmentHistoryDetail />},
        { path:'ProfilePage',element: <ProfilePage />},
        { path:'AppointmentDoctorList/:appDId',element: <AppointmentDoctorList />},
        { path:'EditProfilePage',element: <EditProfilePage />},
        { path:'PatientHistory/:patientId',element: <PatientHistory />},
        { path:'AddClinic',element: <AddClinic />},
        { path:'ClinicManagement',element: <ClinicManagement />},
        { path:'UserManagement',element: <UserManagement />},
        { path:'CreateNewUserManagement',element: <CreateNewUserManagement />},
        { path:'EditClinicManagment/:clinicId',element: <EditClinicManagment />},
        { path:'EditUserManagment/:userManId',element: <EditUserManagment />},

        
      ],
    },

  

    {
      path: '/',
      element: <LogoOnlyLayout />,
      role:admin,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '/', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgotPassword', element: <ForgotPassword /> },
        { path: 'updatePassword', element: <UpdatePassword /> },
       
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      
      ],
    },

    // {
    //   path: '/',
    //   element: <LogoOnlyLayout />,
    //   role:'super admin',
    //   children: [
    //     // { path: '/', element: <Navigate to="/dashboard/app" /> },
    //     { path: '/', element: <Login /> },
    //     { path: 'register', element: <Register /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
