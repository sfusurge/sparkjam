import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white text-black relative">
      <div
        className="absolute z-0 inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#60606012_1px,transparent_1px),linear-gradient(to_bottom,#60606012_1px,transparent_1px)] bg-[size:81px_81px]"
      >
        <div className="flex h-full flex-col items-center justify-center gap-5 z-10">
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
            <a className={"flex pr-5 pl-5 pt-2 pb-2 bg-black flex-row gap-2"} href="/sparkjam_application_opens.ics">
              <p className={'text-white'}>
                SET A REMINDER
              </p>
              <Image
                src={'/arrow.svg'}
                alt={'arrow'}
                width={10}
                height={10}
              />
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 w-full justify-center flex flex-row items-center">
          <p className="text-lg font-bold">( MAY 17 - MAY 31 )</p>

          <Image
            className="mix-blend-difference"
            src="/bottom_stuff.svg"
            alt="Sparkjam"
            width={619}
            height={261}
          />

          <p className="text-lg font-bold">(SFU BURNABY)</p>
        </div>

      </div>

    </div>
  );
}
