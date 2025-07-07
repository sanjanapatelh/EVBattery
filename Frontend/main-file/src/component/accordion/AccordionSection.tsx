import { useState } from "react";
import { accordionData } from "../../data/Data";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const AccordionSection = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(1);

  const handleItemClick = (itemId: number) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <DivAnimateYAxis className="rv-accordion">
      <div>
        <h3 className="rv-service-details__title">
          Frequently Asked Questions
        </h3>
      </div>
      {accordionData.map((item) => (
        <div
          key={item.id}
          className={`rv-accordion-item ${
            item.id === expandedItem ? "open" : ""
          }`}
          onClick={() => handleItemClick(item.id)}
        >
          <div className="rv-accordion-item-header">
            <h6 className="rv-accordion-item-title">{item.title}</h6>
            <span className="rv-accordion-item-expand-icon"></span>
          </div>
          <p className="rv-accordion-item-body">{item.desc}</p>
        </div>
      ))}
    </DivAnimateYAxis>
  );
};

export default AccordionSection;
