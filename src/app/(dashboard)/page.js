import BlurImage from "@/components/BlurImage";
import Profile from "@/components/Profile";
import getUserSession from "@/helper/getUserSession";
import { AiFillEdit } from "react-icons/ai";

export default async function Home() {
  const session = await getUserSession()
  return (
    <section className="container space-y-6">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="title text-center">Welcome, 👋 {session?.user?.name}</div>


      <div className="bg-white p-4 rounded-md border border-blight-1">
        <div className="title">About</div>
        <div className="space-y-8">
          <div className='flex flex-col gap-4 items-center justify-center'>
            <BlurImage
              className='w-[240px] aspect-square object-cover m-auto rounded-md'
              src="/images/cuet.png" alt="Profle"
            />
          </div>
          <div className="text">
            Chittagong University of Engineering & Technology (Bengali: চট্টগ্রাম প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়), commonly referred to as CUET, is a public engineering and technological research university in Bangladesh located in Raozan Upazila under Chittagong District. Established in 1968 as Engineering College, Chittagong and gained autonomous graduate school status in 2003, this university is a state funded institution, maintaining special emphasis on teaching and research of engineering, technology, architecture and planning under five faculties and seventeen academic departments.
          </div>
          <div className="font-medium text-gray-500 text-xs">
              Developed By- Mehedi Hasan Jony, Mohammad Fayez Ullah, Arat Ibne Golam Mowla
          </div>
        </div>
      </div>


      <Profile />


    </section>
  );
}