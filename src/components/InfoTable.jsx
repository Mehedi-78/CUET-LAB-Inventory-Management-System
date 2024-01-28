import React from 'react'

export default function InfoTable({user:userDetails}) {
    return (
        <div className=''>
            <div className='title'>Info</div>
            <div className='info_table overflow-x-auto'>
                <table className="text-sm max-w-[400px] overflow-hidden text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        <tr>
                            <th>Fullname</th>
                            <td>{userDetails.fullName}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{userDetails.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{userDetails.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Designation</th>
                            <td>{userDetails.designation}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
