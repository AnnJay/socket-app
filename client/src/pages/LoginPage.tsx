import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"

import { useAuthStore } from "../store/useAuthStore"

export interface LoginFormData {
  email: string
  password: string
}

export const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore()

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Заполните email")
    if (!formData.password) return toast.error("Заполните пароль")

    return true
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isDataValid = validateForm()

    if (isDataValid === true) login(formData)
  }

  return (
    <div className="min-h-screen p-16">
      <div className="flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mt-2">Вход</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-accent w-full pl-10"
                  placeholder="dorian@grey.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Пароль</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="input input-accent w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full text-base font-normal" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Загрузка...
                </>
              ) : (
                "Отправить"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Еще не регистрировались?{" "}
              <Link to="/signup" className="link link-primary">
                Регистрация
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
