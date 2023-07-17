import Link from 'next/link'

const ClientsPage = () => {
  return (
    <div>
      <h1>Client Page</h1>
      <ul>
        <li>
          <Link href="/clients/max">Max</Link>
        </li>
        <li>
          <Link href="/clients/manu">Manuel</Link>
        </li>
      </ul>
    </div>
    
  )
}

export default ClientsPage