export const DEFAULT_VALUE = {
  ARRAY: '[]',
  OBJECT: '{}',
  STRING: '',
}

interface ILocalStorageFactoryParams<T> {
  key: string
  defaultValue: string
  raw?: boolean
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

interface ILocalStorageFactoryReturn<T> {
  setItem: (value: T) => void
  getItem: () => T
  removeItem: () => void
}

// * 封装性
export const localStorageFactory = <T>(params: ILocalStorageFactoryParams<T>): ILocalStorageFactoryReturn<T> => {
  const { key, defaultValue, raw, serializer = JSON.stringify, deserializer = JSON.parse } = params

  const setItem = (value: T) => {
    const data = (raw ? value : serializer(value)) as string
    window.localStorage.setItem(key, data || defaultValue)
  }

  const getItem = () => {
    // 获取本地存储, 如果没有就是 default, default 是 "ARRAY" | "OBJECT" | "STRING"
    const data = window.localStorage.getItem(key) || defaultValue
    // 默认 raw = false, 即去解析 parse
    return raw ? data : deserializer(data)
  }

  const removeItem = () => window.localStorage.removeItem(key)

  return {
    setItem,
    getItem,
    removeItem,
  }
}
