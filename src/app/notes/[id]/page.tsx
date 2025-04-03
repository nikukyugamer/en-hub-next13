import { Metadata } from 'next/types';
import { getNote } from './getNote';
import Note from './Note';
import Link from 'next/link';

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const note = await getNote(params.id);
  return { title: note.title }
}

export default async function Page({ params }) {
  const note = await getNote(params.id);
  return (
    <main className="mx-2 sm:mx-4">
      <Link href="/notes" className='inline-block focus-visible:ring ring-pink-300 text-gray-500 hover:text-pink-500 active:text-pink-600 text-s md:text-base font-semibold rounded-lg outline-none transition duration-100'>← back</Link>
      <h2 className='my-4 text-gray-400 text-xs'>View Note</h2>
      <Note item={note} />
      <div className='flex gap-x-3 mt-4'>
        <Link href={`/notes/${note.id}/edit`} className='cursor-pointer inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-2'>
          Edit
        </Link>
      </div>
    </main>
  )
}
