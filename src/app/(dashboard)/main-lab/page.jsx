import ManagerAction from './ManagerAction';
import InfoTable from '@/components/InfoTable';
import RequestTable from '@/components/RequestTable';

export default function MainInventory() {
    return (
        <section className="container space-y-4">
            <InfoTable role='manager' />
            <ManagerAction />
            <RequestTable role={'manager'} />
        </section>
    );
}

const userDetails = {
    fullName: "Shafiqul Islam",
    email: "shafiqcuet1980@gmail.com",
    phoneNumber: "8801670393288",
    designation: "Lab Manager",
}