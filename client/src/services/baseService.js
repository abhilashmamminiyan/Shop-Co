export class ServiceBase {
    static API_URL = "http://localhost:4001"

    static getUrl(path) {
        return `${this.API_URL}${path}`;
    }
}