import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionProps = {
  trigger: string;
  content: string;
};

export const Accordion = ({ trigger, content }: AccordionProps) => {
  return (
    <ShadcnAccordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};
