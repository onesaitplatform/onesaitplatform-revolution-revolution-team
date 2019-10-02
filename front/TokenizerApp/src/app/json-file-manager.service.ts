import { Injectable } from '@angular/core';

import { FileManagerService } from './file-manager.service';
@Injectable({
  providedIn: 'root'
})
export class JsonFileManagerService {
  //TODO estructura json
  /**
   * List of user that have a list of documents
   */
  /** Json structure
   * [
   "user",
   {
    "_id": "<ReferenceError: userId is not defined>",
    "files": [
      {
        "id": tokenfile1,
        "name": "nameoffile."
      },
   {
        "id": tokenfile1,
        "name": "nameoffile."
   },
   {
        "id": tokenfile1,
        "name": "nameoffile."
   }
   ]
   }
   ]
   */
  constructor( protected fileManagerService: FileManagerService ) { }


  public addDataFile (fileToken: String, filename: String, username: String) {
    this.fileManagerService.getFile(fileToken);
    // TODO add to data file and file
    this.fileManagerService.modifyFile(fileToken, this.fileManagerService.file);
  }

  public deleteDataFromFile (fileToken: String, filename: String, username: String) {
    this.fileManagerService.getFile(fileToken);
    // TODO remove data file and file
    this.fileManagerService.modifyFile(fileToken, this.fileManagerService.file);
  }
}
