import { useEffect, useRef, useState } from 'react'
import Header from '../../../Navigation/Header'
import Button from '../../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { CgCloseR } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { postRequest } from '../../../api/AuthAxios';
import { toast } from 'react-toastify';

const Banner = ({ bannerData }) => {

  const [isLoginModalShow, setIsLoginModalShow] = useState(false);
  const [isSignupModalShow, setIsSignupModalShow] = useState(false);
  const [isForgotPassModalShow, setIsForgotPassModalShow] = useState(false);
  const [isOptModalShow, setIsOptModalShow] = useState(false);
  const [isResetPassModalShow, setIsResetPassModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [otpPurpose, setOtpPurpose] = useState("");
  const inputsRef = useRef([]);
  const [loginUserName, setLoginUserName] = useState(null);
  const [isUserLogin, setIsUserLogin] = useState(false);


  const signupForm = useForm();
  const loginForm = useForm();
  const forgotForm = useForm();
  const otpForm = useForm();
  const resetForm = useForm();
  const navigate = useNavigate();

  const { lgHeading, para, btnText } = bannerData;

  const SignupOpenModalClose = () => {
    setIsSignupModalShow(true);
    setIsLoginModalShow(false);
  };

  const handleProtectedNavigation = () => {
    const token = sessionStorage.getItem("loginToken");
    if (token) {
      navigate("/score");
    } else {
      setIsLoginModalShow(true);
    }
  };

  const onSignupSubmit = async (signupData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await postRequest("/api/auth/signup", signupData);
      console.log(response);

      if (response?.status === 201) {
        toast.success(response?.data?.message);
        sessionStorage.setItem("email", response?.data?.email);
        setOtpPurpose("signup");
        signupForm?.reset();

        setTimeout(() => {
          setIsSignupModalShow(false);
          setIsOptModalShow(true);
        }, 3000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      signupForm?.reset();
      console.log("error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginSubmit = async (loginData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await postRequest("/api/auth/login", loginData);
      console.log(response);

      if (response?.status === 200) {
        toast.success(response?.data.message);
        sessionStorage.setItem("loginToken", response?.data.token);
        sessionStorage.setItem("userInfo", JSON.stringify(response?.data?.user));
        loginForm?.reset();

        const token = sessionStorage.getItem("loginToken");
        const userInformation = JSON.parse(sessionStorage.getItem("userInfo"));

        if (token && userInformation) {
          setLoginUserName(userInformation.fname);
          setIsUserLogin(true);
        }

        setTimeout(() => {
          setIsLoginModalShow(false);

          navigate("/score")
          console.log("navigate nhi hua")
        }, 2000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      loginForm?.reset();
      console.log("error: ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };


  const onForgotSubmit = async (forgotData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await postRequest(
        "/api/auth/forgot-password",
        forgotData
      );

      if (response?.status === 201) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("email", response?.data?.user?.email);
        }
        toast.success(response?.data?.message);
        setOtpPurpose("forgot_password");
        forgotForm.reset();

        setTimeout(() => {
          setIsForgotPassModalShow(false);
          setIsOptModalShow(true);
        }, 2000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassOpenLoginClose = () => {
    setIsLoginModalShow(false);
    setIsForgotPassModalShow(true);
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.target.value = "";
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const onSignupOtpSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const otp = inputsRef.current.map((input) => input?.value || "").join("");

    if (otp.length !== 6) {
      toast.error("Please enter complete OTP");
      setIsLoading(false);
      return;
    }

    try {
      const email =
        typeof window !== "undefined" ? sessionStorage.getItem("email") : null;
      const response = await postRequest("/api/auth/verify-otp-signup", {
        email,
        otp,
        purpose: "signup",
      });

      if (response?.status === 200) {
        toast.success(response.data.message);

        // Clear OTP fields
        inputsRef.current.forEach((input) => {
          if (input) input.value = "";
        });

        setTimeout(() => {
          setIsOptModalShow(false);
          setIsLoginModalShow(true);
        }, 2000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("❌ OTP Error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotOtpSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const otp = inputsRef.current.map((input) => input?.value || "").join("");

    if (otp.length !== 6) {
      toast.error("Please enter complete OTP");
      setIsLoading(false);
      return;
    }

    try {
      const email =
        typeof window !== "undefined" ? sessionStorage.getItem("email") : null;
      const response = await postRequest(
        "/api/auth/verify-otp-forgot-password",
        {
          email,
          otp,
          purpose: "forgot_password",
        }
      );

      if (response?.status === 201) {
        toast.success(response.data.message);

        // Clear OTP fields
        inputsRef.current.forEach((input) => {
          if (input) input.value = "";
        });

        setTimeout(() => {
          setIsOptModalShow(false);
          setIsResetPassModalShow(true);
        }, 2000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onResetSubmit = async (resetData) => {
    if (isLoading) return;
    setIsLoading(true);

    const { newPassword, cPassword } = resetData;

    if (newPassword !== cPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const email =
        typeof window !== "undefined" ? sessionStorage.getItem("email") : null;
      const response = await postRequest("/api/auth/reset-password", {
        email,
        newPassword,
      });

      toast.success(response?.data?.message);
      resetForm.reset();

      setTimeout(() => {
        setIsResetPassModalShow(false);
        setIsLoginModalShow(true);
      }, 2000);
    } catch (error) {
      console.log("error:", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
      if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("loginToken");
        const userInformation = sessionStorage.getItem("userInfo");
  
        if (token && userInformation) {
          try {
            const parsedUser = JSON.parse(userInformation);
            setIsUserLogin(true);
            setLoginUserName(parsedUser.fname);
          } catch (error) {
            console.error("Error parsing user info:", error);
            sessionStorage.removeItem("userInfo");
            sessionStorage.removeItem("loginToken");
          }
        }
      }
    }, []);

  return (
    <>
      <div className="lg:h-[100vh] w-full bg-[url('/assets/images/Home/top-banner-bg-img.jpg')] bg-cover p-4">
        <Header />

        <div className="container mx-auto h-[90%] flex items-center mt-[50px] lg:mt-0">
          <div className='w-[100%] mx-auto flex flex-col justify-center items-center lg:items-start lg:justify-start lg:mx-0 sm:w-[80%] lg:w-[50%] p-2'>
            <h1 className='text-4xl text-center lg:text-left lg:text-[60px] text-[var(--secondary-color)] font-[700] leading-tight'>{lgHeading}</h1>
            <p className='w-[100%] lg:w-[60%] text-center lg:text-left text-[var(--secondary-color)] text-[16px] my-5'>{para}</p>
            <Button onClick={handleProtectedNavigation} className="h-[45px] w-[80%] sm:w-[50%] lg:w-[45%] bg-[var(--green-color)] text-[var(--white-color)] rounded-full" text={btnText} />
          </div>
        </div>
      </div>


      <div className='w-full'>
        <img src="./assets/images/Home/contract-img.jpg" className='lg:h-[600px] w-[100%] object-contain lg:object-fill' alt="" />
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalShow}
        onClose={() => setIsLoginModalShow(false)}
      >
        <button
          onClick={() => setIsLoginModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors z-10"
          aria-label="Close modal"
        >
          <CgCloseR />
        </button>

        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center overflow-y-auto">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt="ITX Solution Logo"
              />
            </NavLink>

            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--black-color)] mb-4">
              Willkommen bei ITX-SOLUTION
            </h1>

            <form
              className="flex flex-col justify-start items-start w-[100%]"
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            >
              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">E-Mail</label>
                <input
                  type="email"
                  placeholder="E-Mail"
                  {...loginForm.register("email", {
                    required: "E-Mail ist erforderlich",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Ungültige E-Mail-Adresse",
                    },
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                />
                {loginForm.formState.errors.email && (
                  <span className="text-red-500 text-sm">
                    {loginForm.formState.errors.email.message}
                  </span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">Passwort</label>
                <input
                  type="password"
                  placeholder="Passwort"
                  {...loginForm.register("password", {
                    required: "Passwort ist erforderlich",
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                />
                {loginForm.formState.errors.password && (
                  <span className="text-red-500 text-sm">
                    {loginForm.formState.errors.password.message}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={forgotPassOpenLoginClose}
                className="text-[var(--secondary-color)] mb-3 hover:text-[var(--green-color)] transition-colors"
              >
                Passwort vergessen?
              </button>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-[var(--white-color)] text-xl rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Wird verarbeitet..." : "Log in"}
                </button>

                <Button
                  onClick={SignupOpenModalClose}
                  className="h-[50px] w-[100%] bg-[var(--secondary-color)] text-[var(--white-color)] text-xl rounded-lg hover:bg-opacity-90 transition-all"
                  text="Sign up"
                />
              </div>
            </form>

            <p className="text-[11px] text-center mt-4">
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von
              Pinterest zu und bestätigen, dass Sie unsere Datenschutzrichtlinie
              gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupModalShow}
        onClose={() => setIsSignupModalShow(false)}
      >
        <button
          onClick={() => setIsSignupModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors z-10"
          aria-label="Close modal"
        >
          <CgCloseR />
        </button>

        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center overflow-y-auto">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt="ITX Solution Logo"
              />
            </NavLink>

            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--black-color)] mb-4">
              Willkommen bei ITX-SOLUTION
            </h1>

            <form
              className="flex flex-col justify-start items-start w-[100%]"
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
            >
              <div className="w-[100%] flex my-3 justify-between items-center gap-4">
                <div className="flex-col w-[48%]">
                  <label className="text-xl font-[400] mb-3 block">
                    Vorname
                  </label>
                  <input
                    type="text"
                    placeholder="Vorname"
                    {...signupForm.register("fname", {
                      required: "Vorname ist erforderlich",
                    })}
                    className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                  />
                  {signupForm.formState.errors.fname && (
                    <span className="text-red-500 text-sm">
                      {signupForm.formState.errors.fname.message}
                    </span>
                  )}
                </div>

                <div className="flex-col w-[48%]">
                  <label className="text-xl font-[400] mb-3 block">
                    Nachname
                  </label>
                  <input
                    type="text"
                    placeholder="Nachname"
                    {...signupForm.register("lname", {
                      required: "Nachname ist erforderlich",
                    })}
                    className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                  />
                  {signupForm.formState.errors.lname && (
                    <span className="text-red-500 text-sm">
                      {signupForm.formState.errors.lname.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">E-Mail</label>
                <input
                  type="email"
                  placeholder="E-Mail"
                  {...signupForm.register("email", {
                    required: "E-Mail ist erforderlich",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Ungültige E-Mail-Adresse",
                    },
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                />
                {signupForm.formState.errors.email && (
                  <span className="text-red-500 text-sm">
                    {signupForm.formState.errors.email.message}
                  </span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">Passwort</label>
                <input
                  type="password"
                  placeholder="Passwort"
                  {...signupForm.register("password", {
                    required: "Passwort ist erforderlich",
                    minLength: {
                      value: 8,
                      message: "Passwort muss mindestens 8 Zeichen lang sein",
                    },
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                />
                {signupForm.formState.errors.password && (
                  <span className="text-red-500 text-sm">
                    {signupForm.formState.errors.password.message}
                  </span>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-[var(--white-color)] text-xl rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Wird verarbeitet..." : "Weitermachen"}
                </button>
              </div>
            </form>

            <p className="text-[11px] text-center mt-4">
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von
              Pinterest zu und bestätigen, dass Sie unsere Datenschutzrichtlinie
              gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotPassModalShow}
        onClose={() => setIsForgotPassModalShow(false)}
      >
        <button
          onClick={() => setIsForgotPassModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors z-10"
          aria-label="Close modal"
        >
          <CgCloseR />
        </button>

        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center overflow-y-auto">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt="ITX Solution Logo"
              />
            </NavLink>

            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--black-color)] mb-4">
              Passwort zurücksetzen!
            </h1>

            <form
              className="flex flex-col justify-start items-start w-[100%]"
              onSubmit={forgotForm.handleSubmit(onForgotSubmit)}
            >
              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">E-Mail</label>
                <input
                  type="email"
                  placeholder="E-Mail"
                  {...forgotForm.register("email", {
                    required: "E-Mail ist erforderlich",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Ungültige E-Mail-Adresse",
                    },
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                />
                {forgotForm.formState.errors.email && (
                  <span className="text-red-500 text-sm">
                    {forgotForm.formState.errors.email.message}
                  </span>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-center text-[var(--white-color)] text-xl rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Wird verarbeitet..." : "Weitermachen"}
                </button>
              </div>
            </form>

            <p className="text-[11px] text-center mt-4">
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von
              Pinterest zu und bestätigen, dass Sie unsere Datenschutzrichtlinie
              gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* OTP Modal */}
      <Modal isOpen={isOptModalShow} onClose={() => setIsOptModalShow(false)}>
        <button
          onClick={() => setIsOptModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors z-50"
          aria-label="Close modal"
        >
          <CgCloseR />
        </button>

        <div className="w-full h-full px-4 sm:px-6 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center overflow-y-auto">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto py-3 flex flex-col items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[60px] sm:h-[70px] w-[100px] sm:w-[120px] object-contain"
                alt="ITX Solution Logo"
              />
            </NavLink>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black-color)] mb-4 text-center">
              OTP-Verifizierung
            </h1>

            <p className="mb-6 text-sm sm:text-[13px] text-center">
              Ein OTP-Code wurde an {isEmail} gesendet.
            </p>

            <form
              className="flex flex-col items-center w-full"
              onSubmit={
                otpPurpose === "signup"
                  ? otpForm.handleSubmit(onSignupOtpSubmit)
                  : otpForm.handleSubmit(onForgotOtpSubmit)
              }
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mb-6">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-[45px] sm:w-[50px] md:w-[60px] h-[45px] sm:h-[50px] md:h-[60px] text-center text-xl border-2 border-black rounded-lg focus:border-[var(--green-color)] transition-colors outline-none"
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="h-[50px] w-[70%] bg-[var(--green-color)] text-white text-base sm:text-lg rounded-lg cursor-pointer hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Wird verarbeitet..." : "Verifizieren"}
              </button>
            </form>

            <p className="text-[11px] text-center mt-4 px-2">
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von
              Pinterest zu und bestätigen, dass Sie unsere Datenschutzrichtlinie
              gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={isResetPassModalShow}
        onClose={() => setIsResetPassModalShow(false)}
      >
        <button
          onClick={() => setIsResetPassModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors z-10"
          aria-label="Close modal"
        >
          <CgCloseR />
        </button>

        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center overflow-y-auto">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt="ITX Solution Logo"
              />
            </NavLink>

            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--black-color)] mb-4">
              Passwort aktualisieren
            </h1>

            <form
              className="flex flex-col justify-start items-start w-[100%]"
              onSubmit={resetForm.handleSubmit(onResetSubmit)}
            >
              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">
                  Neues Passwort
                </label>
                <input
                  type="password"
                  placeholder="Neues Passwort"
                  {...resetForm.register("newPassword", {
                    required: "Neues Passwort ist erforderlich",
                    minLength: {
                      value: 8,
                      message: "Passwort muss mindestens 8 Zeichen lang sein",
                    },
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none text-black focus:border-[var(--green-color)] transition-colors"
                />
                {resetForm.formState.errors.newPassword && (
                  <span className="text-red-500 text-sm">
                    {resetForm.formState.errors.newPassword.message}
                  </span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">
                  Passwort bestätigen
                </label>
                <input
                  type="password"
                  placeholder="Passwort bestätigen"
                  {...resetForm.register("cPassword", {
                    required: "Passwort bestätigen ist erforderlich",
                  })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none text-black focus:border-[var(--green-color)] transition-colors"
                />
                {resetForm.formState.errors.cPassword && (
                  <span className="text-red-500 text-sm">
                    {resetForm.formState.errors.cPassword.message}
                  </span>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-center text-[var(--white-color)] text-xl rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Wird verarbeitet..." : "Weitermachen"}
                </button>
              </div>
            </form>

            <p className="text-[11px] text-center mt-4">
              Indem Sie fortfahren, stimmen Sie den Nutzungsbedingungen von
              Pinterest zu und bestätigen, dass Sie unsere Datenschutzrichtlinie
              gelesen haben. Hinweis bei der Erfassung.
            </p>
          </div>
        </div>
      </Modal>

    </>
  )
}

export default Banner