import UserProfile from "@/components/UserProfile/UserProfile";
import { Profile } from "@prisma/client";
import { PROFILES_ENDPOINT } from "../../../../public/config/constants";
const getUser = async (username: string): Promise<Profile | null> => {
  try {
    const res = await fetch(`${PROFILES_ENDPOINT}/?username=${username}`, {
      cache: "no-cache",
    });
    const data: Profile = await res.json();
    return data;
  } catch (err) {
    console.log("error: ", err);
    return null;
  }
};
export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
}
