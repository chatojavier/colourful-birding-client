import { useEffect } from 'react';
import { useState, useRef } from 'react';

// Accordion component
const Accordion = ({ children, className = '', ...rest }) => {
  const [isOpen, setIsOpen] = useState(Array.from({ length: children.length }, (_, i) => i === 0));
  const [reRender, setReRender] = useState(false);
  const contentElement = useRef([]);
  const handleClick = (i) => {
    const newIsOpen = isOpen.map((elmIsOpen, j) => j === i && !elmIsOpen);
    setIsOpen(newIsOpen);
  };
  useEffect(() => {
    setReRender(!reRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentElement]);

  return (
    <div className={`accordion | w-[600px] space-y-4 p-4 ${className}`} {...rest}>
      {children.map((child, index) => {
        const item = child.props.children({ isOpen: isOpen[index] });
        const [header, content] = item.props.children;
        const contentMaxHeight = contentElement.current.length > 0 ? contentElement.current[index].scrollHeight : 0;
        return (
          <div className="accordion-item" key={index}>
            <div className="accordion-header | mb-2 cursor-pointer" onClick={() => handleClick(index)}>
              {header}
            </div>
            <div
              ref={(elm) => (contentElement.current[index] = elm)}
              className={`accordion-content | overflow-hidden transition-all ${
                isOpen[index] ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ maxHeight: isOpen[index] ? contentMaxHeight : 0 }}
            >
              {content}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;

Accordion.header = ({ children }) => {
  return <>{children}</>;
};

Accordion.content = ({ children }) => {
  return <>{children}</>;
};

Accordion.item = ({ children }) => {
  return <>{children}</>;
};
