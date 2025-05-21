export * from './models.gen'

export type ServerMessagesType = {
  field: string
  message: string
}

export type ServerBadResponse = {
  error: string
  messages: ServerMessagesType[] | any[] | string
  statusCode: number
}
