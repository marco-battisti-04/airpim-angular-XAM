import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { myConfig } from "../config/myConfig"
import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable()
export class UserService {
    
    private readonly storage!: Storage;
    constructor(
        private config: myConfig,
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    }

    getUser() {

    }

    isAuthenticated() {
        return localStorage.getItem('user') ? true : false;
        if(isPlatformBrowser(this.platformId)) {
        }else {
            // console.log("error")
            return false;
        }
    }

    async login(id: number, pin: string) {
        
        let data = { 
            "id": id, 
            "pin": pin 
        }

        return this.http.post(`${this.config.getServerUrl()}/login`, data).subscribe((data: any) => {return data;})        
    }
    
    async logout() {
        localStorage.removeItem('user')
    }
}


            // "server": "src/main.server.ts",
            // "prerender": true,
            // "ssr": {
            //   "entry": "server.ts"
            // }