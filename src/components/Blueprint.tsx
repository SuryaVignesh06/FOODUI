
import { motion } from 'framer-motion';

export interface Table {
    id: number;
    name: string;
    seats: number;
    x: number; // percentage from left
    y: number; // percentage from top
    type: 'square' | 'round' | 'rect';
    status: 'available' | 'booked' | 'selected';
}

interface BlueprintProps {
    tables: Table[];
    onTableSelect: (id: number) => void;
    requiredGuests?: number;
}

const Blueprint: React.FC<BlueprintProps> = ({ tables, onTableSelect, requiredGuests = 2 }) => {
    return (
        <div className="relative w-full aspect-[4/3] bg-[#0c0c0c] rounded-3xl overflow-hidden shadow-2xl border border-white/5 font-sans">
            {/* Luxurious Floor Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(45deg, #1a1a1a 0, #1a1a1a 1px, transparent 0, transparent 50%),
                        repeating-linear-gradient(-45deg, #1a1a1a 0, #1a1a1a 1px, transparent 0, transparent 50%)
                    `,
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Warm Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-blue-900/10 pointer-events-none" />

            {/* Architecture: Premium Walls */}
            <div className="absolute top-0 left-0 w-full h-8 bg-zinc-800 border-b-2 border-zinc-700 shadow-md z-10" />
            <div className="absolute bottom-0 left-0 w-full h-8 bg-zinc-800 border-t-2 border-zinc-700 shadow-md z-10" />
            <div className="absolute top-0 left-0 w-8 h-full bg-zinc-800 border-r-2 border-zinc-700 shadow-md z-10" />
            <div className="absolute top-0 right-0 w-8 h-full bg-zinc-800 border-l-2 border-zinc-700 shadow-md z-10" />

            {/* Zones - Elegant Typography */}
            <div className="absolute bottom-12 left-12 text-white/10 font-bebas text-7xl pointer-events-none select-none tracking-widest rotate-[-90deg] origin-bottom-left">
                DINING HALL
            </div>

            {/* Greenery / Ambiance (Decorative Dots) */}
            <div className="absolute top-12 left-12 w-4 h-4 bg-green-500/20 rounded-full blur-[2px]" />
            <div className="absolute top-16 left-10 w-3 h-3 bg-green-500/20 rounded-full blur-[2px]" />
            <div className="absolute bottom-12 right-12 w-6 h-6 bg-orange-500/10 rounded-full blur-[10px]" />

            {/* Kitchen Zone - Open Kitchen Look */}
            <div className="absolute top-0 left-[30%] w-[40%] h-[12%] bg-zinc-900/80 border-b border-zinc-700 flex items-center justify-center shadow-lg z-10">
                <span className="text-amber-500/50 font-serif italic text-xs tracking-widest">Open Kitchen</span>
            </div>

            {/* Entrance */}
            <div className="absolute bottom-0 left-[45%] w-[10%] h-6 bg-[#0c0c0c] border-x border-amber-500/20 z-20 flex items-center justify-center">
                <div className="text-amber-500/30 text-[10px] uppercase tracking-widest">Welcome</div>
            </div>

            {/* Tables */}
            {tables.map((table) => {
                const isCapacityMatch = table.seats === requiredGuests;
                const isBookable = table.status !== 'booked' && isCapacityMatch;

                return (
                    <motion.button
                        key={table.id}
                        onClick={() => isBookable && onTableSelect(table.id)}
                        className={`absolute flex items-center justify-center transition-all duration-500
                            ${table.type === 'round' ? 'rounded-full' : 'rounded-lg'}
                            ${table.status === 'available' && isCapacityMatch ? 'bg-green-500/20 hover:bg-green-500/30 border-green-500/50 hover:border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : ''}
                            ${!isCapacityMatch && table.status !== 'booked' ? 'bg-zinc-900/50 border-white/5 opacity-30 cursor-not-allowed grayscale' : ''}
                            ${table.status === 'selected' ? 'bg-amber-400 border-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.5)] scale-110 z-30' : ''}
                            ${table.status === 'booked' ? 'bg-red-500/30 border-red-500/50 cursor-not-allowed shadow-[0_0_15px_rgba(239,68,68,0.2)]' : ''}
                            border-2 backdrop-blur-md
                        `}
                        style={{
                            left: `${table.x}%`,
                            top: `${table.y}%`,
                            width: table.type === 'rect' ? '14%' : table.seats > 4 ? '12%' : '8%',
                            height: table.type === 'rect' ? '20%' : table.seats > 4 ? '12%' : '8%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        whileHover={isBookable ? { scale: 1.05 } : {}}
                        whileTap={isBookable ? { scale: 0.95 } : {}}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: table.status === 'selected' ? 1.1 : 1 }}
                        transition={{ delay: table.id * 0.05 }}
                    >
                        {/* Table Lamp / Glow Effect */}
                        {table.status === 'available' && isCapacityMatch && (
                            <div className="absolute inset-0 bg-green-500/10 blur-md rounded-full" />
                        )}

                        {/* Table Surface */}
                        <div className={`w-full h-full absolute inset-0 opacity-30
                             ${table.type === 'round' ? 'rounded-full' : 'rounded-md'}
                             bg-gradient-to-br from-white/10 to-transparent
                        `} />

                        {/* Table Name */}
                        <span className={`relative font-bebas text-lg z-10 tracking-wider ${table.status === 'selected' ? 'text-black' : 'text-white/40'}`}>
                            {table.name}
                        </span>

                        {/* Chairs */}
                        {Array.from({ length: table.seats }).map((_, i) => {
                            const angle = (360 / table.seats) * i;
                            const distance = table.type === 'rect' ? 36 : 30; // Distance from center
                            const isSelected = table.status === 'selected';

                            return (
                                <div key={i}
                                    className={`absolute w-4 h-4 rounded-full transition-all duration-300 shadow-sm
                                        ${isSelected ? 'bg-black/80' : table.status === 'booked' ? 'bg-red-500/50' : isCapacityMatch ? 'bg-green-500/40' : 'bg-zinc-800'}
                                    `}
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}px)`
                                    }}
                                />
                            )
                        })}
                    </motion.button>
                );
            })}
        </div>
    );
};

export default Blueprint;
