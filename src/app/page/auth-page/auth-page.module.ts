import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedComponentsModule} from '../../shared/component/shared-components.module';
import {VerifyComponent} from './verify/verify.component';
import {VerificationGuardService} from '../../service/guard/verifiation.guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'verification', component: VerifyComponent, canActivate: [VerificationGuardService]},
];

@NgModule({
  declarations: [
    LoginComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
  ],
  exports: []
})
export class AuthPageModule {
}
