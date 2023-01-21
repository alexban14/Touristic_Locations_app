import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface BackendResponseUpload {
    fileName: string;
}

@Injectable({
    providedIn: 'root'
})
export class ImgUploadService {
    private imgUploadEndpoint = '/imgFiles/upload';
    private imgDownloadEndpoint = '/imgFiles/get/';

    constructor(private http: HttpClient) {}

    uploadImg(file: FormData) {
        return this.http.post<BackendResponseUpload>(environment.baseURL + this.imgUploadEndpoint, file, {
            observe: 'body',
            withCredentials: true
        });
    }

    downloadImg(fileName: string) {
        return this.http.get<File[]>(environment.baseURL + this.imgDownloadEndpoint + fileName);
    }
}
