import InfoTable from '@/components/InfoTable';
import LabTable from '@/components/LabTable';
import RequestTable from '@/components/RequestTable';

export default function Lab1() {
  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <InfoTable lab='computer' role='asistant' />
      <LabTable lab="computer" />
      <RequestTable lab={'computer'} role={'asistant'} />
    </section>
  );
}


const userDetails = {
  fullName: "Prabir kanti Biswas",
  email: "prabir.bisw@gmail.com",
  phoneNumber: "01618-989050",
  designation: "Lab Assistant",
}