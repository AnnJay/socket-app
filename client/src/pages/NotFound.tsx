import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center space-y-6">
      <h1 className="text-2xl">Упс, страничка пропала</h1>
      <p>Вернитесь на главную</p>
      <button className="btn btn-accent">
        <Link to="/">Главная</Link>
      </button>
    </div>
  )
}
