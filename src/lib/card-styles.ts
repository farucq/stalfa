export const getCardStyles = (bgColor: string = '#000000', hasDarkBg: boolean = true) => {
  return {
    container: `flex flex-col h-[400px] sm:h-[500px] md:h-[540px] bg-[#0A0A0A] backdrop-blur-md rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden transition-all duration-500 shadow-2xl`,
    imageContainer: `h-[160px] sm:h-[200px] md:h-[240px] w-full flex items-center justify-center bg-gradient-to-b from-[#111] to-black overflow-hidden relative`,
    image: `min-h-full min-w-full object-cover absolute inset-0 transition-transform duration-700 hover:scale-105`,
    content: 'flex-1 p-4 sm:p-6 md:p-8 text-white bg-black/40 flex flex-col items-start text-left justify-between border-t border-white/5',
    brand: 'text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1',
    title: 'text-xl sm:text-2xl font-semibold tracking-tight mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300',
    description: 'text-xs sm:text-sm text-white/60 mb-4 sm:mb-6 line-clamp-3',
    badge: 'text-[10px] font-bold bg-white/5 text-white/70 px-2 py-0.5 rounded-full border border-white/10',
    
    // MODERN BUTTON STYLES
    button: `
      group relative w-full py-3 sm:py-4 bg-white/5 hover:bg-white/10 
      text-white rounded-xl sm:rounded-2xl font-medium 
      border border-white/10 hover:border-white/20
      transition-all duration-300 flex items-center justify-center gap-2 px-4 sm:px-6
      overflow-hidden mt-auto text-sm sm:text-base
    `,
    price: 'text-sm font-semibold text-white/50 group-hover:text-white transition-colors duration-300'
  };
};