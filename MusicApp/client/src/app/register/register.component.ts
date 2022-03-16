import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter<boolean>();
  registerForm:FormGroup;
  validationErrors:string[]=[];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb:FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  register(){
    this.accountService.register(this.registerForm.value).subscribe(
      (er) => {
        this.router.navigate(['/members']);
        this.cancel();
      },
      error => {
        if(Array.isArray(error)){
        this.validationErrors=error;
        }
        // this.toastr.error(error.error)
        // console.log(error)
      }
    )
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
  initializeForm(){
    this.registerForm=this.fb.group({
      username:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(10)]],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
      });
    // this.registerForm=new FormGroup({
    //   username:new FormControl('',Validators.required),
    //   password:new FormControl('',[Validators.required,Validators.minLength(8),Validators.max(10)]),
    //   confirmPassword:new FormControl('',[Validators.required,this.matchValues('password')])
    // });
    this.registerForm.get('password')?.valueChanges.subscribe(()=>{
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  matchValues(matchTo:string):ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null=>{
      // const controlValue=control.value;
      // const controlToMatch=(control?.parent as FormGroup)?.controls[matchTo];
      // const controlToMatchValue=controlToMatch?.value;
      // return controlValue==controlToMatchValue ? null : { isMaching:true };
      const controlToMatchValue=(control?.parent as FormGroup)?.controls[matchTo]?.value;
      return control.value==controlToMatchValue ? null : { isMaching:true };
    }
  }
}
