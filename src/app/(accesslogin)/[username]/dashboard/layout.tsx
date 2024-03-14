"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo from "@/asset/images/logo.svg"
import Link from "next/link";
import Dashboard from "@/app/_component/Dashboard";
import ReactQueryProvider from "@/app/_component/Provider/ReactQueryProvider";
type props = {children:ReactNode}
export default function RootDashboard({ children }: props) {
    return (
      <ReactQueryProvider>
      <Dashboard>
        {children}
      </Dashboard>
      </ReactQueryProvider>
    );
  }