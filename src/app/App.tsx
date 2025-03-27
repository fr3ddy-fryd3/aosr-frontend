import Sidebar from '@/app/ui/SideBar';
import ContentContainer from '@/app/ui/ContentContainer';

export default function App() {
  return (
    <div className="flex justify-center w-screen h-screen bg-gray-100 p-4">
      {/* Контейнер, содержащий navbar и контент */}
      <div className="flex w-full">
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
