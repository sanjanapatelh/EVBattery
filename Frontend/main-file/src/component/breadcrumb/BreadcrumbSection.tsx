import { Link } from "react-router-dom";

type Props = {
  title: string;
  currentPage?: string;
};
const BreadcrumbSection = ({ title, currentPage }: Props) => {
  return (
    <div className="rv-breadcrumb pt-120 pb-120">
        <h1 className="rv-breadcrumb__title text-center">{title}</h1>
    </div>
  );
};

export default BreadcrumbSection;
