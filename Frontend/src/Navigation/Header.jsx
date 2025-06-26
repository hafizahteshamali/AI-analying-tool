import { NavLink, useLocation } from "react-router-dom";
import {
  loginUserOptions,
  NavigationData,
  PlansData,
} from "../assets/constantData";
import { IoMenu } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { CgCloseR } from "react-icons/cg";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegCircleUser } from "react-icons/fa6";
import Plans from "../components/Plans";
import Modal from "../components/Modal";
import { postRequest } from "../api/AuthAxios";

const Header = () => {
  const [isModal, setIsModal] = useState(false);
  const [isLoginModalShow, setIsLoginModalShow] = useState(false);
  const [isSignupModalShow, setIsSignupModalShow] = useState(false);
  const [isForgotPassModalShow, setIsForgotPassModalShow] = useState(false);
  const [isResetPassModalShow, setIsResetPassModalShow] = useState(false);
  const [isOptModalShow, setIsOptModalShow] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const inputsRef = useRef([]);
  const [otpPurpose, setOtpPurpose] = useState(""); // "signup" ya "forgot"
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isLoginPersonOpenShow, setIsLoginPersonOpenShow] = useState(false);
  const [loginUserName, setLoginUserName] = useState(null);
  const [isPremiumModal, setIsPremiumModal] = useState(false);
  const location = useLocation();

  const loginOpenModalClose = () => {
    setIsModal(false);
    setIsLoginModalShow(true);
  };

  const SignupOpenModalClose = () => {
    setIsModal(false);
    setIsSignupModalShow(true);
    setIsLoginModalShow(false);
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

  // Separate useForm instances for each form
  const signupForm = useForm();
  const loginForm = useForm();
  const forgotForm = useForm();
  const resetForm = useForm();
  const otpForm = useForm();

  const onSignupSubmit = async (signupData) => {
    try {
      const response = await postRequest("/api/auth/signup", signupData);
      toast.success(response?.data?.message);
      // sessionStorage.setItem("email", response?.data.user?.email);
      setOtpPurpose("signup");
      signupForm.reset();
      setTimeout(() => {
        setIsSignupModalShow(false);
        setIsOptModalShow(true);
      }, 3000);
    } catch (error) {
      signupForm.reset();
      console.log("error:", error);
    }
  };

  const onLoginSubmit = async (loginData) => {
    try {
      const response = await postRequest("/api/auth/login", loginData);
      console.log(response);
      toast.success(response?.data.message);
      sessionStorage.setItem("loginToken", response?.data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(response?.data?.user));
      loginForm.reset();

      const token = sessionStorage.getItem("loginToken");
      const userInformation = JSON.parse(sessionStorage.getItem("userInfo"));
      if (token && userInformation) {
        setLoginUserName(userInformation.fname);
        setIsUserLogin(true);
      }
      setTimeout(() => {
        setIsLoginModalShow(false);
      }, 2000);
    } catch (error) {
      loginForm.reset();
      console.log("error: ", error);
    }
  };

  const onForgotSubmit = async (forgotData) => {
    try {
      const response = await postRequest(
        "/api/auth/forgot-password",
        forgotData
      );
      // ✅ Success condition lagayi gayi hai
      if (response?.status === 201) {
        sessionStorage.setItem("email", response?.data?.user?.email);
      toast.success(response?.data?.message);
      setOtpPurpose("forgot_password");
      forgotForm.reset();
      setTimeout(() => {
        setIsForgotPassModalShow(false);
        setIsOptModalShow(true);
      }, 3000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onSignupOtpSubmit = async () => {
    const otp = inputsRef.current.map((input) => input?.value).join("");

    try {
      const email = sessionStorage.getItem("email");

      const response = await postRequest("/api/auth/verify-otp-signup", {
        email,
        otp,
        purpose: "signup",
      });

      console.log(response);

      // ✅ Success condition lagayi gayi hai
      if (response?.status === 200) {
        toast.success(response.data.message);

        // ✅ OTP fields clear karo
        inputsRef.current.forEach((input) => {
          if (input) input.value = "";
        });

        // ✅ Modal close & open karo
        setTimeout(() => {
          setIsOptModalShow(false);
          setIsLoginModalShow(true);
        }, 3000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("❌ OTP Error:", error);
      toast.error("Something went wrong during OTP verification.");
    }
  };

  const onForgotOtpSubmit = async () => {
    const otp = inputsRef.current.map((input) => input?.value).join("");
    try {
      const email = sessionStorage.getItem("email");
      const response = await postRequest(
        "/api/auth/verify-otp-forgot-password",
        {
          email,
          otp,
          purpose: "forgot_password",
        }
      );
      // ✅ Success condition lagayi gayi hai
      if (response?.status === 201) {
        toast.success(response.data.message);

        // ✅ OTP fields clear karo
        inputsRef.current.forEach((input) => {
          if (input) input.value = "";
        });

        // ✅ Modal close & open karo
        setTimeout(() => {
          setIsOptModalShow(false);
          setIsResetPassModalShow(true);
        }, 3000);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onResetSubmit = async (resetData) => {
    const { newPassword, cPassword } = resetData;

    // ✅ Check if passwords match
    if (newPassword !== cPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const email = sessionStorage.getItem("email");
      const response = await postRequest("/api/auth/reset-password", {
        email,
        newPassword,
      });

      toast.success(response?.data?.message);
      resetForm.reset();
      // Optionally redirect or show login modal
      setTimeout(() => {
        setIsResetPassModalShow(false);
        setIsLoginModalShow(true);
      }, 3000);
    } catch (error) {
      console.log("error:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  const Logout = () => {
    sessionStorage.removeItem("loginToken");
    toast.success("logout successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, [1500]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const email = sessionStorage.getItem("email");
      if (email) {
        const [prefix, domain] = email.split("@");

        const last4 = prefix.slice(-4); // last 4 characters
        const masked = "*".repeat(Math.max(prefix.length - 4, 0));

        const finalEmail = `${masked}${last4}@${domain}`;
        setIsEmail(finalEmail);

        clearInterval(interval); // stop polling after email is set
      }
    }, 100); // every 100ms

    return () => clearInterval(interval);
  }, [isOptModalShow]);

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    const userInformation = JSON.parse(sessionStorage.getItem("userInfo"));
    if (token && userInformation) {
      setIsUserLogin(true);
      setLoginUserName(userInformation.fname);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setTimeout(() => {
        setIsPremiumModal(true);
      }, [1500]);
    }
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <div className="w-[100%] bg-[#E5E7EB] rounded-lg px-5 py-2 flex justify-between items-center">
          <NavLink to="/">
            <img
              src="/assets/images/Home/LOGO.png"
              className="h-[70px] w-[120px] p-1 object-contain"
              alt=""
            />
          </NavLink>

          <ul className="hidden lg:flex justify-center items-center gap-5">
            {NavigationData.map((nav, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className="text-[var(--secondary-color)] font-[500]"
                    to={nav.url}
                  >
                    {nav.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex gap-3.5 items-center relative">
            {isUserLogin ? (
              <div className="order-2">
                <FaRegCircleUser
                  onClick={() =>
                    setIsLoginPersonOpenShow(!isLoginPersonOpenShow)
                  }
                  className="text-4xl cursor-pointer text-[var(--secondary-color)]"
                />
              </div>
            ) : (
              <div className="hidden lg:flex justify-center items-center gap-4 order-2">
                <NavLink
                  onClick={() => setIsLoginModalShow(true)}
                  className="border border-[var(--green-color)] h-[45px] text-[var(--white-color)] xl:w-[140px] lg:w-[100px] bg-[var(--green-color)] flex justify-center items-center rounded-full"
                >
                  Log in
                </NavLink>
                <NavLink
                  onClick={() => setIsSignupModalShow(true)}
                  className="border border-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold h-[45px] xl:w-[140px] lg:w-[100px] flex justify-center items-center rounded-full"
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            <IoMenu
              onClick={() => setIsModal(true)}
              className="text-3xl text-[var(--secondary-color)] lg:hidden order-1"
            />

            {isLoginPersonOpenShow && (
              <div className="w-[300px] bg-[#E5E7EB] absolute top-12 z-20 -left-[200px] lg:-left-[245px] rounded-b-lg flex justify-center items-center">
                <div className="h-[400px] w-[90%] mx-auto">
                  <div className="h-[60px] w-[60px] bg-[var(--primary-color)] rounded-full mx-auto flex justify-center items-center">
                    <h3 className="text-3xl text-[var(--secondary-color)] font-semibold">
                      {loginUserName.slice(0, 1)}
                    </h3>
                  </div>
                  <p className="text-xl text-center my-4 font-semibold text-[var(--secondary-color)]">
                    Hello, {loginUserName}!
                  </p>
                  <NavLink
                    className="flex justify-center border-2 border-[#14B8A6] w-[100%] mx-auto p-2 rounded-full font-[400]"
                    to="/"
                  >
                    Verwalten Sie Ihr Konto
                  </NavLink>

                  <ul className="flex flex-col gap-7 my-10">
                    <>
                      {loginUserOptions.map((adminOp, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => setIsLoginPersonOpenShow(false)}
                          >
                            <NavLink
                              className="text-xl flex text-[var(--secondary-color)] font-[500]"
                              to={adminOp.path}
                            >
                              {adminOp.text}
                            </NavLink>
                          </li>
                        );
                      })}

                      <li>
                        <NavLink
                          onClick={Logout}
                          className="text-xl text-[var(--secondary-color)] font-[500]"
                          to=""
                        >
                          Abmelden
                        </NavLink>
                      </li>
                    </>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          isModal
            ? "h-[100vh] w-[100%] sm:w-[70%] md:w-[50%] p-3 bg-[var(--primary-color)] flex flex-col justify-center items-center gap-6 fixed z-40 top-0 right-0 bottom-0 transform translate-x-[0%] transition-all duration-500"
            : "h-[100vh] w-[100%] bg-[var(--primary-color)] flex flex-col p-3 justify-center items-center gap-6 backdrop:blur-2xl fixed z-40 top-0 right-0 bottom-0 transform translate-x-[100%] transition-all duration-500"
        }
      >
        <CgCloseR
          onClick={() => setIsModal(false)}
          className="text-3xl absolute top-10 right-10 text-[var(--secondary-color)]"
        />

        <ul className="flex flex-col justify-center mx-0 items-start gap-5">
          {NavigationData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  className="text-[var(--secondary-color)] text-xl font-[500]"
                  to={item.url}
                >
                  {item.text}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {!isUserLogin && (
          <div className="flex flex-col justify-center w-[100%] items-center gap-4">
            <NavLink
              onClick={loginOpenModalClose}
              className="border border-[var(--green-color)] h-[45px] text-[var(--white-color)] w-[60%] bg-[var(--green-color)] flex justify-center items-center rounded-full"
            >
              Log in
            </NavLink>
            <NavLink
              onClick={SignupOpenModalClose}
              className="border border-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold h-[45px] w-[60%] flex justify-center items-center rounded-full"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>

      <Modal
        isOpen={isSignupModalShow}
        onClose={() => setIsSignupModalShow(false)}
      >
        <CgCloseR
          onClick={() => setIsSignupModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)]"
        />
        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt=""
              />
            </NavLink>

            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[var(--black-color)] mb-4">
              Willkommen bei ITX-SOLUTION
            </h1>

            <form
              className="flex flex-col justify-start items-start w-[100%]"
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
            >
              <div className="w-[100%] flex my-3 justify-between items-center">
                <div className="flex-col w-[48%]">
                  <label className="text-xl font-[400] mb-3">Vorname</label>
                  <input
                    type="text"
                    placeholder="Vorname"
                    {...signupForm.register("fname", { required: true })}
                    className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                  />
                  {signupForm.formState.errors.fname && (
                    <span>This field is required</span>
                  )}
                </div>

                <div className="flex-col w-[48%]">
                  <label className="text-xl font-[400] mb-3">Nachname</label>
                  <input
                    type="text"
                    placeholder="Nachname"
                    {...signupForm.register("lname", { required: true })}
                    className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                  />
                  {signupForm.formState.errors.lname && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">E-Mail</label>
                <input
                  type="email"
                  placeholder="E-Mail"
                  {...signupForm.register("email", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                />
                {signupForm.formState.errors.email && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">Passwort</label>
                <input
                  type="password"
                  placeholder="Passwort"
                  min={8}
                  {...signupForm.register("password", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                />
                {signupForm.formState.errors.password && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <input
                  type="submit"
                  value="Weitermachen"
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-[var(--white-color)] text-xl rounded-lg"
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

      <Modal
        isOpen={isLoginModalShow}
        onClose={() => setIsLoginModalShow(false)}
      >
        <CgCloseR
          onClick={() => setIsLoginModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)]"
        />
        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt=""
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
                  {...loginForm.register("email", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                />
                {loginForm.formState.errors.email && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">Passwort</label>
                <input
                  type="password"
                  placeholder="Passwort"
                  {...loginForm.register("password", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                />
                {loginForm.formState.errors.password && (
                  <span>This field is required</span>
                )}
              </div>

              <NavLink
                onClick={forgotPassOpenLoginClose}
                className="text-[var(--secondary-color)] mb-3"
              >
                Passwort vergessen?
              </NavLink>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <input
                  type="submit"
                  value="Log in"
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-[var(--white-color)] text-xl rounded-lg"
                />
                <Button
                  onClick={SignupOpenModalClose}
                  className="h-[50px] w-[100%] bg-[var(--secondary-color)] text-[var(--white-color)] text-xl rounded-lg"
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

      <Modal
        isOpen={isForgotPassModalShow}
        onClose={() => setIsForgotPassModalShow(false)}
      >
        <CgCloseR
          onClick={() => setIsForgotPassModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)]"
        />
        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt=""
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
                  {...forgotForm.register("email", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none"
                />
                {forgotForm.formState.errors.email && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <input
                  type="submit"
                  value="Weitermachen"
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-center text-[var(--white-color)] text-xl rounded-lg"
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

      <Modal
        isOpen={isResetPassModalShow}
        onClose={() => setIsResetPassModalShow(false)}
      >
        <CgCloseR
          onClick={() => setIsResetPassModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)]"
        />
        <div className="h-[100%] w-[100%] px-5 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center">
          <div className="w-[100%] lg:w-[45%] mx-auto py-3 flex flex-col justify-start items-center">
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[70px] w-[120px] p-1 object-contain"
                alt=""
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
                  {...resetForm.register("newPassword", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none text-black"
                />
                {resetForm.formState.errors.newPassword && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">
                  Passwort bestätigen
                </label>
                <input
                  type="password"
                  placeholder="Passwort bestätigen"
                  {...resetForm.register("cPassword", { required: true })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none text-black"
                />
                {resetForm.formState.errors.cPassword && (
                  <span>This field is required</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col justify-center items-center gap-4">
                <input
                  type="submit"
                  value="Weitermachen"
                  className="h-[50px] w-[100%] bg-[var(--green-color)] text-center text-[var(--white-color)] text-xl rounded-lg"
                />
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

      <Modal isOpen={isOptModalShow} onClose={() => setIsOptModalShow(false)}>
        {/* Close Button */}
        <CgCloseR
          onClick={() => setIsOptModalShow(false)}
          className="text-3xl absolute top-5 right-5 cursor-pointer text-[var(--secondary-color)] z-50"
        />

        {/* Modal Content */}
        <div className="w-full h-full px-4 sm:px-6 py-6 bg-[var(--white-color)] rounded-lg flex justify-center items-center overflow-y-auto">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto py-3 flex flex-col items-center">
            {/* Logo */}
            <NavLink to="/">
              <img
                src="./assets/images/Home/LOGO.png"
                className="h-[60px] sm:h-[70px] w-[100px] sm:w-[120px] object-contain"
                alt="Logo"
              />
            </NavLink>

            {/* Title */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black-color)] mb-4 text-center">
              OTP-Verifizierung
            </h1>

            {/* Info Text */}
            <p className="mb-6 text-sm sm:text-[13px] text-center">
              Ein OTP-Code wurde an *******{isEmail} gesendet.
            </p>

            {/* Form */}
            <form
              className="flex flex-col items-center w-full"
              onSubmit={
                otpPurpose === "signup"
                  ? otpForm.handleSubmit(onSignupOtpSubmit)
                  : otpForm.handleSubmit(onForgotOtpSubmit)
              }
            >
              {/* OTP Inputs */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full mb-6">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-[45px] sm:w-[50px] md:w-[60px] h-[45px] sm:h-[50px] md:h-[60px] text-center text-xl border-2 border-black rounded-lg"
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <input
                type="submit"
                value="Verifizieren"
                className="h-[50px] w-[70%] bg-[var(--green-color)] text-white text-base sm:text-lg rounded-lg cursor-pointer hover:opacity-90 transition"
              />
            </form>

            {/* Disclaimer */}
            <p className="text-[11px] text-center mt-4 px-2">
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von
              Pinterest zu und bestätigen, dass Sie unsere Datenschutzrichtlinie
              gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPremiumModal} onClose={() => setIsPremiumModal(false)}>
        <CgCloseR
          onClick={() => setIsPremiumModal(false)}
          className="text-3xl absolute top-3 right-3 cursor-pointer text-[var(--secondary-color)]"
        />

        <div className="w-full px-5 py-6 bg-[var(--white-color)] rounded-lg flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl lg:text-5xl text-[var(--secondary-color)] font-[500]">
              Flexible <span className="text-[var(--black-color)]">Pläne</span>
            </h1>
            <p className="lg:w-[80%] mx-auto text-center my-2">
              Wählen Sie einen Plan, der für Sie und Ihr Team am besten geeignet
              ist.
            </p>
          </div>

          <div className="w-full flex flex-wrap justify-center items-center gap-7 md:gap-4 lg:gap-7">
            {PlansData.map((item, index) => {
              return <Plans key={index} data={item} />;
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
