// this package is imported from node.js and will fail if it is used directly on the client side because browser side javascript can't access the file system. When the code on the client side runs, next.js will not make it part of the client side.
import fs from "fs/promises";
import Link from "next/link";
import path from "path";

// this will only be visible on the client side.
export default function Home(props) {
  const { products } = props;
  return (
    <>
      <div>
        <h1>Home page</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

// any code here, is executed on the server side and in so doing, will not be part of our client code and will not be visible on the browser. that is why the code has already been pre fetched before this component renders.
export async function getStaticProps() {
  console.log("(Re)Generating");
  // we specify which path we are starting with then walk our way down to the main path where we want to read the file. hence the cwd - means current working directory which is the root directory becuase when this code get executed, it doesn't start from the pages folder but from the root directory.
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // because this code runs on the server side, we can then use the fs here.

  // we use the readFileSync to read the dummy data on our file. readFileSync synchronously read the file and block the execution until it's done. while readFile wants/expect a call back to continue
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    // this re-generate every request coming in this page every 10 seconds after it was last generated
    revalidate: 10,
  };
}
