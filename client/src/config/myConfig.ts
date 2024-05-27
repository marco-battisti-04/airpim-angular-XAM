export class myConfig {
    private SERVER_URL: string = "http://10.0.0.152:50000"

    getServerUrl(): string {
        return this.SERVER_URL;
    }
}