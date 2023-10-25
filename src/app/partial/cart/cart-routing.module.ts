import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { NotFoundComponent } from 'src/app/shared/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'check-out', component: CheckOutComponent},
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CartRoutingModule { }
