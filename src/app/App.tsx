import Sidebar from '@/app/ui/SideBar';
import ContentContainer from '@/app/ui/ContentContainer';

export default function App() {
  return (
    <div className="flex justify-center w-screen min-h-screen bg-gray-50 p-4 ">
      {/* Контейнер, содержащий navbar и контент */}
      <div className="flex w-full mb-16">
        <div className='w-1/8'>
          <Sidebar />
        </div>
        <div className='w-7/8'>
          <ContentContainer />
        </div>
      </div>
    </div>
  );
}
