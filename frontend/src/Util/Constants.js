export class Constants {
  url = window.location.href;
  isProd = this.url.includes("localhost") ? false : true;
  static get BACKEND_URL() {
    return this.isProd ? "http://localhost:8000" : "http://localhost:8000";
  }
  static get FRONTEND_URL() {
    return this.isProd ? "http://localhost:3000" : "http://localhost:3000";
  }
}
