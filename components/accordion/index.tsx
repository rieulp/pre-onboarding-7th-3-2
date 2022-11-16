import React from 'react';
import AccordionItem from './accordionItem';

export interface AccordionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}
function Accordion({ children, ...rest }: AccordionProps) {
  return <div {...rest}>{children}</div>;
}

export default Accordion;

Accordion.Item = AccordionItem;
