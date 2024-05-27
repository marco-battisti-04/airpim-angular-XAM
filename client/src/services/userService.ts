import { myConfig } from "../config/myConfig"

export class UserService {

    constructor(private config: myConfig) {
    }

    getUser() {

    }

    isAuthenticated() {
        return localStorage.getItem('user')
    }

    async login(id: string, pin: String) {
        let response = await fetch(`${this.config.getServerUrl()}/login`, {
            body: JSON.stringify({ 
                "id": id, 
                "pin": pin 
            }),
        }).then( data => {return data.json() })
    }
    
    async logout() {
        localStorage.removeItem('user')
    }
}