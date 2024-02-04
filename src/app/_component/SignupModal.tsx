"use client";

import style from './signup.module.css';
import {useRouter} from "next/navigation";
import {ChangeEventHandler, FormEventHandler, useState} from "react";

export default function SignupModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber]=useState('');
  const [birthDate,setBirthDate]=useState('');

  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => { setEmail(e.target.value) };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => { setPassword(e.target.value) };
  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => { setNickname(e.target.value) };
  const onChangePhone: ChangeEventHandler<HTMLInputElement> = (e)=>{setPhoneNumber(e.target.value)}
  const onChangeBirth: ChangeEventHandler<HTMLInputElement> = (e)=>{setBirthDate(e.target.value)}
  


  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log([email,password,nickname,phoneNumber,birthDate])
    fetch('http://localhost:9090/api/users', {
      method: 'post',
      body: JSON.stringify({
        email:email,
        password:password,
        phoneNumber:phoneNumber,
        nickname:nickname,
        birthDate:birthDate
      }),
      credentials: 'include',
    }).then((response: Response) => {
      console.log(response.status);
      if (response.status === 200) {
        router.replace('/home');
      }
    }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <button className={style.closeButton} onClick={onClickClose}>
              <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                   className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                <g>
                  <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </button>
            <div>계정을 생성하세요.</div>
          </div>
          <form>
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="email">이메일</label>
                <input id="email" className={style.input} type="text" placeholder=""
                       value={email}
                       onChange={onChangeEmail}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">비밀번호</label>
                <input id="password" className={style.input} type="password" placeholder=""
                       value={password}
                       onChange={onChangePassword}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">닉네임</label>
                <input id="name" className={style.input} type="text" placeholder=""
                       value={nickname}
                       onChange={onChangeNickname}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="phoneNumber">전화번호</label>
                <input id="phoneNumber" className={style.input} type="text" placeholder=""
                       value={phoneNumber}
                       onChange={onChangePhone}
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="birthDate">생년월일</label>
                <input id="birthDate" className={style.input} type="text" placeholder=""
                       value={birthDate}
                       onChange={onChangeBirth}
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button className={style.actionButton} onClick={onSubmit} disabled={!email && !password}>가입하기</button>
            </div>
          </form>
        </div>
      </div>
    </>)
}