import { AosrUsedVolumeForPassport } from "@/entities/aosr";
import { useNavigate } from "react-router-dom";

export function AosrTag({ aosr, unit }: { aosr: AosrUsedVolumeForPassport, unit: string }) {
  const url = `/aosr/${aosr.id}`.toString();
  const navigate = useNavigate();
  return (
    <div className="bg-blue-300 hover:bg-blue-400 cursor-pointer text-blue-800 items-center 
        rounded-full h-7 min-w-fit py-1 px-2 max-w-16 text-sm"
      onClick={() => navigate(url)}>

      № {aosr.name} - {aosr.totalUsedVolume} {unit}
    </div>
  )
}
