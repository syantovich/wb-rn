class NetworkResponse<T> {
  error: T extends string ? T : false = false as T extends string ? T : false;
  data: T extends string ? null : T = null as T extends string ? null : T;

  constructor(data: T) {
    if (typeof data === 'string') {
      this.error = data as T extends string ? T : false;
    } else {
      this.data = data as T extends string ? null : T;
    }
  }
}

export default NetworkResponse;
