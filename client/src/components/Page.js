import { useEffect } from "react";

const Page = (props) => {
  useEffect(() => {
    document.title = "MeTube - " + props.title;
  });

  return props.children;
};

export default Page;
