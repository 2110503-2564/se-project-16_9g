import Link from "next/link";

export default function TopMenuItem({ label, href }: {label:string, href:string}) {
  return (
    <Link href={href} className="text-center text-white text-xl px-4 py-2">
      {label}
    </Link>
  );
}