/**
 * localStorage is not safe to touch directly. In iOS Private Browsing the
 * setter throws QuotaExceededError, some enterprise/embedded browsers remove
 * the property entirely, and a few block access to it behind a SecurityError.
 * Everything here is feature-detected and wrapped, and callers are told
 * whether persistence actually worked so the UI can say so.
 */

export type StorageStatus = 'persistent' | 'memory'

let memory: Record<string, string> = {}
let probed = false
let usable = false

function probe(): boolean {
  if (probed) return usable
  probed = true
  usable = false
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false
    const key = '__io_probe__'
    window.localStorage.setItem(key, '1')
    window.localStorage.removeItem(key)
    usable = true
  } catch {
    usable = false
  }
  return usable
}

export function storageStatus(): StorageStatus {
  return probe() ? 'persistent' : 'memory'
}

export function readItem(key: string): string | null {
  if (probe()) {
    try {
      return window.localStorage.getItem(key)
    } catch {
      /* fall through to memory */
    }
  }
  return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null
}

/** Returns false if the value could only be held in memory for this session. */
export function writeItem(key: string, value: string): boolean {
  memory[key] = value
  if (probe()) {
    try {
      window.localStorage.setItem(key, value)
      return true
    } catch {
      // Quota or private-mode failure: degrade silently to the memory copy.
      usable = false
      return false
    }
  }
  return false
}

export function removeItem(key: string): void {
  delete memory[key]
  if (probe()) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* nothing useful to do */
    }
  }
}

export function clearMemoryFallback(): void {
  memory = {}
}
