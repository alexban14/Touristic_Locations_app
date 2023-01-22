import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface BackendResponseUpload {
    fileName: string;
}

export interface BackendResponseUploads {
    filenames: string[];
}

@Injectable({
    providedIn: 'root'
})
export class ImgUploadService {
    private imgUploadEndpoint = '/imgFiles/upload';
    private imgUploadsEndpoint = '/imgFiles/uploadMulti';
    private imgDeleteEndpoint = '/imgFiles/delete/';

    constructor(private http: HttpClient) {}

    uploadImg(file: FormData) {
        return this.http.post<BackendResponseUpload>(environment.baseURL + this.imgUploadEndpoint, file, {
            observe: 'body',
            withCredentials: true
        });
    }

    uploadImgs(file: FormData) {
        return this.http.post<BackendResponseUploads>(environment.baseURL + this.imgUploadsEndpoint, file, {
            observe: 'body',
            withCredentials: true
        });
    }

    deleteImg(fileName: string) {
        return this.http.delete<string>(environment.baseURL + this.imgDeleteEndpoint + fileName, {
            observe: 'body',
            withCredentials: true
        });
    }
}
