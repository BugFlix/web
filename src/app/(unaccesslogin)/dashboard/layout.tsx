"use client"
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css"
import Image from "next/image";
import Logo from "@/asset/images/logo.svg"
import Link from "next/link";
import Dashboard from "@/app/_component/Dashboard";
type props = {children:ReactNode}
export default function RootDashboard({ children }: props) {
    return (
      <Dashboard>
        {children}
      </Dashboard>
    );
  }