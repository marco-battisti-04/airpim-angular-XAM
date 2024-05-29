import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { myConfig } from "../config/myConfig"
import { isPlatformBrowser } from "@angular/common";

@Injectable()
export class UserService {
    
    private readonly storage!: Storage;
    constructor(
        private config: myConfig,
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
        //FIXME: sistema errore
        // fa la chiamata all'api di test, non funziona, non so se è un problema di api
        let json = { 
            "id": id, 
            "pin": pin 
        }

        let response = await fetch(`${this.config.getServerUrl()}/login`, {
            method: 'POST',
            body: JSON.stringify(json)
        }).then( data => {return data.json() });

        if(response.status === 'ok') {
            if(isPlatformBrowser(this.platformId)) {
                localStorage.setItem('user', id + "");
                return response;
            }else{
                return response;
            }
        }else {
            return response;
        }
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