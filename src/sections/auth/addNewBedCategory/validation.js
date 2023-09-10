export default function validate(values) {
    // export default function AddNewDoctorForm() {
        const isValid = true;
        const regex = /[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
        const errors = {};
         const limit =500;
         if (!values.category_name) {
           errors.category_name ='Enter the Ward Category';
         } else if(values.category_name.slice(50, limit)){
           errors.category_name ='Enter the minimum 50 character';
           }  
         if (!values.description) {
           errors.description ='Enter the Description';
         }else if(values.description.slice(450, limit)){
           errors.description ='Enter the minimum 450 character';
         }
         
         // return errors;
         // setFormErrors(errors);
     
         return errors;
         //  {
         //   isValid,
         //   errorrs: errors,
         // };
  };