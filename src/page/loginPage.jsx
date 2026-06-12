import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function LoginPage() {
  // ⚠️ کلاینت آیدی گوگل خود را دقیقاً به جای متن زیر قرار دهید
  const GOOGLE_CLIENT_ID =
    "96586049605-bc12iugtc63ga92d7h5t018tr9q2pfuf.apps.googleusercontent.com";

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // برای ذخیره و نمایش خطاهای احتمالی

  const handleGoogleSuccess = async (credentialResponse) => {
    setErrorMessage(""); // پاک کردن خطاهای قبلی در هر بار تلاش
    const tokenFromGoogle = credentialResponse.credential;

    try {
      // 🌐 آدرس ورکر آنلاین و زنده شما
      const WORKER_URL = "https://workers.dev";

      // ارسال توکن گوگل به ورکر کلودفلر
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleToken: tokenFromGoogle }),
        // 🔑 این خط بسیار حیاتی است تا مرورگر اجازه دهد کوکی امن ورکر در حافظه ست شود
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        console.log("ورود موفقیت‌آمیز بود! مشخصات از فایربیس دریافت شد.");
        // ذخیره مشخصات ظاهری کاربر در State برای نمایش در سایت
        setUser(data.user);
      } else {
        // مدیریت خطایی که ورکر یا فایربیس فرستاده است (مثل نقض قانون یک ایمیل)
        console.error("خطای سرور:", data.error, data.details);
        setErrorMessage(`ورود ناموفق: ${data.details || data.error}`);
      }
    } catch (error) {
      // مدیریت خطای قطعی اینترنت یا در دسترس نبودن ورکر
      console.error("خطای شبکه:", error);
      setErrorMessage(
        "ارتباط با سرور برقرار نشد. لطفاً اینترنت خود را بررسی کنید.",
      );
    }
  };

  // اگر کاربر با موفقیت وارد شده باشد، پروفایل او را نشان بده
  if (user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img src={user.picture} alt="Profile" style={styles.avatar} />
          <h2>خوش آمدید، {user.name}!</h2>
          <p>ایمیل شما: {user.email}</p>
          <p style={styles.successBadge}>ورود امن با کوکی فعال است</p>
          <p>work insdie the men</p>
        </div>
      </div>
    );
  }

  // اگر کاربر هنوز وارد نشده باشد، فرم ورود را نشان بده
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>ورود به حساب کاربری</h2>
          <p style={styles.subtitle}>پروژه امن EchoMail</p>

          {/* نمایش پیام خطا به کاربر در صورت وجود */}
          {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

          <div style={styles.buttonWrapper}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                setErrorMessage("خطا در تایید حساب گوگل. دوباره تلاش کنید.")
              }
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

// استایل‌های ساده و راست‌چین شده برای فرانت‌آند
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f7fb",
    fontFamily: "Tahoma, sans-serif",
    direction: "rtl",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: { margin: "0 0 5px 0", color: "#333" },
  subtitle: { fontSize: "13px", color: "#888", marginBottom: "25px" },
  avatar: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    marginBottom: "15px",
    border: "3px solid #4a90e2",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  errorText: {
    color: "#d32f2f",
    backgroundColor: "#ffebee",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "13px",
    marginBottom: "15px",
    textAlign: "right",
  },
  successBadge: {
    display: "inline-block",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    marginTop: "10px",
  },
};

export default LoginPage;
