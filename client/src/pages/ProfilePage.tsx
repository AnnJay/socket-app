import { ChangeEvent } from "react"
import { ImageUp, Mail, PersonStanding } from "lucide-react"
import toast from "react-hot-toast"

import { useAuthStore } from "../store/useAuthStore"

export const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    let file

    if (files && files[0]) {
      file = files[0]
    } else {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result
      if (typeof base64Image == "string") await updateProfile(base64Image)
      else toast.error("Проблема с чтением изображения")
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border w-full max-w-lg m-auto my-10 rounded-lg bg-base-200">
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-3">Профиль</h2>
          <p className="mb-5">Да-да, это вы!</p>
          <div className="size-40 relative">
            <img
              className="rounded-full object-center border-4"
              src={authUser?.avatar ? authUser?.avatar : "/default_avatar.webp"}
              alt="profile image"
            />

            <label
              htmlFor="avatar-upload-input"
              className={`absolute bottom-0 right-0 bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer transition-all duration-200 
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              <ImageUp className="size-7 text-base-200" />
              <input
                type="file"
                id="avatar-upload-input"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          <p className="text-center my-4 text-sm">
            {isUpdatingProfile ? "Загрузка..." : "Кликните на иконку с картинкой,чтобы загрузить свой аватар!"}
          </p>

          <div className="form-control self-start w-full mb-5">
            <div className="flex items-center gap-2">
              <PersonStanding className="size-5" />
              <label className="label">
                <span className="label-text text-base">Имя</span>
              </label>
            </div>

            <input type="text" readOnly className="input w-full pl-5 h-8" value={authUser?.name} />
          </div>

          <div className="form-control self-start w-full">
            <div className="flex items-center gap-2">
              <Mail className="size-5" />
              <label className="label">
                <span className="label-text text-base">Email</span>
              </label>
            </div>

            <input type="text" readOnly className="input input-accent w-full pl-5 h-8" value={authUser?.email} />
          </div>
        </div>
      </div>

      <div className="border w-full max-w-lg m-auto my-10 rounded-lg bg-base-200">
        <div className="flex flex-col px-8 py-3">
          <h3 className="text-lg font-bold mb-3">Дополнительная информация</h3>

          <div className="flex justify-between border-b border-zinc-700">
            <span>Зарегистрирован</span>
            <span>{authUser?.createdAt.split("T")[0]}</span>
          </div>

          <div className="flex justify-between ">
            <span>Статус</span>
            <span className="font-bold text-green-600">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
