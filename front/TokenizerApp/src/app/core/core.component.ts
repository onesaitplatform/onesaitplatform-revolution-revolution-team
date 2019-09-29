import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})


export class CoreComponent implements OnInit {
  pressBtn:boolean=false;
  fileData: File = null;
  constructor(private http: HttpClient,private router:Router) { }
   
  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
  }
   
  onSubmit() {
    this.pressBtn=true;
      const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post('url/to/your/api', formData, {
        reportProgress: true,
        observe: 'events'   
      })
      .subscribe(events => {
        if(events.type == HttpEventType.UploadProgress) {
            console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
        } else if(events.type === HttpEventType.Response) {
            console.log(events);
        }
      })
  }

  nextToList(){
    this.router.navigate(['/option']);
  }

  ngOnInit() {
  }

}





