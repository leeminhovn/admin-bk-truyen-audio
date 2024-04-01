"use client";
import AuthorInfoManagentPage from "@/components/pages/authorInfoManagentPage/AuthorInfoManagentPage";
import { apiAdminGetInfoAccountById } from "../../../../services/api/admin";
import { useEffect, useState } from "react";
import { getCookie } from "@/utils/features/localStorage";

export default function page({ params: { author_id } }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const call = async () => {
      const { data } = await apiAdminGetInfoAccountById(
        author_id,
        getCookie("adminToken")
      );
      setData(data);
    };
    call();
  }, []);

  return data && <AuthorInfoManagentPage infoAccount={data} />;
}
