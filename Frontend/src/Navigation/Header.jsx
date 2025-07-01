
import { NavLink } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom"
import { IoMenu } from "react-icons/io5"
import { useEffect, useRef, useState } from "react"
import { CgCloseR } from "react-icons/cg"
import Button from "../components/Button"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { FaRegCircleUser } from "react-icons/fa6"
import Plans from "../components/Plans"
import Modal from "../components/Modal"
import { postRequest } from "../api/AuthAxios"
import { loginUserOptions, NavigationData, PlansData } from "../assets/constantData"

const Header = () => {
  const [isModal, setIsModal] = useState(false)
  const [isLoginModalShow, setIsLoginModalShow] = useState(false)
  const [isSignupModalShow, setIsSignupModalShow] = useState(false)
  const [isForgotPassModalShow, setIsForgotPassModalShow] = useState(false)
  const [isResetPassModalShow, setIsResetPassModalShow] = useState(false)
  const [isOptModalShow, setIsOptModalShow] = useState(false)
  const [isEmail, setIsEmail] = useState("")
  const inputsRef = useRef([])
  const [otpPurpose, setOtpPurpose] = useState("")
  const [isUserLogin, setIsUserLogin] = useState(false)
  const [isLoginPersonOpenShow, setIsLoginPersonOpenShow] = useState(false)
  const [loginUserName, setLoginUserName] = useState(null)
  const [isPremiumModal, setIsPremiumModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const pathname = useLocation().pathname;
  const navigate = useNavigate()

  // Separate useForm instances for each form
  const signupForm = useForm()
  const loginForm = useForm()
  const forgotForm = useForm()
  const resetForm = useForm()
  const otpForm = useForm()

  const loginOpenModalClose = () => {
    setIsModal(false)
    setIsLoginModalShow(true)
  }

  const SignupOpenModalClose = () => {
    setIsModal(false)
    setIsSignupModalShow(true)
    setIsLoginModalShow(false)
  }

  const forgotPassOpenLoginClose = () => {
    setIsLoginModalShow(false)
    setIsForgotPassModalShow(true)
  }

  const handleChange = (e, index) => {
    const value = e.target.value
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.target.value = ""
      if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const onSignupSubmit = async (signupData) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await postRequest("/api/auth/signup", signupData)
      console.log(response)
      toast.success(response?.data?.message || "Signup successful!")

      if (typeof window !== "undefined") {
        sessionStorage.setItem("email", response?.data?.email)
      }

      setOtpPurpose("signup")
      signupForm.reset()

      setTimeout(() => {
        setIsSignupModalShow(false)
        setIsOptModalShow(true)
      }, 2000)
    } catch (error) {
      signupForm.reset()
      console.log("error:", error)
      toast.error(error?.response?.data?.message || "Signup failed!")
    } finally {
      setIsLoading(false)
    }
  }

  const onLoginSubmit = async (loginData) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await postRequest("/api/auth/login", loginData)
      console.log(response)
      toast.success(response?.data?.message)

      if (typeof window !== "undefined") {
        sessionStorage.setItem("loginToken", response?.data.token)
        sessionStorage.setItem("userInfo", JSON.stringify(response?.data?.user))
      }

      loginForm.reset()

      const token = typeof window !== "undefined" ? sessionStorage.getItem("loginToken") : null
      const userInformation =
        typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("userInfo") || "{}") : {}

      if (token && userInformation) {
        setLoginUserName(userInformation.fname)
        setIsUserLogin(true)
      }

      setTimeout(() => {
        setIsLoginModalShow(false)
      }, 2000)
    } catch (error) {
      loginForm.reset()
      console.log("error: ", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onForgotSubmit = async (forgotData) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await postRequest("/api/auth/forgot-password", forgotData)

      if (response?.status === 201) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("email", response?.data?.user?.email)
        }
        toast.success(response?.data?.message)
        setOtpPurpose("forgot_password")
        forgotForm.reset()

        setTimeout(() => {
          setIsForgotPassModalShow(false)
          setIsOptModalShow(true)
        }, 2000)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.log("error: ", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onSignupOtpSubmit = async () => {
    if (isLoading) return
    setIsLoading(true)

    const otp = inputsRef.current.map((input) => input?.value || "").join("")

    if (otp.length !== 6) {
      toast.error("Please enter complete OTP")
      setIsLoading(false)
      return
    }

    try {
      const email = typeof window !== "undefined" ? sessionStorage.getItem("email") : null
      const response = await postRequest("/api/auth/verify-otp-signup", {
        email,
        otp,
        purpose: "signup",
      })

      if (response?.status === 200) {
        toast.success(response.data.message)

        // Clear OTP fields
        inputsRef.current.forEach((input) => {
          if (input) input.value = ""
        })

        setTimeout(() => {
          setIsOptModalShow(false)
          setIsLoginModalShow(true)
        }, 2000)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.log("❌ OTP Error:", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onForgotOtpSubmit = async () => {
    if (isLoading) return
    setIsLoading(true)

    const otp = inputsRef.current.map((input) => input?.value || "").join("")

    if (otp.length !== 6) {
      toast.error("Please enter complete OTP")
      setIsLoading(false)
      return
    }

    try {
      const email = typeof window !== "undefined" ? sessionStorage.getItem("email") : null
      const response = await postRequest("/api/auth/verify-otp-forgot-password", {
        email,
        otp,
        purpose: "forgot_password",
      })

      if (response?.status === 201) {
        toast.success(response.data.message)

        // Clear OTP fields
        inputsRef.current.forEach((input) => {
          if (input) input.value = ""
        })

        setTimeout(() => {
          setIsOptModalShow(false)
          setIsResetPassModalShow(true)
        }, 2000)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.log("error", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onResetSubmit = async (resetData) => {
    if (isLoading) return
    setIsLoading(true)

    const { newPassword, cPassword } = resetData

    if (newPassword !== cPassword) {
      toast.error("Passwords do not match.")
      setIsLoading(false)
      return
    }

    try {
      const email = typeof window !== "undefined" ? sessionStorage.getItem("email") : null
      const response = await postRequest("/api/auth/reset-password", {
        email,
        newPassword,
      })

      toast.success(response?.data?.message)
      resetForm.reset()

      setTimeout(() => {
        setIsResetPassModalShow(false)
        setIsLoginModalShow(true)
      }, 2000)
    } catch (error) {
      console.log("error:", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  const Logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("loginToken")
      sessionStorage.removeItem("userInfo")
    }
    setIsUserLogin(false)
    setLoginUserName(null)
    setIsLoginPersonOpenShow(false)
    toast.success("Logout successfully")

    setTimeout(() => {
      navigate("/")
    }, 1500)
  }

  // Handle email masking
  useEffect(() => {
    if (isOptModalShow && typeof window !== "undefined") {
      const email = sessionStorage.getItem("email")
      if (email) {
        const [prefix, domain] = email.split("@")
        const last4 = prefix.slice(-4)
        const masked = "*".repeat(Math.max(prefix.length - 4, 0))
        const finalEmail = `${masked}${last4}@${domain}`
        setIsEmail(finalEmail)
      }
    }
  }, [isOptModalShow])

  // Check login status on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("loginToken")
      const userInformation = sessionStorage.getItem("userInfo")

      if (token && userInformation) {
        try {
          const parsedUser = JSON.parse(userInformation)
          setIsUserLogin(true)
          setLoginUserName(parsedUser.fname)
        } catch (error) {
          console.error("Error parsing user info:", error)
          sessionStorage.removeItem("userInfo")
          sessionStorage.removeItem("loginToken")
        }
      }
    }
  }, [])

  // Show premium modal on home page
  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => {
        setIsPremiumModal(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModal && !event.target.closest(".mobile-menu")) {
        setIsModal(false)
      }
    }

    if (isModal) {
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isModal])

  return (
    <>
      <div className="container mx-auto">
        <div className="w-[100%] bg-[#E5E7EB] rounded-lg px-5 py-2 flex justify-between items-center">
          <NavLink to="/">
            <img src="/assets/images/Home/LOGO.png" className="w-[180px] p-1 object-contain" alt="ITX Solution Logo" />
          </NavLink>

          <ul className="hidden lg:flex justify-center items-center gap-5">
            {NavigationData.map((nav, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className={`text-[var(--secondary-color)] font-[500] hover:text-[var(--green-color)] transition-colors ${
                      pathname === nav.url ? "text-[var(--green-color)]" : ""
                    }`}
                    to={nav.url}
                  >
                    {nav.text}
                  </NavLink>
                </li>
              )
            })}
          </ul>

          <div className="flex gap-3.5 items-center relative">
            {isUserLogin ? (
              <div className="order-2">
                <button
                  onClick={() => setIsLoginPersonOpenShow(!isLoginPersonOpenShow)}
                  className="text-4xl cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors"
                  aria-label="User menu"
                >
                  <FaRegCircleUser />
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex justify-center items-center gap-4 order-2">
                <button
                  onClick={() => setIsLoginModalShow(true)}
                  className="border border-[var(--green-color)] h-[45px] text-[var(--white-color)] xl:w-[140px] lg:w-[100px] bg-[var(--green-color)] flex justify-center items-center rounded-full hover:bg-opacity-90 transition-all"
                >
                  Log in
                </button>
                <button
                  onClick={() => setIsSignupModalShow(true)}
                  className="border border-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold h-[45px] xl:w-[140px] lg:w-[100px] flex justify-center items-center rounded-full hover:bg-[var(--secondary-color)] hover:text-white transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              onClick={() => setIsModal(true)}
              className="text-3xl text-[var(--secondary-color)] lg:hidden order-1 hover:text-[var(--green-color)] transition-colors"
              aria-label="Open menu"
            >
              <IoMenu />
            </button>

            {isLoginPersonOpenShow && (
              <div className="w-[300px] bg-[#E5E7EB] absolute top-12 z-20 -left-[200px] lg:-left-[245px] rounded-b-lg flex justify-center items-center shadow-lg">
                <div className="h-[400px] w-[90%] mx-auto">
                  <div className="h-[60px] w-[60px] bg-[var(--primary-color)] rounded-full mx-auto flex justify-center items-center">
                    <h3 className="text-3xl text-[var(--secondary-color)] font-semibold">
                      {loginUserName?.slice(0, 1) || "U"}
                    </h3>
                  </div>
                  <p className="text-xl text-center my-4 font-semibold text-[var(--secondary-color)]">
                    Hello, {loginUserName}!
                  </p>
                  <NavLink
                    className="flex justify-center border-2 border-[#14B8A6] w-[100%] mx-auto p-2 rounded-full font-[400] hover:bg-[#14B8A6] hover:text-white transition-all"
                    to="/account"
                  >
                    Verwalten Sie Ihr Konto
                  </NavLink>
                  <ul className="flex flex-col gap-7 my-10">
                    {loginUserOptions.map((adminOp, index) => {
                      return (
                        <li key={index} onClick={() => setIsLoginPersonOpenShow(false)}>
                          <NavLink
                            className="text-xl flex text-[var(--secondary-color)] font-[500] hover:text-[var(--green-color)] transition-colors"
                            to={adminOp.path}
                          >
                            {adminOp.text}
                          </NavLink>
                        </li>
                      )
                    })}
                    <li>
                      <button
                        onClick={Logout}
                        className="text-xl text-[var(--secondary-color)] font-[500] hover:text-red-500 transition-colors"
                      >
                        Abmelden
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu h-[100vh] w-[100%] sm:w-[70%] md:w-[50%] p-3 bg-[var(--primary-color)] flex flex-col justify-center items-center gap-6 fixed z-40 top-0 right-0 bottom-0 transform transition-all duration-500 ${
          isModal ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <button
          onClick={() => setIsModal(false)}
          className="text-3xl absolute top-10 right-10 text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors"
          aria-label="Close menu"
        >
          <CgCloseR />
        </button>

        <ul className="flex flex-col justify-center mx-0 items-start gap-5">
          {NavigationData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={`text-[var(--secondary-color)] text-xl font-[500] hover:text-[var(--green-color)] transition-colors ${
                    pathname === item.url ? "text-[var(--green-color)]" : ""
                  }`}
                  to={item.url}
                  onClick={() => setIsModal(false)}
                >
                  {item.text}
                </NavLink>
              </li>
            )
          })}
        </ul>

        {!isUserLogin && (
          <div className="flex flex-col justify-center w-[100%] items-center gap-4">
            <button
              onClick={loginOpenModalClose}
              className="border border-[var(--green-color)] h-[45px] text-[var(--white-color)] w-[60%] bg-[var(--green-color)] flex justify-center items-center rounded-full hover:bg-opacity-90 transition-all"
            >
              Log in
            </button>
            <button
              onClick={SignupOpenModalClose}
              className="border border-[var(--secondary-color)] text-[var(--secondary-color)] font-semibold h-[45px] w-[60%] flex justify-center items-center rounded-full hover:bg-[var(--secondary-color)] hover:text-white transition-all"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Signup Modal */}
      <Modal isOpen={isSignupModalShow} onClose={() => setIsSignupModalShow(false)}>
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
                  <label className="text-xl font-[400] mb-3 block">Vorname</label>
                  <input
                    type="text"
                    placeholder="Vorname"
                    {...signupForm.register("fname", { required: "Vorname ist erforderlich" })}
                    className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                  />
                  {signupForm.formState.errors.fname && (
                    <span className="text-red-500 text-sm">{signupForm.formState.errors.fname.message}</span>
                  )}
                </div>

                <div className="flex-col w-[48%]">
                  <label className="text-xl font-[400] mb-3 block">Nachname</label>
                  <input
                    type="text"
                    placeholder="Nachname"
                    {...signupForm.register("lname", { required: "Nachname ist erforderlich" })}
                    className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                  />
                  {signupForm.formState.errors.lname && (
                    <span className="text-red-500 text-sm">{signupForm.formState.errors.lname.message}</span>
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
                  <span className="text-red-500 text-sm">{signupForm.formState.errors.email.message}</span>
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
                  <span className="text-red-500 text-sm">{signupForm.formState.errors.password.message}</span>
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
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von Pinterest zu und bestätigen, dass Sie unsere
              Datenschutzrichtlinie gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalShow} onClose={() => setIsLoginModalShow(false)}>
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
                  <span className="text-red-500 text-sm">{loginForm.formState.errors.email.message}</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">Passwort</label>
                <input
                  type="password"
                  placeholder="Passwort"
                  {...loginForm.register("password", { required: "Passwort ist erforderlich" })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none focus:border-[var(--green-color)] transition-colors"
                />
                {loginForm.formState.errors.password && (
                  <span className="text-red-500 text-sm">{loginForm.formState.errors.password.message}</span>
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
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von Pinterest zu und bestätigen, dass Sie unsere
              Datenschutzrichtlinie gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal isOpen={isForgotPassModalShow} onClose={() => setIsForgotPassModalShow(false)}>
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
                  <span className="text-red-500 text-sm">{forgotForm.formState.errors.email.message}</span>
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
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von Pinterest zu und bestätigen, dass Sie unsere
              Datenschutzrichtlinie gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Reset Password Modal */}
      <Modal isOpen={isResetPassModalShow} onClose={() => setIsResetPassModalShow(false)}>
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
                <label className="text-xl font-[400] mb-3">Neues Passwort</label>
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
                  <span className="text-red-500 text-sm">{resetForm.formState.errors.newPassword.message}</span>
                )}
              </div>

              <div className="w-[100%] flex flex-col my-3 justify-center items-start">
                <label className="text-xl font-[400] mb-3">Passwort bestätigen</label>
                <input
                  type="password"
                  placeholder="Passwort bestätigen"
                  {...resetForm.register("cPassword", { required: "Passwort bestätigen ist erforderlich" })}
                  className="h-[50px] w-[100%] bg-white rounded-lg border-2 border-[var(--black-color)] p-5 outline-none text-black focus:border-[var(--green-color)] transition-colors"
                />
                {resetForm.formState.errors.cPassword && (
                  <span className="text-red-500 text-sm">{resetForm.formState.errors.cPassword.message}</span>
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
              Indem Sie fortfahren, stimmen Sie den Nutzungsbedingungen von Pinterest zu und bestätigen, dass Sie unsere
              Datenschutzrichtlinie gelesen haben. Hinweis bei der Erfassung.
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

            <p className="mb-6 text-sm sm:text-[13px] text-center">Ein OTP-Code wurde an {isEmail} gesendet.</p>

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
              Indem Sie fortfahren, stimmen Sie den Servicebedingungen von Pinterest zu und bestätigen, dass Sie unsere
              Datenschutzrichtlinie gelesen haben. Hinweis bei Erfassung.
            </p>
          </div>
        </div>
      </Modal>

      {/* Premium Modal */}
      <Modal isOpen={isPremiumModal} onClose={() => setIsPremiumModal(false)}>
        <button
          onClick={() => setIsPremiumModal(false)}
          className="text-3xl absolute top-3 right-3 cursor-pointer text-[var(--secondary-color)] hover:text-[var(--green-color)] transition-colors z-10"
          aria-label="Close modal"
        >
          <CgCloseR />
        </button>

        <div className="w-full px-5 py-6 bg-[var(--white-color)] rounded-lg flex flex-col justify-center items-center overflow-y-auto">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl lg:text-5xl text-[var(--secondary-color)] font-[500]">
              Flexible <span className="text-[var(--black-color)]">Pläne</span>
            </h1>
            <p className="lg:w-[80%] mx-auto text-center my-2">
              Wählen Sie einen Plan, der für Sie und Ihr Team am besten geeignet ist.
            </p>
          </div>

          <div className="w-full flex flex-wrap justify-center items-center gap-7 md:gap-4 lg:gap-7">
            {PlansData.map((item, index) => {
              return <Plans key={index} data={item} />
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Header
