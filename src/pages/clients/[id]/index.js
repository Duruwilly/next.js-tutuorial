import { useRouter } from "next/router"

const ClientProjectPage = () => {
    const router =  useRouter()

    console.log(router.query.id);

    function loadProjectHandler () {
      // after performing a specific task
      router.push("/clients/max/projecta")
    }
  return (
    <div>
      <h1>Page for some specific searched client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  )
}

export default ClientProjectPage