import { DEFAULT_VALUE, localStorageFactory } from "./localStorageFactory";
import { ILoginRequest } from "../apis/types/auth";

const KEY = "__session";

export const sessionLocalStorage = localStorageFactory<ILoginRequest>({
  key: KEY,
  defaultValue: DEFAULT_VALUE.OBJECT,
});
