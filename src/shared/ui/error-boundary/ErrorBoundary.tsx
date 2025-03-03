'use client'
import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error: ', error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
