import { useRouter } from "next/router";
import React from "react";

const BlogsPage = () => {
  const router = useRouter();
//   console.log(router.query);
  return (
    <div>
      This method catches all routes dynamically after blog be it
      /a/2020/whatever
    </div>
  );
};

export default BlogsPage;
