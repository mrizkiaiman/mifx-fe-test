import { NextRouter } from 'next/router'
import React, { Ref } from 'react'
import type { ReactNode } from 'react'

export interface WithChildren {
  children: React.ReactNode
}
export type APIResponse<T = any> = Array<T>
