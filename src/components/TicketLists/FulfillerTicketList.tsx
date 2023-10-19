"user client";

import { v4 as uuidv4 } from "uuid";
import { RequestQueue } from "@/models/RequestQueue";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FulfillerTicket from "./FulfillerTicket";
import { GET } from "@/models/Endpoints";
import PageHeader from "../PageHeader";

interface Props {
  id?: string;
}
export default function FulfillerTicketList({ id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["requestQueue"],
    queryFn: async () => {
      const { data } = await axios.get(GET.RequestQueue, { params: { Id: id } });
      return data as RequestQueue;
    },
  });
  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10">
      <PageHeader title={data?.Name} />

      {data?.Tickets?.map((ticket) => (
        <FulfillerTicket
          queue={data}
          key={uuidv4()}
          ticket={ticket}
        />
      ))}
    </div>
  );
}
