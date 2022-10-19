import React from "react";

interface RootProps {
  name: string;
}
const Root: React.FC<RootProps> = (props: RootProps) => {
  const name = props.name;
  return (
    <section className="phx-hero">
      <h1>Welcome to {name} with TypeScript and React!</h1>
      <p>Peace-of-mind from prototype to production</p>
    </section>
  );
};

export default Root;
