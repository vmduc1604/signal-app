const quotesData = [
  {
    quote: "The stars do not rush. Yet, they arrive.",
    author: "",
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
];

export default function Quotes() {
  return (
    <h1 className="text-center font-bold text-2xl md:text-4xl mb-8 text-slate-900 dark:text-white">
      {quotesData[0].quote}{" "}
      {quotesData[0].author && `- ${quotesData[0].author}`}
    </h1>
  );
}
