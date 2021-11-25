import { renderHook } from '@testing-library/react-hooks'
import * as React from 'react'

import { usePublicApi } from './usePublicApi'

test('usePublicApi should work with default url', () => {
  const { result } = renderHook(() => usePublicApi())
  expect(result.error).toBe(undefined)
})

test('usePublicApi should work with custom url', () => {
  const { result } = renderHook(() => usePublicApi('http://localhost:1234'))
  expect(result.error).toBe(undefined)
})
