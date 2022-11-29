export class Constants {
  url = window.location.href;
  isProd = this.url.includes("localhost") ? false : true;
  static get BACKEND_URL() {
    return this.isProd
      ? "https://investorblog.diplomportal.dk/api"
      : "https://investorblog.diplomportal.dk/api";
  }
  static get FRONTEND_URL() {
    return this.isProd
      ? "https://investorblog.diplomportal.dk"
      : "https://investorblog.diplomportal.dk";
  }
}
