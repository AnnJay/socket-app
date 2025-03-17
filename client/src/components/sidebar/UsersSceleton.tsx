export const UsersSceleton = () => {
  return (
    <>
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <div className="w-full space-y-4" key={index}>
            <div className="flex items-center gap-4">
              <div className="skeleton h-16 w-16 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-40"></div>
                <div className="skeleton h-4 w-10"></div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
