import React from 'react';
import { Cloud, Star, Rocket, Sparkles } from 'lucide-react';

const Background = () => {
    // Custom CSS for floating animation
    const floatAnimation = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite 1s; }
        .animate-float-slow { animation: float 8s ease-in-out infinite 2s; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
    `;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-50 hidden md:block">
            <style>{floatAnimation}</style>

            {/* Modern Gradient Blobs */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-[8rem] opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-[8rem] opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[8rem] opacity-70 animate-blob animation-delay-4000"></div>

            {/* Floating 3D-ish Icons */}
            <div className="absolute top-[10%] left-[10%] text-emerald-400 animate-float">
                <Cloud size={100} fill="currentColor" className="opacity-40" />
            </div>
            <div className="absolute top-[20%] right-[10%] text-yellow-400 animate-float-delayed">
                <Star size={80} fill="currentColor" className="opacity-80 drop-shadow-md" />
            </div>
            <div className="absolute bottom-[10%] left-[5%] text-cyan-400 animate-float-slow">
                <Rocket size={80} fill="currentColor" className="opacity-60" />
            </div>
            <div className="absolute top-[50%] right-[5%] text-pink-300 animate-float">
                <Sparkles size={60} fill="currentColor" className="opacity-50" />
            </div>
        </div>
    );
};

export default Background;
