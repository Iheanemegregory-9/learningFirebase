import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-file-storage',
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.css']
})
export class FileStorageComponent implements OnInit {

  constructor(private fireService: FirebaseService){}

  uploadProgress:any = '';
  uploadError:any = '';
  uploadLink:any = '';

  file:any = {};

  ngOnInit(): void {
    
  }

  uploadFile(){
    this.fireService.uploadFile()
    this.uploadProgress = this.fireService.progress;
    this.uploadError = this.fireService.uploadErr;
    this.uploadLink = this.fireService.downloadLink;
  }

  

  

}
