class AssertError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'AssertError'
  }
}

export function assert(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new AssertError(message)
  }
}

export function assertString(value: any, message?: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new AssertError(message)
  }
}

export function assertNumber(value: any, message?: string): asserts value is number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new AssertError(message)
  }
}

export function assertArray<T>(value: any, message?: string): asserts value is T[] {
  if (!Array.isArray(value)) {
    throw new AssertError(message)
  }
}
