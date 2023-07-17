import { useRouter } from "next/router"

const clientProjectId = () => {
    const router = useRouter();
    console.log(router.query.clientProjectId);
  return (
    <div>Page for a particular client project</div>
  )
}

export default clientProjectId