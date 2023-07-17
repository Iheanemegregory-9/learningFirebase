import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FileStorageComponent } from './file-storage/file-storage.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'files', component: FileStorageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
