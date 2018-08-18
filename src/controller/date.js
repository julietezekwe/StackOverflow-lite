export default class DateTime {
  getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1
    const day = now.getDate()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    return `${year}-${this.formatDate(month)}-${this.formatDate(day)} ${this.formatDate(hours)}:${this.formatDate(minutes)}:${this.formatDate(seconds)}`
  }

  formatDate(param) {
    return ( param < 10 ) ? `0${param}` : param;
  }

}
