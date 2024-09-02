import ReactLoading from 'react-loading';

const Loading = () => {
    return (
       <div className="flex justify-center items-center w-full h-full">
            <ReactLoading type={'cylon'} color={'#F4A21E'}  width={100} />
       </div>
    );
};

export default Loading;