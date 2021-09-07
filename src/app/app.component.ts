import { Component , OnInit } from '@angular/core';
import { FormBuilder , FormArray,  Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title='Assignment3';
  RegisterationForm!: FormGroup;
  info = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address:[{
      street:'',
      city:'',
      state:'',
      country:''
    }],
    skills:[{
      certificate:'',
      organization:''
    }]
    
  }
  Submit: boolean = false;
  count=1;
  countskills=1;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.RegisterationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")]],
      phoneNumber: ['', [Validators.required]], 
      address: this.formBuilder.array([
        this.formBuilder.group({
          street:['',Validators.required],
          city:['',Validators.required],
          state:['',Validators.required],
          country:['',Validators.required]
        })
      ]),
      skills: this.formBuilder.array([
        this.formBuilder.group({
          
          certificate:['',Validators.required],
          organization:['',Validators.required]
        })
      ])     
    });
  }

  onSubmit(form:any) {
    console.log(this.RegisterationForm);
    this.Submit = true;
    this.info.name = form.value.name;
    this.info.email = form.value.email;
    this.info.password = form.value.password;
    this.info.phoneNumber = form.value.phoneNumber;
    for (let i = 0; i < this.count; i++) {

      this.info.address[i].street = form.value.address[i].street;
      this.info.address[i].city = form.value.address[i].city;
      this.info.address[i].state = form.value.address[i].state;
      this.info.address[i].country = form.value.address[i].country;
    }
    for (let i = 0; i < this.countskills; i++) {

      
      this.info.skills[i].certificate = form.value.skills[i].certificate;
      this.info.skills[i].organization=form.value.skills[i].organization;
      
    }
    
  }
  get address(){
    return this.RegisterationForm.get('address') as FormArray;
  }
  get skills(){
    return this.RegisterationForm.get('skills') as FormArray;
  }
  addAddress() {
    this.count++;
    this.info.address.push(
      {
        street: '',
        city: '',
        state:'',
        country:''
      }
    );
    const address = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]

    });
    this.address.push(address);
  }
  addSkills() {
    this.countskills++;
    this.info.skills.push(
      {
        certificate: '',
        organization:''
      }
    );
    const skills = this.formBuilder.group({
      
      certificate: ['', Validators.required],
      organization: ['', Validators.required]

    });
    this.skills.push(skills);
  }

  removeAddress() {
    this.address.removeAt(this.address.length - 1);
  }
  removeSkills() {
    this.skills.removeAt(this.skills.length - 1);
  }

  trackFunction(index: any, item: any) {
    return index;
  }
  trackFunctionSkills(index: any, item: any) {
    return index;
  }
}