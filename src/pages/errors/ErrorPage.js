function ErrorPage ({ code, message }) {
  return (
    <>
      <div>
        { code }
      </div>
      <div>
        { message }
      </div>
    </>
  )
}

export default ErrorPage;
