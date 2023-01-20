import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface BackendResponseUpload {
    fileName: string;
}

interface FileResponse {
    _id: string;
    length: number;
    chunkSize: number;
    uploadDate: Date;
    filename: string;
    contentType: string;
}

@Injectable({
    providedIn: 'root'
})
export class ImgUploadService {
    private imgUploadEndpoint = '/imgFiles/uplaod';
    private imgDownloadEndpoint = '/imgFiles/get/';

    constructor(private http: HttpClient) {}

    uploadImg(file: File) {
        return this.http.post<BackendResponseUpload>(environment.baseURL + this.imgUploadEndpoint, file, {
            observe: 'body',
            withCredentials: true
        });
    }

    downloadImg(fileName: string) {
        return this.http.get<FileResponse[]>(environment.baseURL + this.imgDownloadEndpoint + fileName);
    }
}
