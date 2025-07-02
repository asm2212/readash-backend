export class CustomAPIError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errors?: unknown[],
  ) {
    super(message)
    Object.setPrototypeOf(this, CustomAPIError.prototype)
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(message: string = 'Bad Request', errors?: any[]) {
    super(message, 400, errors)
  }
}

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}
