import React from 'react';

const WelcomeScreen = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans text-left" dir="ltr">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/70 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-black text-indigo-600 italic tracking-tighter">Data Diet</div>
          <div className="text-sm font-bold text-gray-600 cursor-pointer hover:text-indigo-600">Sign In</div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-grow">
        <div className="max-w-7xl mx-auto py-24 px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase text-indigo-600 bg-indigo-50 rounded-full">
            The Future of Personal Nutrition
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 leading-[1.1]">
            Fuel Your Body with <br />
            <span className="text-indigo-600">Smart Data</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-12 font-light leading-relaxed">
            Stop guessing your calories. We use statistical precision to optimize your health based on real clinical data and expert medical insights.
          </p>
          
          <div className="flex justify-center">
            <button className="px-12 py-5 bg-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:-translate-y-1">
              Get Started Now
            </button>
          </div>
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="p-8 border-b border-gray-50">
               <h3 className="font-black text-gray-800 text-xl text-center md:text-left">Why Data Diet?</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-5 font-bold">Analytical Feature</th>
                    <th className="px-8 py-5 text-center">Traditional</th>
                    <th className="px-8 py-5 text-indigo-600 text-center">Data Diet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-indigo-50/10 transition-colors">
                    <td className="px-8 py-6 font-bold text-gray-700 border-r border-gray-50">Accuracy Level</td>
                    <td className="px-8 py-6 text-gray-400 text-center italic text-sm">Estimated</td>
                    <td className="px-8 py-6 text-indigo-600 font-black bg-indigo-50/30 text-center uppercase text-[10px]">Statistically Proven</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/10 transition-colors">
                    <td className="px-8 py-6 font-bold text-gray-700 border-r border-gray-50">Monitoring</td>
                    <td className="px-8 py-6 text-gray-400 text-center italic text-sm">Delayed Logs</td>
                    <td className="px-8 py-6 text-indigo-600 font-black bg-indigo-50/30 text-center uppercase text-[10px]">Real-time Sync</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/10 transition-colors">
                    <td className="px-8 py-6 font-bold text-gray-700 border-r border-gray-50">Customization</td>
                    <td className="px-8 py-6 text-gray-400 text-center italic text-sm">Static Plans</td>
                    <td className="px-8 py-6 text-indigo-600 font-black bg-indigo-50/30 text-center uppercase text-[10px]">Dynamic Analysis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 bg-white border-t border-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-black text-indigo-600 italic">Data Diet</div>
          <p className="text-gray-400 text-sm font-medium italic">© 2026 Data Diet Project - Precision Health</p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
