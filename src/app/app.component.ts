import { Component } from '@angular/core';
import {FormGroup,FormBuilder,FormArray} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'company';
  myForm: FormGroup;

  data = {
    companies: [
      {
        company: "example comany",
        location:'banglore',
        country:'India',
        employees: [
          {
            employeeName: "first employee",
            contactNumber:'1234',
            salary:'1000'
          }
        ]
      }
    ]
  }

  constructor(private fb: FormBuilder){
    this.myForm = this.fb.group({
      // you can also set initial formgroup inside if you like
      companies: this.fb.array([])
    })

    this.setCompanies()
  } 

  addNewEmployee(control) {

    control.push(
      this.fb.group({
        employeeName: [''],
        contactNumber:'',
        salary:''
    }))
  }

  addNewCompany() {
    let control = <FormArray>this.myForm.controls.companies;
    control.push(
      this.fb.group({
        company: [''],
        location:'',
        country:'',
        // nested form array, you could also add a form group initially
        employees: this.fb.array([])
      })
    )
  }
  
  

  deleteEmployee(control, index) {
    control.removeAt(index)
  }

  setCompanies() {
    let control = <FormArray>this.myForm.controls.companies;
    this.data.companies.forEach(x => {
      control.push(this.fb.group({ 
        company: x.company, 
        location:x.location,
        country:x.country,  
        employees: this.setEmployees(x) }))
    })
  }
  
  setEmployees(x) {
    let arr = new FormArray([])
    x.employees.forEach(y => {
      arr.push(this.fb.group({ 
        employeeName: y.employeeName,
        contactNumber:y.contactNumber,
        salary:y.salary
      }))
    })
    return arr;
  }




  save(){
    console.log(JSON.stringify(this.myForm.controls.companies.value));
  }
}
