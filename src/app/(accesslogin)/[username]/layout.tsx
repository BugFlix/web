"use client"
import { ReactNode } from "react";
import styles from "@/app/_component/main.module.css"
import { useQueryClient } from "@tanstack/react-query";
import ReactQueryProvider from "@/app/_component/Provider/ReactQueryProvider";
import { Provider } from 'react-redux'
import store from "@/app/store/store"
type Props ={children:ReactNode, modal:ReactNode}
export default function Layout({children, modal}: Props){
    return(
        <Provider store={store}>
        <ReactQueryProvider>
        <div className={styles.container}>
            {children}
            {modal}
        </div>
        </ReactQueryProvider>
        </Provider>
    )
}