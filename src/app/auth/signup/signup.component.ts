import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  invalidSignup:string;
  authChange = new Subject<boolean>();
  constructor(private auth: AuthenticationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.invalidSignup = "";
  }

  onSignup(signUpForm: NgForm) {
    this.invalidSignup = "";
    let newUser = signUpForm.value;
    console.log('ici=', newUser);
    var data = this.auth.signUp(newUser)
    .subscribe((response) =>  {console.log('response=',response);
                                var retourSignUp = JSON.stringify(response);
                                retourSignUp = JSON.parse(retourSignUp).insertion;
                               console.log('retourSignUp=', retourSignUp);
                               this.authChange.next(true);
                               this.toastr.success('Bienvenue !' + newUser.email, 'Inscription réussie!');
                               //this.router.navigate(['/'], { queryParams: { invalidSignup: 'Inscription réussie!' }});
                              },
                 (error) => { if (error.status ===400) {
                               console.log('error=', error.status);
                               //this.invalidSignup = "Cet utilisateur existe déjà!";
                               this.toastr.info("L'utilisateur !" + newUser.email+ " existe déjà!");
                               //*ngIf="invalidSignup"
                            } else {
                              console.log('error=', error.status);
                              this.invalidSignup = "Une erreur grave est survenue!";
                            }});
  }
}
