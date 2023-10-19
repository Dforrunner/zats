"use client";

import { RequestArea } from "@/models/RequestArea";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Link from "../Link";
import { GET } from "@/models/Endpoints";

export default function ZoneSelection() {
  const { data } = useQuery({
    queryKey: ["requestAreas"],
    queryFn: async () => {
      const { data } = await axios.get(GET.RequestAreas);
      return data as RequestArea[];
    },
  });

  return (
    <div className="p-5 w-full flex flex-col gap-3 items-center">
      {data?.map((area) => (
        <Link
          href={`/requester/${area.Id}`}
          type="button"
          variant="contained"
          key={uuidv4()}
          className={`bg-blue-500 w-full h-[60px] text-2xl`}
        >
          {area.Name} {area.Description && " - " + area.Description}
        </Link>
      ))}
    </div>
  );
}
