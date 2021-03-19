export class ProjectError {
  constructor(error) {
    this.error = error;
  }
}

export class TrucksError extends ProjectError {
  constructor(error) {
    super(error);
    this.field = 'trucks';
    this.step = 3;
  }
}

export class SiteError extends ProjectError {
  constructor(error) {
    super(error);
    this.field = 'site';
    this.step = 2;
  }
}

export class JobDetailsError extends ProjectError {
  constructor(error) {
    super(error);
    this.field = 'quantity';
    this.step = 1;
  }
}

export class ServerError extends ProjectError {
  constructor(error) {
    super(error);
    this.field = 'message';
    this.step = 4;
  }
}

export class ProjectErrorContainer extends ProjectError {
  constructor(error, errors, callback) {
    super(error);
    this.errors = errors;
    this.setPage = callback;
  }
  getError() {
    const errorField = this.errors.filter(
      (item) => item.error[item.field] !== undefined,
    )[0];
    this.setPage(errorField.step, errorField.error[errorField.field]);
  }
}
