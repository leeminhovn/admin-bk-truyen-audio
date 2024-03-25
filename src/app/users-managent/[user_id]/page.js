
import UserInfoPage from "@/components/pages/userInfoPage/UserInfoPage";
import { getUserInfoAccount } from "../../../../services/api/users";
export default async function ({ params: { user_id } }) {
  const data = await getUserInfoAccount(user_id);
  return <UserInfoPage infoAccount={data} />;
}
