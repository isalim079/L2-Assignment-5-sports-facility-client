import ReactLoading from 'react-loading';

const Loading = () => {
    return (
       <section className="flex justify-center items-center w-full h-full">
            <ReactLoading type={'cylon'} color={'#F4A21E'}  width={100} />
       </section>
    );
};

export default Loading;