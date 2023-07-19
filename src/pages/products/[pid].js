import fs from "fs/promises";
import path from "path";

const DummyProductionDetailsData = (props) => {
  const { loadedProduct } = props;

  if(!loadedProduct) {
    return <p>Loading...</p>
  }
  // working with dynamic parameter like say id.
  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");

  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // if we want to pre-render the page, we have to use the dynamic path on the getStaticProps since it runs on the server.
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// this get dynamic path that needs to be pre-generated
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  // going through the ids and mapping over them such that every id is mapped into an object. Wrapping it in extra parentheses so that it is not considered as a function body instead return it as a new object for every id and object with a parent key.. then it will come like this.[{ params: { pid: "p1" } }, { params: { pid: "p2" } }, { params: { pid: "p3" } }] etc
  const params = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: params,
    // this fallback key can help with lots of pages that needs to be pregenerated and when set to true, it state that all path are valid and  should be  loaded in time when a request reaches the server but not pre-generated. and if it set to a string of blocking, the page might take a while to be rendered from the server
    fallback: true,
  };
}

export default DummyProductionDetailsData;
