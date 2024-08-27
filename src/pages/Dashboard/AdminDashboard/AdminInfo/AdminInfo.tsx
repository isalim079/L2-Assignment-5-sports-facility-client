import admin from '@/assets/admin.png'

const AdminInfo = () => {
    return (
        <div>
            <div className=''>
                <div className='flex items-center'>
                    <img className='w-32' src={admin} alt="" />
                    <div>
                        <p>Admin Panel</p>
                        <h1>Salim Reza Sumon</h1>
                        <p>srs@mail.com</p>
                        <p>phone</p>
                        <p>address</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminInfo;