
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './routers/Home'
import Customer from './routers/CustomerData'
import Employee from './routers/EmployeeData'
import AddCustomer from './routers/AddCustomer'
import GetCustomer from './routers/GetCustomer'
import UpdateCustomerByCustomerNumber from './routers/updateCustomerByCustomerNumber'
import UpdateCustomerAddress from './routers/UpdateCustomerAddress'
import UpdateCustomerFirstName from './routers/UpdateCustomerFirstName'
import UpdateCustomerLastName from './routers/UpdateCustomerLastName'
import GetCustomerByContactFirstName from './routers/GetCustomerByContactFirstName'
import GetCustomerByContactLastName from './routers/GetCustomerByContactLastName'
import CustomerGreaterThanCreditLimit from './routers/CustomerGreaterThanCreditLimit'
import CustomerLessThanCreditLimit from './routers/CustomerLessThanCreditLimit'
import GetCustomerByOfficecode from './routers/GetCustomerByOfficecode'
import GetCustomerByRange from './routers/GetCustomerByRange'
import GetAllEmployees from './routers/GetAllEmployees'
import AddEmployee from './routers/AddEmployee'
import GetEmployeeByCity from './routers/GetEmployeeByCity'
import GetEmployeeById from './routers/GetEmployeeById'
import GetEmployeeByOfficeCode from './routers/GetEmployeeByOfficeCode'
import DeleteEmployee from './routers/DeleteEmployee'
import UpdateAllRoles from './routers/UpdateAllRoles'
import UpdateEmployee from './routers/UpdateEmployee'
import UpdateEmployeeReporting from './routers/UpdateEmployeeReporting'
import UpdateOfficeDetails from './routers/UpdateOfficeDetails'
function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Home/>}></Route>
       <Route path="/customer" element={<Customer/>}></Route>
        <Route path="/employee" element={<Employee/>}></Route>
         <Route path="/addcustomer" element={<AddCustomer/>}></Route>
          <Route path="/getcustomer" element={<GetCustomer/>}></Route>
          <Route path="/getbyfirstname" element={<GetCustomerByContactFirstName/>}></Route>
          <Route path='/getbylastname' element={<GetCustomerByContactLastName/>}></Route>
          <Route path='/greaterthancreditlimit' element={<CustomerGreaterThanCreditLimit/>}></Route>
          <Route path='/lessthancreditlimit' element={<CustomerLessThanCreditLimit/>}></Route>
          <Route path='/getcustomerbycreditrange' element={<GetCustomerByRange/>}></Route>
          <Route path='/getcustomerbypostalcode' element={<GetCustomerByRange/>}></Route>
          <Route path='/getbyofficecode' element={<GetCustomerByOfficecode/>}></Route>
          <Route path="/updatecustomername" element={<UpdateCustomerByCustomerNumber/>}></Route>
          <Route path="/updatecustomeraddress" element={<UpdateCustomerAddress/>}></Route>
          <Route path="/updatecustomerfirstname" element={<UpdateCustomerFirstName />}></Route>
           <Route path="/updatecustomerlastname" element={<UpdateCustomerLastName />}></Route>
           <Route path='/addemployee' element={<AddEmployee/>}></Route>
           <Route path='/getallemployee' element={<GetAllEmployees/>}></Route>
           <Route path='/getemployeebycity' element={<GetEmployeeByCity/>}></Route>
           <Route path='/getemployeesbyid' element={<GetEmployeeById/>}></Route>
           <Route path='/getemployeesbyofficecode' element={<GetEmployeeByOfficeCode/>}></Route>
           <Route path='/updaterole' element={<UpdateAllRoles/>}></Route>
           <Route path='/updateemployee' element={<UpdateEmployee/>}></Route>
           <Route path='/updateemployeereporting' element={<UpdateEmployeeReporting/>}></Route>
            <Route path='/updateemployeeofficedetails' element={<UpdateOfficeDetails/>}></Route>
           <Route path='/deleteemployee' element={<DeleteEmployee/>}></Route> 
          
     </Routes>
    </>
  )
}

export default App
