export default function DataDietLogo() {
  return (
    <div className="flex items-center">
      <div className="group cursor-pointer flex items-center bg-white shadow-sm p-4 rounded-2xl border border-slate-100 transition-all duration-500 hover:shadow-md">
        
        <div className="flex items-center">
          <span className="text-4xl font-black text-slate-900 transition-colors duration-500 group-hover:text-blue-600">D</span>
          <div className="max-w-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:max-w-[100px] group-hover:ml-1">
            <span className="text-3xl font-light text-slate-400 uppercase tracking-tight">ata</span>
          </div>
        </div>

        <div className="w-2 group-hover:w-6 transition-all duration-700"></div>

        <div className="flex items-center">
          <span className="text-4xl font-black text-blue-600">D</span>
          <div className="max-w-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:max-w-[100px] group-hover:ml-1">
            <span className="text-3xl font-light text-blue-400 uppercase tracking-tight">iet</span>
          </div>
        </div>

      </div>
    </div>
  );
}
