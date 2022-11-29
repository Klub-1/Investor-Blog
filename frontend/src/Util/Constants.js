export class Constants {
  url = window.location.href;
  isProd = !this.url.includes("localhost");
  BACKEND_URL() {
    return this.isProd
      ? "https://investorblog.diplomportal.dk/api"
      : "http://localhost:8000";
  }
  FRONTEND_URL() {
    return this.isProd
      ? "https://investorblog.diplomportal.dk"
      : "http://localhost:3000";
  }
}
