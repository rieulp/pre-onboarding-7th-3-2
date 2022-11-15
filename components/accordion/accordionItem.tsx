import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

export interface AccordionItemProps {
  heading: string | ReactElement;
  children: ReactElement;
}

function AccordionItem({ heading, children }: AccordionItemProps) {
  const [show, setShow] = useState(true);
  const onClick = () => setShow((pre) => !pre);
  return (
    <div className="">
      <AccordionHeader className="mb-0">
        <button
          onClick={onClick}
          className={`accordion-button
          flex
          items-center
          relative
          w-full 
          focus:outline-none
          transition
          border-0
          py-3
          px-6
          ${show ? '' : 'collapsed'}`}
        >
          {heading}
        </button>
      </AccordionHeader>
      <AccordionCollapse show={show}>
        <div className="accordion-body">{children}</div>
      </AccordionCollapse>
    </div>
  );
}

export default AccordionItem;

const AccordionHeader = styled.h2`
  .accordion-button::after {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-left: auto;
    content: '';
    background-image: url('/assets/arrow.svg');
    background-repeat: no-repeat;
    background-size: 1rem;
    transition: transform 0.2s ease-in-out;
  }
  .accordion-button:not(.collapsed)::after {
    transform: rotate(-180deg);
  }
`;

const AccordionCollapse = styled.div<{ show: boolean }>`
  ${({ show }) => (show ? `` : `display: none;`)}
  .accordion-body {
  }
`;
