"user client";

import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RequesterTicket from "./RequesterTicket";
import { RequestArea } from "@/models/RequestArea";
import { GET } from "@/models/Endpoints";
import PageHeader from "../PageHeader";

interface Props {
  id?: string;
}
export default function RequesterTicketList({ id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["requesterArea"],
    queryFn: async () => {
      const { data } = await axios.get(GET.RequestArea, { params: { Id: id } });
      return data as RequestArea;
    },
  });

  return (
    <div className="w-full h-full">
      {!isLoading && data && 
        <>
        <PageHeader title={`${data.Name} ${data.Description ? ' - ' + data.Description : ''}`} />

        <div className='flex flex-col items-center gap-3 w-full overflow-auto h-full pb-10'>
          {data?.Tickets?.map((ticket) => (
            <RequesterTicket key={uuidv4()} ticket={ticket} area={data} />
          ))}
        </div>
      </>
      }
    </div>
    
  );
}
