import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react"

import { useAuthStore } from "../store/useAuthStore"

interface SignUpFormData {
  name: string
  email: string
  password: string
}

export const SignUpPage = () => {
  const { isSigningUp } = useAuthStore()

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mt-2">Зарегистрироваться</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Имя</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-accent w-full pl-10"
                  placeholder="Дориан Грей"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

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
                  className={`input input-accent w-full pl-10`}
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

            <button type="submit" className="btn btn-primary w-full text-base font-normal" disabled={isSigningUp}>
              {isSigningUp ? (
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
              Уже есть аккаунт?{" "}
              <Link to="/login" className="link link-primary">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
