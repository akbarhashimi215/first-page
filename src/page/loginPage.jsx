import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  const GOOGLE_CLIENT_ID =
    "96586049605-bc12iugtc63ga92d7h5t018tr9q2pfuf.apps.googleusercontent.com";

  // تابع موفقیت‌آمیز بودن ورود با گوگل
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("ورود با گوگل موفقیت‌آمیز بود!");
    console.log("توکن کاربر (JWT):", credentialResponse.credential);
  };

  // تابع خطای گوگل
  const handleGoogleError = () => {
    console.log("خطا در ورود با گوگل. لطفا دوباره تلاش کنید.");
  };

  return (
    // دور کل صفحه لاگین باید پروايدر گوگل قرار بگیرد
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="work">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="filled_blue" // تغییر تم دکمه به آبی (یا outline)
          shape="rectangular"
          text="signin_with" // متن روی دکمه
          width="300px"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;
