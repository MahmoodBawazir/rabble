import { useState } from 'react'

import { SERVER_URL } from '../../shared/constants'

export type Method = 'GET' | 'POST'
export type Result = {
  ok: boolean
  status: number
  result: string | object | null | boolean
}

const callApi = async (
  endpoint: string,
  method: Method,
  body?: any
): Promise<Result> => {
  const apiBaseUrl = SERVER_URL
  const requestOptions: RequestInit = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    credentials: 'include',
  }

  if (method === 'POST') {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  const request = await fetch(
    endpoint.startsWith('/') ? apiBaseUrl + endpoint : endpoint,
    // '/auth/email/signup',
    requestOptions
  )

  return {
    ok: request.ok,
    status: request.status,
    result: await request.json(),
  }
}

export type Status = 'neutral' | 'loading' | 'success' | 'error'

const useApi = () => {
  const [status, setStatus] = useState<Status>('neutral')

  const call = async (endpoint: string, method: Method, body?: any) => {
    setStatus('loading')

    const response = await callApi(endpoint, method, body)

    if (response.status === 200) {
      setStatus('success')
    } else {
      setStatus('error')
    }

    return response.result
  }

  return [status, call] as const
}

export default useApi
