import InfoTable from '@/components/InfoTable';
import LabTable from '@/components/LabTable';
import RequestTable from '@/components/RequestTable';

export default function Lab1() {
  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <InfoTable lab='microprocessor' role='asistant' />
      <LabTable lab="microprocessor" />
      <RequestTable lab={'microprocessor'} role={'asistant'} />
    </section>
  );
}

const userDetails = {
  fullName: "",
  email: "",
  phoneNumber: "",
  designation: "Lab Assistant",
}