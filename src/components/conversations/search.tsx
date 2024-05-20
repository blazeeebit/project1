import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Search } from "lucide-react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type ConversationSearchProps = {
  register: UseFormRegister<FieldValues>;
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

export const ConversationSearch = ({
  register,
  domains,
}: ConversationSearchProps) => {
  return (
    <div className="flex flex-col py-3">
      <select
        {...register("domain")}
        className="px-3 py-4 text-sm border-[1px] rounded-lg mr-5">
        <option disabled selected>
          Domain name
        </option>
        {domains?.map((domain) => (
          <option value={domain.id} key={domain.id}>
            {domain.name}
          </option>
        ))}
      </select>
      <Card className="flex gap-2 py-1 px-2 items-center mt-3 mr-5">
        <Search className="text-gray-300" />
        <Input
          {...register("query")}
          type="text"
          className="focus-visible:ring-0 rounded-none outline-none border-none"
          placeholder="Search"
        />
      </Card>
    </div>
  );
};
