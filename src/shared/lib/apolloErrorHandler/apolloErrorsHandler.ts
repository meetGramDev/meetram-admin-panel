import {
  isErrorMessageString,
  isErrorServerMessagesType,
  isErrorWithMessage,
  isGraphQLResponseError,
  isServerBadResponseError,
} from '@/src/shared/types'

export function apolloErrorsHandler(error: unknown): string {
  if (isGraphQLResponseError(error)) {
    return error.errors.map(err => err.message).join(', ')
  }

  if (isErrorWithMessage(error)) {
    return error.message
  }

  if (isErrorMessageString(error)) {
    return error
  }

  if (isErrorServerMessagesType(error)) {
    return error.map(err => `${err.field}: ${err.message}`).join(', ')
  }

  if (isServerBadResponseError(error)) {
    return `Error ${error.statusCode}: ${error.message}`
  }

  return `o_O`
}
