// CallbackPage.js
"use client"
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import  { AuthContext } from "@/app/_component/Provider/authProvider"
const CallbackPage = () => {
    const router = useRouter(); //history('/home')
    const { setIsLogin ,setNickname } = useContext(AuthContext);
    useEffect(() => {
        const urlParams:any = new URLSearchParams(window.location.search);
        const code = encodeURIComponent(urlParams.get('code'));
        if (code) {
            // Send authorization code to the back end
            fetch(`${process.env.BASE_URL}/api/login/oauth2/code/google?code=${code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response body as JSON
                } else {
                    throw new Error('Failed to authenticate');
                }
            })
            .then(data => {
                // Store access token and other relevant data in local storage
                localStorage.setItem("accestoken", data.accessToken);
                localStorage.setItem("refreshtoken", data.refreshToken);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('email', data.email);
                localStorage.setItem("password", "none");
                // Redirect to main screen after successful login
                setIsLogin(true);
                setNickname(data.nickname)
                router.push(`/${data.nickname}/dashboard/home`);
        
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [router]);

    return (
        <div>
            <h1>Callback Page</h1>
            <p>Please wait while we process your request...</p>
        </div>
    );
};

export default CallbackPage;
