import React from "react";
import FooterSection3 from "../footer/FooterSection3";
import HeaderSection4 from "../header/HeaderSection4";
type Props = {
  children: React.ReactNode;
};
const InnerLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderSection4 />
      {children}
      <FooterSection3 />
    </>
  );
};

export default InnerLayout;
