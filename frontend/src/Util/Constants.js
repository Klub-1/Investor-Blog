export class Constants {
  url = window.location.href;
  isProd = !this.url.includes("localhost");
  BACKEND_URL() {
    return this.isProd
      ? "https://investorblog.ml/api"
      : "http://localhost:8000";
  }
  FRONTEND_URL() {
    return this.isProd
      ? "https://investorblog.ml"
      : "http://localhost:3000";
  }
}
