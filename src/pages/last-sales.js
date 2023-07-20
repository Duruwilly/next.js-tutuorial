import React, { useEffect, useState } from 'react'
import useSWR from "swr"

const LastSales = () => {
    const [sales, setSales] = useState()
    const [loading, setLoading] = useState(false)

   const {data, error} = useSWR("https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json")

   useEffect(() => {
    if(data) {
        const transformedSales = [];

        for(let key in data) {
            transformedSales.push({
                id: key,
                username: data[key].username,
                volume: data[key].volume
            })
        }

        setSales(transformedSales)
    }
   }, [data])

   if(error) {
    return <p>Error!!</p>
   }

   if(!data || !sales) {
    return <p>Loading...</p>
   }


  return (
    <ul>
        {
            sales.map((sale) => (
                <li>
                    {sale.usernmae} - {sale.volume}
                </li>
            ))
        }
    </ul>
  )
}

export default LastSales