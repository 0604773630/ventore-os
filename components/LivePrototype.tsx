import React, { useState } from 'react';
import { VentureData } from '../types';
import { Smartphone, Zap, Settings, CreditCard, ChevronRight, Activity, Users, Database, FileText } from 'lucide-react';

interface LivePrototypeProps {
  data: VentureData;
}

export const LivePrototype: React.FC<LivePrototypeProps> = ({ data }) => {
  const [isPremium, setIsPremium] = useState(false);

  // Derived calculations based on toggle
  const basePrice = data.config.pricingModel.basePrice;
  const multiplier = data.config.pricingModel.premiumMultiplier;
  const currentPrice = isPremium ? basePrice * multiplier : basePrice;
  
  // Format numbers
  const formatMoney = (amt: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amt);

  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
        
        {/* LEFT: Mobile App Preview (Toggle Source) */}
        <div className="flex-1 lg:w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-os-900 to-os-800 border-r border-os-700 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-os-accent to-transparent opacity-20"></div>
            
            <div className="absolute top-6 left-6 text-xs font-mono text-gray-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-os-accent rounded-full animate-pulse"></span>
              DEVICE_PREVIEW
            </div>
          
            {/* Phone Frame */}
            <div className="w-[320px] h-[640px] bg-os-950 rounded-[3rem] p-4 shadow-2xl border-4 border-os-800 relative ring-1 ring-os-700">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-os-950 rounded-b-xl z-20 border-b border-x border-os-800"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden flex flex-col text-gray-900 relative">
                    
                    {/* App Header */}
                    <div className="h-32 p-6 text-white flex flex-col justify-end relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600" style={{ backgroundColor: data.config.brandColors.primary }}></div>
                        <div className="relative z-10">
                           <div className="font-bold text-xl">{data.config.projectName}</div>
                           <div className="text-xs opacity-80">{data.config.tagline}</div>
                        </div>
                    </div>

                    {/* App Body */}
                    <div className="flex-1 p-6 flex flex-col gap-5 bg-gray-50">
                        {/* Stats */}
                        <div className="flex gap-4">
                           <div className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <div className="text-[10px] uppercase text-gray-400 font-bold">Users</div>
                              <div className="text-xl font-bold text-gray-800">1.2k</div>
                           </div>
                           <div className="flex-1 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                              <div className="text-[10px] uppercase text-gray-400 font-bold">Growth</div>
                              <div className="text-xl font-bold text-green-500">+18%</div>
                           </div>
                        </div>

                        {/* Interactive Toggle Card - THE TRIGGER */}
                        <div className={`bg-white p-5 rounded-xl shadow-md border transition-all duration-300 ${isPremium ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-200'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <div className="font-bold text-gray-800">Feature Set</div>
                                    <div className="text-xs text-gray-500">{isPremium ? "Pro Unlocked" : "Basic Access"}</div>
                                </div>
                                <button 
                                    onClick={() => setIsPremium(!isPremium)}
                                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none ${isPremium ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isPremium ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                </button>
                            </div>
                            
                            <div className="flex items-end gap-1">
                                <span className={`text-3xl font-bold transition-colors duration-300 ${isPremium ? 'text-green-600' : 'text-gray-900'}`}>{formatMoney(currentPrice)}</span>
                                <span className="text-sm text-gray-500 mb-1">/mo</span>
                            </div>
                        </div>

                         <div className="mt-auto space-y-3">
                             <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500 w-2/3" style={{ backgroundColor: data.config.brandColors.secondary }}></div>
                             </div>
                             <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500 w-1/3" style={{ backgroundColor: data.config.brandColors.secondary }}></div>
                             </div>
                         </div>
                    </div>

                    {/* App Nav */}
                    <div className="h-16 bg-white border-t border-gray-100 flex justify-around items-center px-4 pb-2">
                        <Smartphone size={20} className="text-gray-900" />
                        <CreditCard size={20} className="text-gray-300" />
                        <Settings size={20} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT: Investor Document (Sync Target) */}
        <div className="flex-1 lg:w-1/2 bg-os-950 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-8">
             <div className="flex items-center justify-between border-b border-os-800 pb-4">
               <div className="text-xs font-mono text-os-accent flex items-center gap-2">
                 <FileText size={14} />
                 LIVE_INVESTOR_DOC.PDF
               </div>
               <div className="flex items-center gap-2 text-[10px] text-green-500 uppercase tracking-widest font-bold">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 Socket Connected
               </div>
             </div>
             
             {/* Dynamic Document Block */}
             <div className="space-y-8 font-serif text-gray-300 leading-relaxed max-w-lg mx-auto w-full bg-white text-black p-8 shadow-2xl rounded-sm min-h-[600px]">
                 
                 {/* Header in Doc */}
                 <div className="border-b-2 border-black pb-4 mb-8">
                     <h1 className="text-3xl font-bold uppercase tracking-tighter">{data.config.projectName}</h1>
                     <p className="text-sm text-gray-600 italic mt-1">Strategic Overview & Financial Model</p>
                 </div>

                 {/* Sync Section */}
                 <div>
                     <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 text-gray-400">01. Revenue Model</h2>
                     <p>
                         Based on the current technical architecture, the primary revenue driver is the 
                         <span 
                           className={`font-bold mx-1 transition-all duration-300 px-1 rounded ${
                             isPremium 
                               ? 'bg-green-100 text-green-700 shadow-[0_0_10px_rgba(74,222,128,0.5)] border border-green-300' 
                               : 'bg-transparent text-black'
                           }`}
                         >
                           {isPremium ? "Premium Enterprise Tier" : "Standard Consumer Tier"}
                         </span>
                         which accounts for 85% of projected growth.
                     </p>
                     
                     <div className="grid grid-cols-2 gap-4 my-8 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                         <div className="text-center">
                             <div className="text-[10px] uppercase text-gray-500 mb-1">Unit Price</div>
                             <div 
                               className={`text-2xl font-bold transition-all duration-300 ${
                                 isPremium 
                                   ? 'text-green-600 drop-shadow-[0_0_2px_rgba(74,222,128,0.5)]' 
                                   : 'text-gray-900'
                               }`}
                             >
                                 {formatMoney(currentPrice)}
                             </div>
                         </div>
                         <div className="text-center border-l border-gray-200">
                             <div className="text-[10px] uppercase text-gray-500 mb-1">ARR (Year 1)</div>
                             <div 
                               className={`text-2xl font-bold transition-all duration-300 ${
                                 isPremium 
                                   ? 'text-green-600 drop-shadow-[0_0_2px_rgba(74,222,128,0.5)]' 
                                   : 'text-gray-900'
                               }`}
                             >
                                 {formatMoney(currentPrice * 12000)}
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Strategy Content */}
                 <div>
                     <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 text-gray-400">02. Market Strategy</h2>
                     <p className="mb-4">
                        {data.strategy.problemStatement}
                     </p>
                     <p>
                        {data.strategy.monetizationStrategy}
                     </p>
                 </div>
                 
                 {/* Footer */}
                 <div className="mt-auto pt-12 text-[10px] text-gray-400 text-center uppercase tracking-widest">
                     Generated by Venture-OS • Confidential
                 </div>
             </div>
        </div>
    </div>
  );
};