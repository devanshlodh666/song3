"use client"
import { Provider } from "react-redux";
import { store } from "./store";
import { SessionProvider } from "next-auth/react";
export function Providers({children}) {
    return(
        <Provider store={store}>
            <SessionProvider>
              {children}
            </SessionProvider>
        </Provider>
    )
}
