import { Injectable } from "@angular/core";
import { myConfig } from "../config/myConfig"

@Injectable()
export class UserService {

    constructor(private config: myConfig) {
    }

    getUser() {

    }

    isAuthenticated() {
        return localStorage.getItem('user') ? true : false;
    }

    async login(id: number, pin: string) {

        let json = { 
            "id": id, 
            "pin": pin 
        }

        let response = await fetch(`${this.config.getServerUrl()}/login`, {
            method: 'POST',
            body: JSON.stringify(json)
        }).then( data => {return data.json() });

        if(response.status === 'ok') {
            localStorage.setItem('user', id + "");
            return response;
        }else {
            return response;
        }
    }
    
    async logout() {
        localStorage.removeItem('user')
    }
}