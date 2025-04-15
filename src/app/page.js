import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white text-black relative overflow-hidden tex">
      <div
        className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#60606012_1px,transparent_1px),linear-gradient(to_bottom,#60606012_1px,transparent_1px)] bg-[size:81px_81px] z-0" />

      <div className="flex h-full flex-col items-center justify-center gap-5 relative z-10 p-4 text-center">
        <Image
          src="/sj_logo.svg"
          alt="Sparkjam Logo"
          width={1198}
          height={227.051}
        />

        <div className="flex flex-col items-center justify-center gap-y-[1px]">
          <p className="font-normal text-md">Applications Will Open</p>
          <p className="font-semibold text-md">Friday, April 18th</p>
        </div>

        <div>
          <a
            className="border group flex items-center justify-center pr-5 pl-5 pt-2 pb-2 bg-black text-white gap-2 transition-all duration-300 ease-in hover:bg-[linear-gradient(269deg,#85E0F9_14.91%,#BFED79_53.81%,#FDC380_99.21%)] hover:text-black"
            href="/sparkjam_application_opens.ics"
          >
            <p className="text-sm transition-colors duration-300 ease-in group-hover:text-black">
              SET A REMINDER
            </p>

            <Image
              src="/arrow.svg"
              alt="arrow"
              width={10}
              height={10}
              className="block group-hover:hidden transition-opacity duration-300 ease-in"
            />

            <Image
              src="/hoverarrow.svg"
              alt="arrow hover"
              width={10}
              height={10}
              className="hidden group-hover:block transition-opacity duration-300 ease-in"
            />
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 md:px-12 text-center">
        <p className="text-md md:text-lg font-bold">( MAY 17 - MAY 31 )</p>
        <p className="md:text-lg font-bold block md:hidden">(SFU BURNABY)</p>

        <Image
          className="mix-blend-difference w-[80%] max-w-[300px] md:max-w-[600px] h-auto"
          src="/bottom_stuff.svg"
          alt="Sparkjam"
          width={619}
          height={261}
        />

        <p className="text-md font-bold hidden lg:block">(SFU BURNABY)</p>
      </div>

    </div>
  );
}
