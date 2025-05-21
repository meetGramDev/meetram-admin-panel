/**
 * Проверяет, является ли ошибка объектом GraphQL-ошибки.
 */
export function isGraphQLError(error: unknown): error is { extensions?: any; message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

/**
 * Проверяет, является ли ошибка массивом GraphQL-ошибок.
 */
export function isGraphQLErrors(
  error: unknown
): error is Array<{ extensions?: any; message: string }> {
  return Array.isArray(error) && error.every(isGraphQLError)
}

/**
 * Проверяет, является ли ошибка объектом с полем `errors` (стандартный формат GraphQL-ответа).
 */
export function isGraphQLResponseError(
  error: unknown
): error is { errors: Array<{ message: string }> } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray((error as any).errors) &&
    (error as any).errors.every(isGraphQLError)
  )
}

/**
 * Проверяет, является ли ошибка объектом с полем `message` (например, сетевые ошибки).
 */
export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

/**
 * Проверяет, является ли ошибка строкой.
 */
export const isErrorMessageString = (error: unknown): error is string => typeof error === 'string'

/**
 * Проверяет, является ли ошибка массивом сообщений с полем `field` (кастомный формат ошибок).
 */
export const isErrorServerMessagesType = (
  error: unknown
): error is Array<{ field: string; message: string }> => {
  return (
    Array.isArray(error) &&
    error.every(err => typeof err === 'object' && 'field' in err && 'message' in err)
  )
}

/**
 * Проверяет, является ли ошибка объектом с полем `statusCode` (например, HTTP-ошибки).
 */
export function isServerBadResponseError(
  error: unknown
): error is { message: string; statusCode: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof (error as any).statusCode === 'number'
  )
}
