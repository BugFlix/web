"use client"
import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

// AuthContextProps 인터페이스 정의
interface AuthContextProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
}

// AuthContext 생성
export const AuthContext = createContext<AuthContextProps>({
  isLogin: false,
  setIsLogin: () => {},
  nickname: "",
  setNickname: () => {},
});

// AuthProvider 컴포넌트 Props 정의
type Props = {
  children: ReactNode;
};

// AuthProvider 컴포넌트 정의
export default function AuthProvider({ children }: Props) {
  // isLogin 상태와 setIsLogin 함수를 정의하고 초기값을 로컬 스토리지에서 가져옴
  const [isLogin, setIsLogin] = useState(() => {
    return JSON.parse(localStorage.getItem("isLogin") || "false");
  });

  // nickname 상태와 setNickname 함수를 정의하고 초기값을 로컬 스토리지에서 가져옴
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || "";
  });

  // isLogin 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  // nickname 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("nickname", nickname);
  }, [nickname]);

  // AuthContext에 제공할 값 정의
  const contextValue: AuthContextProps = {
    isLogin,
    setIsLogin,
    nickname,
    setNickname,
  };

  // AuthContext.Provider로 감싸서 자식 컴포넌트에 제공
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
