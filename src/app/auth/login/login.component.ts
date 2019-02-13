import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import {CoursexosService} from  '../../coursexos.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' ]
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  invalidLogin: boolean;
  authChange = new Subject<boolean>();
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private cours: CoursexosService,
              private toastr: ToastrService) { }

  ngOnInit() {
    console.log('ici1=');
    this.invalidLogin = false;
    if(this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/training']);
    }
    /*this.route.paramMap
      .subscribe(params => {console.log(params)});
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';*/
  }

  onLogin(loginForm: NgForm) {
    var credentials = loginForm.value;
    console.log('credentials=',credentials);
    this.authenticationService.login(credentials)
      .pipe(first())
      .subscribe(response => {console.log('responselogin=',response);
                              if(response) {
                                this.router.navigate(['']);
                                this.authChange.next(true);
                                //rg1
                                console.log('appelgetcours=');
                                this.cours.getcours(12)
        
                                //fin rg1
                                this.toastr.success("Bienvenue " + loginForm.value.email + " !");                           
                              } else {
                                this.toastr.warning("Email ou mot de passe erroné!"); 
                              }

                             },
                 error => {console.log("errorlogin=",error);
                           this.router.navigate(['/login']);
                           this.invalidLogin = true;
                          }
      );
  }
}
