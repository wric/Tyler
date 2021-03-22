import Pattern from "../components/pattern";

export default function Index({ patterns }) {
  return (
    <div>
      {patterns.map((pattern) => (
        <Pattern key={pattern.id} pattern={pattern} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://www.toptal.com/designers/subtlepatterns/?feed=json"
  );
  const data = await res.json();
  const patterns = data.map((pattern) => {
    const { title, permalink, id } = pattern;
    const name = permalink.replace("-pattern/", "").split("/").pop();
    const url = `https://www.toptal.com/designers/subtlepatterns/patterns/${name}.png`;
    return { title, permalink, id, name, url };
  });

  return {
    props: {
      patterns,
    },
  };
}
