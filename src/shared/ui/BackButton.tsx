import { useNavigate } from 'react-router-dom';

export function BackButton({ fallback = '/' }: { fallback?: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(fallback); // если истории нет — например, при прямом заходе
    }
  };

  return (
    <button
      onClick={handleBack}
      className="rounded-full border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white cursor-pointer m-4 h-8 w-8 transition"
    >
      ←
    </button>
  );
}
