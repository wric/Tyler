import Link from "next/link";

export default function Pattern({ pattern }) {
  return (
    <div className="pa5" style={{ backgroundImage: `url(${pattern.url})` }}>
      <Link href={pattern.url}>
        <a className="w-20 no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma1 tc pa2">
          <span className="f6 center pa2 ttu tracked">{pattern.title}</span>
        </a>
      </Link>
    </div>
  );
}
