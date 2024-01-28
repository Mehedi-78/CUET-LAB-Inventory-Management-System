import InfoTable from '@/components/InfoTable';
import LabTable from '@/components/LabTable';
import RequestTable from '@/components/RequestTable';

export default function Lab1() {

  return (
    <section className="container overflow-hidden h-[200vh] space-y-6">
      <InfoTable lab='os' role='asistant' />
      <LabTable lab={'os'} />
      <RequestTable lab={'os'} role={'asistant'} />
    </section>
  );
}

const userDetails = {
  fullName: "Md. Aminul Islam Khadem",
  email: "khadem1986@gmail.com",
  phoneNumber: "01878715150",
  designation: "Lab Assistant",
}