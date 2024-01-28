// import { getAllUser } from "@/helper/api";
import HandleItemRequest from "./HandleItemRequest";
import HandleNewUserRequest from "./HandleNewUserRequest";
import HandleUserRequest from "./HandleUserRequest";
import getUserSession from "@/helper/getUserSession";

export default async function Admin() {
  const session = await getUserSession()
  
  return (
    <section className="container space-y-8">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <HandleNewUserRequest />
      <HandleUserRequest />
      {/* <HandleItemRequest /> */}
    </section>
  );
}