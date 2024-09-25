import React from "react";

const page = ({ params }: { params: { item: string } }) => {
  return <div>{params.item}</div>;
};

export default page;
