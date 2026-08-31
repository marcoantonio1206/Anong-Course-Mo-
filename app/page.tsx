import courses from '@/data/courseBankV3.json';

export default function Home() {
  // This will print the data to your terminal
  console.log(courses);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Data Linked!
      </h1>
    </main>
  );
}