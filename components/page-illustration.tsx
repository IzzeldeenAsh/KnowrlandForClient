import Image from "next/image";
import Stripes from "@/public/images/stripes.svg";

export default function PageIllustration({top=true,middle=true,bottom=true}) {
  return (
    <>

      {/* Stripes illustration */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 transform hidden md:block"
        aria-hidden="true"
      >
        <Image
          className="max-w-none opacity-50"
          src={Stripes}
          width={768}
          height={768}
          style={{ width: 'auto', height: 'auto' }}
          alt="Stripes"
          priority
        />
      </div>

      {/* Responsive circles with better positioning */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top circle */}
        {top && ( <div
          className="absolute hidden lg:block -top-40 left-1/2 transform -translate-x-1/2 translate-x-[2vw]"
          aria-hidden="true"
        >
          <div className="w-[40vw] max-w-[400px] aspect-square rounded-full bg-gradient-to-tr from-blue-500 to-blue-300 opacity-30" style={{ filter: 'blur(300px)', willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} />
        </div>)}
       
        {middle && ( <div
          className="absolute hidden lg:block top-[30vh] left-1/2 transform -translate-x-1/2 translate-x-[15vw]"
          aria-hidden="true"
        >
          <div className="w-[40vw] max-w-[400px] aspect-square rounded-full bg-gradient-to-tr from-blue-500 to-blue-200 opacity-30" style={{ filter: 'blur(300px)', willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} />
        </div>)}
        {/* Middle circle */}
       
        {bottom && ( <div
          className="absolute hidden lg:block top-[50vh] left-1/2 transform -translate-x-1/2 -translate-x-[15vw]"
          aria-hidden="true"
        >
          <div className="w-[40vw] max-w-[400px] aspect-square rounded-full bg-gradient-to-tr from-blue-500 to-blue-200 opacity-30" style={{ filter: 'blur(300px)', willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }} />
        </div>)}
        {/* Bottom circle */}
       
      </div>
    </>
  );
}
